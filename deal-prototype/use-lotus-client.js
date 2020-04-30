import { useEffect, useState } from '/web_modules/react.js'
import LotusRPC from '/web_modules/@filecoin-shipyard/lotus-client-rpc.js'
// import LotusRPC from './lotus-client-rpc.js'
import BrowserProvider from '/web_modules/@filecoin-shipyard/lotus-client-provider-browser.js'
// import BrowserProvider from './lotus-client-provider-browser.js'
// import schema from '/web_modules/@filecoin-shipyard/lotus-client-schema/prototype/testnet-v3.js'
import schema from './lotus-client-schema.js'

export default function useLotusClient (nodeNumber, nodeOrMiner) {
  const [client, setClient] = useState()
  const [token, setToken] = useState()

  useEffect(() => {
    async function run() {
      const api = 'lotus.testground.ipfs.team/api'
      const tokenUrl = 'https://' + api + `/${nodeNumber}/testplan/` +
        (nodeOrMiner === 'node' ? '.lotus' : '.lotusstorage') + '/token'
      const response = await fetch(tokenUrl)
      const token = await response.text()
      setToken(token)
      const wsUrl = 'wss://' + api + `/${nodeNumber}/${nodeOrMiner}/rpc/v0`
      const provider = new BrowserProvider(wsUrl, { token })
      setClient(new LotusRPC(provider, { schema }))
    }
    run()
  }, [])

  return [client, token]
}
