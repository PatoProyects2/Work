// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
interface IRadom{
    function rand(address _user) external view returns(uint256);
    function randrange(uint a, uint b,address _user) external view returns(uint);
}

contract rpsNFT is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    mapping(uint256 => string) private _hashIPFS;// hashes de las imagenes [id => hash]
    mapping(uint => uint) public rarity; // [id => rarity (value 0 to 14)] 
    string[3] hand = ["Rock", "Papper", "Siccors"]; // Hands 
    IRadom random;
    uint32[15]  cantOfRarity;//0-4(rock)5-9(papper)10-14(Siccors)
    uint public maxSupply = 333; //Initial max supply
    uint maxMintAmount = 20; //max mint in constructor, or owners
    uint priceMint; //precio por minteo
    string baseURI; //URL basica de acceso, convinar con _hashIPFS
    address foundsDevs; // address a donde se dirigiran los fondos.
    /*
     - 150 comunes, 100 no comunes, 51 raros, 21 epicos, 11 legendarios
        333 de suply 
     - 5 FOTOS (1 para cada rareza)
     - Tenemos 3 tipos (ROCK, Papper, Siccors). 
     - 15 fotos. 999 nfts
    */

    constructor(uint _priceMint, uint _initialMint) ERC721("rpsNFTRock", "ROCK") {
        priceMint = _priceMint * 1 ether;
        baseURI = "https://ipfs.io/ipfs";
        //safeMint(msg.sender, _initialMint);
    }

    function safeMint(address to, uint256 _mintAmount) internal {
        uint256 supply = totalSupply()+1;
        require(_mintAmount > 0);
        require(_mintAmount < maxMintAmount);
        require(totalSupply() + _mintAmount <= maxSupply);
        
        if(msg.sender !=owner()){
            require(_mintAmount == 1);
        }        
        _safeMint(to, supply);        
    }

    function buyNFT() public payable {
        if(msg.sender !=owner()){            
            require(msg.value >= priceMint, "Not Founds");
        }
        uint rare = setRarity();
        safeMint(msg.sender, 1);
        rarity[totalSupply()] = rare;
    }

    function setRarity() internal view returns(uint){        
        require(totalSupply() <= maxSupply);
        uint rare = random.randrange(0,4,msg.sender);
        if( maxSupply/333 == 2){
            rare +=5;
        } 
        if( maxSupply/333 == 3){
            rare +=10;
        }  
        //el while solo esta para 0-4, cuidado con valores 5-14    
        while(cantOfRarity[rare] > maxRarity(rare)){
            rare++;
            if(rare == 5){
                rare = 0;
            }
            if (rare == 10){
                rare = 5;
            }
            if (rare == 15){
                rare = 10;
            }
        }
        return rare;
    }
    // modificar para valores 5-14
    function maxRarity(uint _pos)internal pure returns(uint){
        if(_pos == 0 || _pos == 5 || _pos == 10){
            return 150;
        }
        if(_pos == 1 || _pos == 6 || _pos == 11){
            return 100;
        }
        if(_pos == 2 || _pos == 7 || _pos == 12){
            return 51;
        }
        if(_pos == 3 || _pos == 8 || _pos == 13){
            return 21;
        }
        if(_pos == 4 || _pos == 9 || _pos == 14){
            return 11;
        }
    }

    //return an array of all ids 
    function walletOfOwner(address _owner) public view returns (uint[] memory){
        uint256 ownerTokenCount = balanceOf(_owner);
        uint256[] memory tokenIds = new uint256[](ownerTokenCount);
        for(uint256 i;  i < ownerTokenCount; i++){
            tokenIds[i] = tokenOfOwnerByIndex(_owner, i);

        }
        return tokenIds;

    }

    function _setbaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }
    function setHand() internal view returns(uint){
        uint256 supply = totalSupply();
        if(supply < 333){
            return 0;
        }else if (supply < 666){
            return 1;
        }else{
            return 2;
        }
    }
    function newMax() public onlyOwner{
        uint256 supply = totalSupply();
        if (supply < 666){
            maxSupply = 666;
        }else{
            maxSupply = 999;
        }
        
    }
    function setFoundsDevs(address _newFoundAddres) public onlyOwner{
        foundsDevs = _newFoundAddres;
    }
    function setPriceMint(uint _newPrice) public {
        priceMint == _newPrice;
    }

    function whatRarity(uint _pos)internal pure returns(string memory){
        if(_pos == 0 || _pos == 5 || _pos == 10){
            return "Common";
        }
        if(_pos == 1 || _pos == 6 || _pos == 11){
            return "Uncommon";
        }
        if(_pos == 2 || _pos == 7 || _pos == 12){
            return "Rare";
        }
        if(_pos == 3 || _pos == 8 || _pos == 13){
            return "Epic";
        }
        if(_pos == 4 || _pos == 9 || _pos == 14){
            return "Legend";
        }
    }


    // The following functions are overrides required by Solidity.
    function _baseURI() internal view virtual override(ERC721) returns (string memory) {
        return baseURI;
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        require(_exists(tokenId),"ERC721Metadata: URI query for nonexistent token");
        string memory currentBaseUri = _baseURI();
        return (bytes(currentBaseUri).length > 0 && 
                    bytes(_hashIPFS[tokenId]).length > 0) 
                    ? string (abi.encodePacked(currentBaseUri, _hashIPFS[tokenId]))
                    : "";

        //return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}