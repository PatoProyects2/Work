import Chain from "./Chain"
import {
    rpsGameContract
} from './Contracts'

let chains = []

chains.push(
    new Chain(
        "BSC Mainnet",
        56,
        "BNB",
        "https://bsc-dataseed.binance.org/",
        "https://bscscan.com/",
        rpsGameContract,
    )
)

chains.push(
    new Chain(
        "BSC Testnet",
        97,
        "BNB",
        "https://data-seed-prebsc-1-s1.binance.org:8545/",
        "https://bscscan.com/",
        rpsGameContract,
    )
)

chains.push(
    new Chain(
        "Polygon Mainnet",
        137,
        "MATIC",
        "https://polygon-rpc.com/",
        "https://explorer.matic.network/",
    )
)

export default chains;

