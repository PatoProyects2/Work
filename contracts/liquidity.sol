//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract liquidity {
    //trasnfiere valor, usao para testeo
    address RPScontract;
    address admin;

    event FoundsOut(address,uint);
    constructor (address _contract){
        RPScontract = _contract;
        admin = msg.sender;
    }

    modifier onlyContract() {
        require(msg.sender == RPScontract);
        _;
    }



    function trasnferFoundsIN()public payable returns(bool){
        require(msg.value > 10);
        return true;
    }
    function win(address _to,uint _amount) public payable onlyContract{
        payable(_to).transfer(_amount * 2);
    }
    function trasnferFoundsOUT(uint _amount) public payable {
        require(msg.sender == admin, "no eres el admin");
        payable(msg.sender).transfer(_amount);
        emit FoundsOut(msg.sender, _amount);
    }
}