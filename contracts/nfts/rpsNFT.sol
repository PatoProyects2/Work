// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract rpsNFT is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    mapping(uint256 => string) private _hashIPFS;
   /* struct typeNft{
        uint id;
        uint hand;
    }*/

    string[3] hand = ["Rock", "Papper", "Siccors"];
    uint public maxSupply = 333; 
    uint maxMintAmount = 20;
    uint priceMint;
    string baseURI;
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
        safeMint(msg.sender, _initialMint);
    }
    function safeMint(address to, uint256 _mintAmount) public payable {
        uint256 supply = totalSupply();
        require(_mintAmount > 0);
        require(_mintAmount < maxMintAmount);
        require(supply + _mintAmount <= maxSupply);
        
        if(msg.sender !=owner()){
            require(msg.value >= priceMint * _mintAmount, "Not Founds");
            require(_mintAmount == 1);
        }

        for(uint256 i = 1; i<= _mintAmount; i++ ){
            _safeMint(to, supply + i);
            
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