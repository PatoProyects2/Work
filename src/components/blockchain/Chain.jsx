class Chain {
  name = "-"
  id = "-"
  symbol = "-"
  rpcUrl = "-"
  blockExplorerUrl = "-"
  rpsGameAddress = "-"

  constructor(
    name,
    id,
    symbol,
    rpcUrl,
    blockExplorerUrl,
    rpsGameAddress,

  ) {
    this.name = name
    this.id = id
    this.symbol = symbol
    this.rpcUrl = rpcUrl
    this.blockExplorerUrl = blockExplorerUrl
    this.rpsGameAddress = rpsGameAddress
  }
}

export default Chain;
