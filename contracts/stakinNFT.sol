// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

//import "@OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol";

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./nfts/rpsNFTRock.sol"; 
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

    uint[] earningPerPlay;
    mapping(address => infoUser) infOfUsers; // informacion de cada usuario (address => ([id1,id2...],ultimoRetiro))
    mapping(uint => uint) IdDeposit; //Info de en que "play" fue depositado el nft.

    IERC721 public ROCK;
    uint256 public nftInStake;
    bool public rewardsActive = true;

    event Deposit(address, uint);
    event Claim();
    event Withdraw();
    modifier onlyGame(){
        require(msg.sender == address(ROCK));
        _;
    }

    constructor(){

    }

    function deposit(uint _id) public{    
        require(ROCK.ownerOf(_id) == msg.sender, "no eres propietario de ese nft");    
        if(infOfUsers[msg.sender].nftIdStake.length > 0){
            // * Pagar lo adeudado
        }
        //* Transferir el nuevo nft
        ROCK.safeTransferFrom(msg.sender, address(this), _id);
        //* Datos de usuario:
        uint[] memory _nftIdStake = infOfUsers[msg.sender].nftIdStake;
        if(_nftIdStake.length < 1 ){
            infOfUsers[msg.sender].nftIdStake.push(_id);
        }else{ //Mover todo este if a una function?
            for(uint256 i = 0; i <= (_nftIdStake.length-1); i++){ //cuidado con el length
                if(infOfUsers[msg.sender].nftIdStake[i] == 0){
                    infOfUsers[msg.sender].nftIdStake[i] = _id;
                }else{
                    infOfUsers[msg.sender].nftIdStake.push(_id);
                }
            }
        }
        infOfUsers[msg.sender].lastClaim = earningPerPlay.length - 1;
        emit Deposit(msg.sender,_id);
         
    }
    function withdraw(uint _id) public {

    }
    function claim() public {}
    function payTo(address _to, uint _amount)public payable {
        require(msg.sender == address(this));
    }

    function newPlay(uint _amount) public onlyGame(){
        earningPerPlay.push(_amount / ROCK.balanceOf(address(this)));
    }
}