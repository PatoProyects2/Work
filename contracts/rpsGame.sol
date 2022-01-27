//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./utils/random.sol";

contract rpsGame {
    /* TODO: rock papper and seassors
    * Function : play
    * Function : setPrice (For Tokens or blockchain currenci? )
    * VARIABLES:
    * * feeForNFTHolders(2%)[]
    * * feeForDevs (1.5)
    * * PoolTransfers (this)
    * * maxDeal (apuesta maxima)
    * Laderboard(Top 500?)
    */
    address owner; // Dueño del contrato, maximo rango de acceso (mover fondos de la pool)
    address admin; // Funciones para editar parametros de nivel medio (editar precios, fees)

    address NFTHolders; //Direccion del contrato que repartira la recompenza a los holders
    uint public feeForNFTHolders = 200; //% del fee para nftHolders (100 = 1%)

    address devWalletFees;  //Direccion del fee para los devs
    uint public feeForDevs = 150; //Fee para los el equipo de desarrollo

    uint totalFee = feeForNFTHolders + feeForDevs;
    uint maxDeal; //Puja maxima en un mismo juego 
    string[3] RPSop = ['rock','paper', 'scissors']; // 0 = Rock, 1 = paper, 2=scissors



    modifier onlyOwner(){
        require(msg.sender == owner);
        _;
    }
    modifier forAdmins() {
        require(msg.sender == admin || msg.sender == owner);
        _;
    }
//EVENTS
    event Play();// User, your hand, computer hand
    event C_setNFTHoldersAddress(); // C_(Change), addres owner
    event C_setDevAddress();
    event C_setFeeForNFTHolders();
    event C_setFeeForDevs();
    event C_setMaxDeal();

    constructor (address _owner, address _admin, address _nftholders, address _devWallet){
        owner = _owner;
        admin = _admin;
        NFTHolders = _nftholders;
        devWalletFees = _devWallet;
        maxDeal = 1 ether;
    }

//FUNCTIONS FOR USERS

    //MSG.value = deal + totalFEE%
    function play(uint _userHand, uint deal) public payable returns(bool results){
        require(msg.value <= maxDeal /*+ fee*/  );
        require( deal/*+fee)*/ == msg.value);
        uint rand = getRandom(msg.sender);
        if(rand > 5){
            payable(msg.sender).transfer(deal * 2);
            results = true;
        }else {
            results = false;
        }
        //leaderBoard(result)

    }

//internal
    function getRandom(address _user) internal view returns(uint){
        uint random = uint256(keccak256(abi.encodePacked((block.timestamp + block.difficulty + block.number), _user )));
        return (random % 10);
    }


//SETTERS
    

    function setNFTHoldersAddress(address _newNFTHolders) public onlyOwner{
        NFTHolders = _newNFTHolders;
        //emit
    }
    function setDevAddress(address _newDevWalletFees) public onlyOwner {
        devWalletFees = _newDevWalletFees;
        //emit
    }
    function setFeeForNFTHolders(uint _newFeeForNFTHolders) public forAdmins{
        //require(Totalfee < 50)
        feeForNFTHolders = _newFeeForNFTHolders;
        totalFee = feeForNFTHolders + feeForDevs;
        //emit
    }
    function setFeeForDevs(uint _newFeeForDevs) public forAdmins{
        //require(Totalfee < 50)
        feeForDevs = _newFeeForDevs;
        totalFee = feeForNFTHolders + feeForDevs;
        //emit
    }
    function setMaxDeal(uint _newMaxDeal) public forAdmins{
        maxDeal = _newMaxDeal;
        //emit
    }

//LeaderBoard


}