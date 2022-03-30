//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;
import "@openzeppelin/contracts/access/Ownable.sol";

interface IRandomNumberVRF{
    function getRandomNumber() external returns (bytes32 requestId);
    function getRandomRangeNumber(address _user, uint a, uint b) external returns(uint256);
}
interface IstakingNFT{
    function newPlay() external payable;
}
contract rpsGame is Ownable  { 

    //address owner; // Dueño del contrato, maximo rango de acceso (mover fondos de la pool)
    IRandomNumberVRF randomLinkContract; //Direccion de VRF random contract
    //address payable addressStaking;
    IstakingNFT NFTHolders; //Direccion de contrato staking
    address devWalletFees;  //Direccion del fee para los devs

    uint public feeForNFTHolders = 250; //% del fee para nftHolders (100 = 1%)
    uint public feeForDevs = 100; //Fee para los del equipo de desarrollo

    bool public onOff = true; // to pause play function
    uint totalFee = feeForNFTHolders + feeForDevs;
    uint maxDeal; //Max Value in Play fuction
    uint minBalanceToPay; // balance minimo que tiene que tener el contrato, para poder pagar.
    uint protectedTime = 3;
    mapping (address => uint) public debtPerUser; //Usado para pagar las deudas.
    uint public totalDebt;
    
    //string[3] RPSop = ['rock','paper', 'scissors']; // 0 = Rock, 1 = paper, 2=scissors
    //for testin gass
    uint public totalWins;
    uint public totalLoses;
    mapping(address => uint[2])  winLosesPerUser;
    mapping(address => uint[2])  winLosesRache;

    mapping(address => uint)  timeLock; //Tiempo entre partidas para un mismo address
/*
    modifier onlyOwner(){
        require(msg.sender == owner);
        _;
    }
*/
   
//EVENTS
    event Play(address user,uint bid,uint racha,bool result,uint random, bool debt);// User ,apuesta ,racha, result, NumeroAleatoreo
    event C_setNFTHoldersAddress(address Sender,address oldAddress,IstakingNFT); // C_(Change), (Msg.sender,NewAdrres)
    event C_setDevAddress(address Sender,address oldAddress, address newAddress);//Change devWalletFees (msg.sender, NewAddress)
    event C_setFeeForNFTHolders(address,uint);// Change feeForNFTHolders(msg.sender, newValue)
    event C_setFeeForDevs(address,uint);// Change feeFordevs(msg.sender, newValue)
    event C_setMaxDeal(address,uint);// change max value in Play fuction (msg.sender, newMaxValue)
    event FoundsIn(address, uint);//
    event FoundsOut(address,uint,address); // withdraw found of this contract(msg.sender, total, address founds)
    //event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    constructor (        
        address _devWallet, 
        address payable _NFTholders,
        IRandomNumberVRF _randomLinkContract,
        uint _maxDeal,
        uint _minBalanceToPay
    ){
        //addressStaking = _NFTholders;
        NFTHolders = IstakingNFT(_NFTholders);
        devWalletFees = _devWallet;
        randomLinkContract = _randomLinkContract;
        maxDeal = _maxDeal * 1 ether;
        minBalanceToPay = _minBalanceToPay * 1 ether;
    }

//FUNCTIONS FOR USERS

    //MSG.value = deal + totalFEE%
    function play( uint _value) public payable returns(bool results){
        require(onOff == true, "Play in pause");
        require((timeLock[msg.sender] + protectedTime) < block.timestamp );
        uint fee = calculateFee(_value);
        require(msg.value <= (maxDeal + fee));
        require(msg.value > 0);
        require( (_value+fee) == msg.value);
        timeLock[msg.sender] = block.timestamp;

        payable(devWalletFees).transfer(_value * feeForDevs  / 10000);
        NFTHolders.newPlay{value:(_value * feeForNFTHolders / 10000)}();
        //getRandom is internal!
        uint rand = getRandomRangeLink(msg.sender,1,100);
        bool debt = false;
        if(rand >= 50){
            if(checkBalance(_value * 2)){
                payable(msg.sender).transfer(_value * 2);
            }else {
                payable(msg.sender).transfer(_value);
                debtPerUser[msg.sender] += _value;
                totalDebt += _value;
                debt = true;
            }            
            results = true;
            totalWins++;
            winLosesPerUser[msg.sender][1]++;
            winLosesRache[msg.sender][0]++;
            if(winLosesRache[msg.sender][0] > winLosesRache[msg.sender][1]){
                winLosesRache[msg.sender][1] == winLosesRache[msg.sender][0];
            }
            //liquidity.win(msg.sender, _value);
        }else {
            results = false;
            totalLoses++;
            winLosesPerUser[msg.sender][0]++;
            delete winLosesRache[msg.sender][0];            
        }
        
        emit Play(msg.sender,_value,winLosesRache[msg.sender][0],results,rand, debt);
        //leaderBoard(result)

    }

    function claimDebt() public {
        require (checkBalance(debtPerUser[msg.sender]) == true);
        require(debtPerUser[msg.sender] > 0, "no tiene fondos para claimear" );
        uint toPay = debtPerUser[msg.sender];
        totalDebt -= toPay;
        delete debtPerUser[msg.sender];
        payable(msg.sender).transfer(toPay);
    }
   
//other functions
    function calculateFee(uint _value)public view returns(uint){
        uint txFee = _value * totalFee / 10000;
        return txFee;
    }

    function calculateValue(uint _value)public view returns(uint){
        uint totalValue = calculateFee(_value) + _value;
        return totalValue;
    }

    function viewTimeProtected(address _address) public view returns(uint){
        return timeLock[_address];
    }

    //trasnfiere valor, usao para testeo
    function trasnferFoundsIN()public payable returns(bool){
        require(msg.value > 10);
        emit FoundsIn(msg.sender,msg.value);
        return true;
    }

//internal
    function getRandomRangeLink(address _user,uint a, uint b) internal returns(uint){
        uint random = randomLinkContract.getRandomRangeNumber(_user,a,b);
        if (random == 0 ) {random = 1;}
        return random;
    }
    
    function checkBalance(uint _value) internal view returns(bool){
        if((address(this).balance) + _value > minBalanceToPay){
            return true;
        }else {
            return false;
        }
    }

//SETTERS

    //Cambiar direccion del contrato a donde va el 2% para los que posen nfts
    function setNFTHoldersAddress(address payable _newNFTholders) public onlyOwner{
        IstakingNFT oldNFT = NFTHolders;
        NFTHolders = IstakingNFT(_newNFTholders);
        emit C_setNFTHoldersAddress(msg.sender, address(oldNFT), IstakingNFT(_newNFTholders));
    }

    //Cambiar la direccion donde va el 1.5%(devFee)
    function setDevAddress(address _newDevWalletFees) public onlyOwner {
        address oldAdd = devWalletFees;
        devWalletFees = _newDevWalletFees;
        emit C_setDevAddress(msg.sender, oldAdd, devWalletFees);
    }

    //Cambia el % de fee que es destinado a holders
    function setFeeForNFTHolders(uint _newFeeForNFTHolders) public onlyOwner{
        require((feeForDevs + _newFeeForNFTHolders) < 2000);
        feeForNFTHolders = _newFeeForNFTHolders;
        totalFee = feeForNFTHolders + feeForDevs;
        emit C_setFeeForNFTHolders(msg.sender,_newFeeForNFTHolders);
    }

    //Cambia el % de fee que es destinado a Devs
    function setFeeForDevs(uint _newFeeForDevs) public onlyOwner{
        require((_newFeeForDevs+feeForNFTHolders) < 5000);
        feeForDevs = _newFeeForDevs;
        totalFee = feeForNFTHolders + feeForDevs;
        emit C_setFeeForDevs(msg.sender,_newFeeForDevs);
    }

    //Cambia el maximo disponible en una misma jugada.
    function setMaxDeal(uint _newMaxDeal) public onlyOwner{
        require(_newMaxDeal > ((address(this).balance)/10));
        maxDeal = _newMaxDeal;
        emit C_setMaxDeal(msg.sender,_newMaxDeal);
    }

    //min balance in this contract, to pay 
    function setMinBalanceToPay(uint _minBalance) public onlyOwner(){
        minBalanceToPay =_minBalance;
    }

    function setProtectedTime(uint _NewprotectedTime) public onlyOwner(){
        protectedTime = _NewprotectedTime;
    }

    //funcion que pone en pausa el juego.
    function pause(bool _bool)public onlyOwner{
         onOff = _bool;
    }

    function trasnferFoundsOUT(uint _amount, address _to) public payable onlyOwner(){
        payable(_to).transfer(_amount);
        onOff = false;
        emit FoundsOut(msg.sender, _amount,_to);
    }

    function timeBlock() public view returns(uint){
        return block.timestamp;
    }

    /*TODO:
    * Deploy otro staking
    * transferirle fondos
    * retirar fonods
    * add:
    * link 0x34ba13d0F2CC28036a815B2ab07C07939bD06A86
    * Rps  0xAC6CEddB341497CEB8Ac2B48d4cC26aAEb05370A
    * staking 0xb974Da4D0Ff78eA32B0ACB99EE09f72d00837B77
    */
}