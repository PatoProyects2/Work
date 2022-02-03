import Chain from "./Chain"
import {
    rpsGameContract
} from './Contracts'

let chains = []

chains.push(
    new Chain(
        "Polygon Mainnet",
        137,
        "MATIC",
        "https://polygon-rpc.com/",
        "https://explorer.matic.network/",
    )
)

chains.push(
    new Chain(
        "Mumbai Testnet",
        80001,
        "MATIC",
        "https://rpc-mumbai.maticvigil.com",
        "https://mumbai.polygonscan.com/",
        rpsGameContract
    )
)

export default chains;

