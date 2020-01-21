const LotusRpcEngine = require('@openworklabs/lotus-jsonrpc-engine').default

const lotusJWT = process.env.FULLNODE_API_INFO.split(':')[0]

const lotusRPC = new LotusRpcEngine({
  apiAddress: 'http://127.0.0.1:11234/rpc/v0',
  token: lotusJWT,
})

async function run () {
  const chainHead = await lotusRPC.request('ChainHead')
  console.log('chainHead', chainHead)
}
run()
