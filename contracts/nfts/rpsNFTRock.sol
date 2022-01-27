// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract rpsNFTRock is ERC721, ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;
    uint maxMint = 333;
    uint priceMint;    
    string uri;
    

    Counters.Counter private _tokenIdCounter;

    constructor(uint _priceMint) ERC721("rpsNFTRock", "ROCK") {
        priceMint = _priceMint * 1 ether;
    }

    function safeMint(address to) public payable {
        require(msg.value >= priceMint, "Not Founds");
        require(totalSupply() < maxMint, "Not minter");
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    function setUri(string memory _uri) external onlyOwner(){
        uri = _uri;
    } 

/*
    function getIDs() public pure returns (uint[] memory allIdsOfUser) {
        for(uint i = 0; i == balanceOf(msg.sender); i++ ){
            allIdsOfUser.push(tokenOfOwnerByIndex(msg.sender, i));
        }
        return allIdsOfUser;
    }
*/









    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
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