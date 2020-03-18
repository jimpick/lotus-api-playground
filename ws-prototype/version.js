import { useEffect, useState } from '/web_modules/react.js'
import { html } from '/web_modules/htm/react.js'
import LotusRPC from './rpc.js'
import BrowserProvider from './provider.js'
import schema from './schema.js'

export default function Version (props) {
  const [version, setVersion] = useState()
  const { node } = props

  useEffect(() => {
    async function run () {
      const url = `wss://lotus.testground.ipfs.team/api/${node}/miner/rpc/v0`
      const provider = new BrowserProvider(url)
      const client = new LotusRPC(provider, { schema })
      const version = await client.version()
      client.close()
      setVersion(version)
    }
    run()
  }, [])

  return html`
    <div>
      Version: ${JSON.stringify(version)}
    </div>
  `
}