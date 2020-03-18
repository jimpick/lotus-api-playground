import { useEffect, useState } from '/web_modules/react.js'
import { html } from '/web_modules/htm/react.js'
import LotusRPC from './rpc.js'
import BrowserProvider from './provider.js'
import schema from './schema.js'

export default function MinerAddress (props) {
  const [address, setAddress] = useState()
  const { node } = props

  useEffect(() => {
    async function run () {
      const url = `wss://lotus.testground.ipfs.team/api/${node}/miner/rpc/v0`
      const provider = new BrowserProvider(url)
      const client = new LotusRPC(provider, { schema })
      const address = await client.actorAddress()
      client.close()
      setAddress(address)
    }
    run()
  }, [])

  return html`
    <div>
      Address: ${address}
    </div>
  `
}