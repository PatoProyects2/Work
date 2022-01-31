//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

library rpsGameINTERFACE{
    //Variables: 
    address owner; // Dueño del contrato, maximo rango de acceso (mover fondos de la pool)
    address admin; // Funciones para editar parametros de nivel medio (editar precios, fees)
    IRadom randomContract; //Direccion del contrato de numeros aleatoreos

    address NFTHolders; //Direccion del contrato que repartira la recompenza a los holders
    uint public feeForNFTHolders = 200; //% del fee para nftHolders (100 = 1%)

    address devWalletFees;  //Direccion del fee para los devs
    uint public feeForDevs = 150; //Fee para los el equipo de desarrollo

    uint totalFee = feeForNFTHolders + feeForDevs;
    uint maxDeal; //Puja maxima en un mismo juego 
    
    string[3] RPSop = ['rock','paper', 'scissors']; // 0 = Rock, 1 = paper, 2=scissors
    //for testin gass
    //TODAS!!! las variables desde aqui, son solo para la funcion PLAY2
    uint public totalWins; //Numero total de WINs, de todos los jugadores
    uint public totalLoses;// Numero total de LOSEs, de todos los jugadores
    
    /*Dado un addres regresara total de Win, loses, por usuario
     *el vector, representa 0 para:Loses 1 para:Wins
   */ mapping(address => uint[2]) winLosesPerUser;  

   /* Dado un adddres regresa la racha actual
    * (adderss)[][] - Notas que es un vector doble
    * (adderss)[0 si esta en racha de derrotas, 1 si esta racha de wins][Cantidad de la racha actual per user]
   */mapping(address => uint[2]) winLosesRache;


    //Funciones principales

    /* Funcion con la que interactua el usuario directamnte.
     * _value es (valor de la transaccion - fee).
     * _value es (lo que el usuario duplicaria en caso de ganar)
     * Para llamar esta funcion se debe seguir los siguientes pasos: 
        1- Usar la funcion CalculateValue("valor de apuesta en la jugada")
        2- Usar playUno(_value), value = "valor de apuesta en la jugada"
        3- Usar el resultado de CalculateValue, como valor de la transaccion
        EJemplo 
        apuesta 1 bnb:
        1- calculateValue(uint 1BNB(en wei))
        2- playUno(uint 1BNB(enwei)). pero esta transaccion, tiene que tener un value del resultado en 1
     * Emite el evento -> event Play(address,uint,bool,uint) (ver en seccion EVENTOS)
     * Retorna true si gano, false si perdio.
    */
    function playUno( uint _value) public payable returns(bool results){}


    //Funcion es utilizada para sumar el fee(3.5%) a la transaccion, usar para obtener cuanto se debe
    //pagar para usar playUno y Play2
    function calculateValue(uint _value)public view returns(uint){}

    //Para usar, es lo mismo que las instruccions de playUno
    /* Diferencia con playUno:
     * Guarda datos totalWins,totalLoses,winLosesPerUser,winLosesRache.
     * Consume aproximadamente el doble de gas.
     * Se creo para testear el consumo extra al escribir en variables extras.  
    */
    function playDos( uint _value) public payable returns(bool results){}


    //EVENTOS
    /*Como entender cada parametro:
     - address: direccion del jugador, quien ejecuto esa partida.
     - uint: Valor de la transaccion.
     - bool: true si gano, false si perdio, sin importar la mano que elija.
     - uint: valor numerico que representa su jugada [1-100]. 
    */
    event Play(address,uint,bool,uint);// User, your hand, computer hand


    //Poco utiles, muestran el cambio del addres, falta implementar mejor
    event C_setNFTHoldersAddress(address); // C_(Change), addres owner
    event C_setDevAddress(address);//
    event C_setFeeForNFTHolders(address);
    event C_setFeeForDevs(address);
    event C_setMaxDeal(address);
}