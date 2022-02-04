class Chain {
  name = "-"
  id = "-"
  symbol = "-"
  rpcUrl = "-"
  blockExplorerUrl = "-"
  rpsGameAddress = "-"
  polygonSwapAddress = "-"

  constructor(
    name,
    id,
    symbol,
    rpcUrl,
    blockExplorerUrl,
    rpsGameAddress,
    polygonSwapAddress

  ) {
    this.name = name
    this.id = id
    this.symbol = symbol
    this.rpcUrl = rpcUrl
    this.blockExplorerUrl = blockExplorerUrl
    this.rpsGameAddress = rpsGameAddress
    this.polygonSwapAddress = polygonSwapAddress
  }
}

export default Chain;
