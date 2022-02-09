//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;


interface IRandomNumberVRF{
    function getRandomNumber() external returns (bytes32 requestId);
    function getRandomRangeNumber(address _user, uint a, uint b) external returns(uint256);
}
interface IstakingNFT{
    function newPlay(uint _amount) external;
}
interface Iliquidity{
    function win(address,uint) external;
}
contract rpsGame  {
    
    bool public onOff; //funcion para pausar el juego;
    address owner; // Dueño del contrato, maximo rango de acceso (mover fondos de la pool)
    address admin; // Funciones para editar parametros de nivel medio (editar precios, fees)
    IRandomNumberVRF randomLinkContract; //Direccion de VRF random contract
    //Iliquidity liquidity; // direccion de liquides


    //address NFTHolders; //Direccion del contrato que repartira la recompenza a los holders
    IstakingNFT NFTHolders; //Direccion de contrato staking
    uint public feeForNFTHolders = 250; //% del fee para nftHolders (100 = 1%)

    address devWalletFees;  //Direccion del fee para los devs
    uint public feeForDevs = 100; //Fee para los el equipo de desarrollo

    uint totalFee = feeForNFTHolders + feeForDevs;
    uint maxDeal; //Puja maxima en un mismo juego 
    uint minBalanceToPay; // balance minimo que tiene que tener el contrato, para poder pagar.
    mapping (address => uint) debtPerUser; //Usado para pagar las deudas.
    
    string[3] RPSop = ['rock','paper', 'scissors']; // 0 = Rock, 1 = paper, 2=scissors
    //for testin gass
    uint public totalWins;
    uint public totalLoses;
    mapping(address => uint[2]) winLosesPerUser;
    mapping(address => uint[2]) winLosesRache;

    modifier onlyOwner(){
        require(msg.sender == owner);
        _;
    }
   
//EVENTS
    event Play(address,uint,uint,bool,uint);// User ,apuesta ,racha, result, NumeroAleatoreo
    event C_setNFTHoldersAddress(address,IstakingNFT); // C_(Change), (Msg.sender,NewAdrres)
    event C_setDevAddress(address,address);//Change devWalletFees (msg.sender, NewAddress)
    event C_setFeeForNFTHolders(address,uint);// Change feeForNFTHolders(msg.sender, newValue)
    event C_setFeeForDevs(address,uint);// Change feeFordevs(msg.sender, newValue)
    event C_setMaxDeal(address,uint);// change max value in Play fuction (msg.sender, newMaxValue)
    event FoundIn(address, uint);
    event FoundsOut(address,uint,address); // withdraw found of this contract(msg.sender, total, address founds)
     event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    constructor (
        address _owner,         
        address _devWallet, 
        IRandomNumberVRF _randomLinkContract,
        IstakingNFT _NFTholders
    ){
        owner = _owner;
        admin = _owner;
        NFTHolders = _NFTholders;
        devWalletFees = _devWallet;
        randomLinkContract = _randomLinkContract;
        maxDeal = 1 ether;
    }

//FUNCTIONS FOR USERS

    //MSG.value = deal + totalFEE%
    function play( uint _value) public payable returns(bool results){
        require(onOff == true, "Play in pause");
        uint fee = calculateFee(_value);
        require(msg.value <= (maxDeal + fee));
        require( (_value+fee) == msg.value);

        payable(address(NFTHolders)).transfer(_value * feeForNFTHolders / 10000);
        payable(devWalletFees).transfer(_value * feeForDevs  / 10000);
        NFTHolders.newPlay(_value * feeForDevs  / 10000);

        uint rand = getRandomRangeLink(msg.sender,1,100);
        if(rand >= 50){
            if(checkBalance(_value * 2)){
                payable(msg.sender).transfer(_value * 2);
            }else {
                debtPerUser[msg.sender] += _value * 2;
            }            
            results = true;
            totalWins++;
            winLosesPerUser[msg.sender][1]++;
            winLosesRache[msg.sender][0]++;
            if(winLosesRache[msg.sender][0] >winLosesRache[msg.sender][1]){
                winLosesRache[msg.sender][1] == winLosesRache[msg.sender][0];
            }
            //liquidity.win(msg.sender, _value);
        }else {
            results = false;
            totalLoses++;
            winLosesPerUser[msg.sender][0]++;
            delete winLosesRache[msg.sender][0];            
        }
        
        emit Play(msg.sender,_value,winLosesRache[msg.sender][0],results,rand);
        //leaderBoard(result)

    }
    function claimDebt() public {
        require (checkBalance(debtPerUser[msg.sender]) == true);
        require(debtPerUser[msg.sender] > 0, "no tiene fondos para claimear" );
        uint toPay = debtPerUser[msg.sender];
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
    function getRache() public view returns(uint){
        return winLosesRache[msg.sender][1];
    }

//internal
    function getRandomRangeLink(address _user,uint a, uint b) public returns(uint){
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
    function setNFTHoldersAddress(IstakingNFT _newNFTHolders) public onlyOwner{
        NFTHolders = _newNFTHolders;
        emit C_setNFTHoldersAddress(msg.sender, _newNFTHolders);
    }
    //Cambiar la direccion donde va el 1.5%(devFee)
    function setDevAddress(address _newDevWalletFees) public onlyOwner {
        devWalletFees = _newDevWalletFees;
        emit C_setDevAddress(msg.sender,devWalletFees);
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
    //funcion que pone en pausa el juego.
    function pause(bool _bool)public onlyOwner{
         onOff = _bool;
    }
    function trasnferFoundsOUT(uint _amount, address _to) public payable onlyOwner(){
        require(msg.sender == admin, "no eres el admin");
        payable(_to).transfer(_amount);
        onOff = false;
        emit FoundsOut(msg.sender, _amount,_to);
    }
    //trasnfiere valor, usao para testeo
    function trasnferFoundsIN()public payable returns(bool){
        require(msg.value > 10);
        emit FoundIn(msg.sender,msg.value);
        return true;
    }
    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }
    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        _transferOwnership(newOwner);
    }
    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = owner;
        owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }

    /*todo:
     - randomContract (SETTER)
     - Emits
    */
    //function leaderBoard()
}