import { useEffect, useState } from '/web_modules/react.js'
import LotusRPC from './rpc.js'
import BrowserProvider from './provider.js'
import schema from './schema.js'

export default function useLotusClient (nodeNumber, nodeOrMiner) {
  const [client, setClient] = useState()

  useEffect(() => {
    const url = `wss://lotus.testground.ipfs.team/api` +
      `/${nodeNumber}/${nodeOrMiner}/rpc/v0`
    const provider = new BrowserProvider(url)
    setClient(new LotusRPC(provider, { schema }))
  }, [])

  return client
}