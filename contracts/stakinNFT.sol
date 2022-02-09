// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

//import "@OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol";

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./nfts/rpsNFT.sol"; 
/*
Dev @PatoVerde : 
 * Se crea un vector, en cada posicion guardara cuanto(value) debe repartirse a cada id EN STAKE. (newPlayFunction)
 * Se utilizara la ultima posicion del vector (earningPerPlay) como punto donde el usuario esta reciviendo recompenzas.
 * Cada claim actualizara el puntero de todos los ids del usuario al ultimo valor del vector (length -1)
*/
contract Staking is Ownable {
    struct infoUser{
        uint[] nftIdStake;
        uint lastClaim;
    }

    uint[] public earningPerPlay;
    mapping(address => infoUser) infOfUsers; // informacion de cada usuario (address => ([id1,id2...],ultimoRetiro))
    //mapping(uint => uint) IdDeposit; //Info de en que "play" fue depositado el nft.

    IERC721 public ROCK;
    uint256 public nftInStake;
    bool public rewardsActive = true;

    event Deposit(address, uint);
    event Claim();
    event Withdraw();
    /*
    modifier onlyGame(){
        require(msg.sender == address(ROCK));
        _;
    }*/

    constructor(){

    }

    function deposit(uint _id) public{    
        require(ROCK.ownerOf(_id) == msg.sender, "no eres propietario de ese nft");
        require(infOfUsers[msg.sender].lastClaim < returnLength());
        uint length = infOfUsers[msg.sender].nftIdStake.length;
        uint totalPay;
        if(length > 0){
            totalPay = calculatePay(infOfUsers[msg.sender].lastClaim, length);
            infOfUsers[msg.sender].lastClaim = returnLength();
            payTo(totalPay,msg.sender);
        }
        //* Transferir el nuevo nft
        ROCK.safeTransferFrom(msg.sender, address(this), _id);
        //* Datos de usuario:
        uint[] memory _nftIdStake = infOfUsers[msg.sender].nftIdStake;
        if(_nftIdStake.length < 1 ){
            infOfUsers[msg.sender].nftIdStake.push(_id);
        }else{
            for(uint256 i = 0; i <= (_nftIdStake.length-1); i++){ //cuidado con el length
                if(infOfUsers[msg.sender].nftIdStake[i] == 0){
                    infOfUsers[msg.sender].nftIdStake[i] = _id;
                }else{
                    infOfUsers[msg.sender].nftIdStake.push(_id);
                }
            }
        }        
        infOfUsers[msg.sender].lastClaim = returnLength();
        emit Deposit(msg.sender,_id);         
    }
    function withdraw(uint _id) public {
        require(ROCK.ownerOf(_id) == address(this), "no eres propietario de ese nft");
        require(infOfUsers[msg.sender].lastClaim < returnLength());    
        uint _posID = nftInStakeSearch(infOfUsers[msg.sender].nftIdStake, _id);
        uint length = infOfUsers[msg.sender].nftIdStake.length;
        uint totalPay;
        totalPay = calculatePay(infOfUsers[msg.sender].lastClaim, length);
        infOfUsers[msg.sender].lastClaim = returnLength();
        payTo(totalPay,msg.sender);
        //* Datos de usuario:
        delete infOfUsers[msg.sender].nftIdStake[_posID];       
        //* Transferir el nft al user
        ROCK.safeTransferFrom( address(this),msg.sender, _id);
        emit Deposit(msg.sender,_id);

    }
    function claim() public {
        uint length = infOfUsers[msg.sender].nftIdStake.length;
        require(length > 0, "No tienes nfts en stake");
        uint totalPay = calculatePay(infOfUsers[msg.sender].lastClaim, length);
        infOfUsers[msg.sender].lastClaim = returnLength();
        payTo(totalPay,msg.sender);
    }
    
    function payTo(uint _amount, address _to )public payable {
        require(msg.sender == address(this));
        payable(_to).transfer(_amount);
    }


    uint testValueUsers = 10;
    function newPlay() public payable {  
        uint cant = ROCK.balanceOf(address(this));      
        earningPerPlay.push(msg.value / cant);
    }
    function setTestValueUsers(uint _cantUsers) public {
        testValueUsers = _cantUsers;
    }
    function returnLength() public view returns(uint){
        return earningPerPlay.length;
    }
    function returnTotalFee() public view returns(uint){
        uint total;
        for(uint i; i<returnLength(); i++){
            total += earningPerPlay[i];
        }
        return total;
    }

    function calculatePay(uint _lastClaim,uint _length) public view returns(uint){
        uint total;
        for (uint i = _lastClaim; i < earningPerPlay.length; i++){
            total += earningPerPlay[i];
        }
        return total * _length;
    }
    function nftInStakeSearch(uint[] memory _listNft, uint _id)public pure returns(uint){
        uint i=0;
        while((_listNft[i] != _id) && (i<=_listNft.length-1)){
            i++;
        }
        return i;
    }
}