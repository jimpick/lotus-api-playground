import { useEffect, useState } from '/web_modules/react.js'
import { html } from '/web_modules/htm/react.js'
import Client from '/lib/client-it.js'

export default function MinerAddress (props) {
  const [address, setAddress] = useState()
  const { node } = props

  useEffect(() => {
    async function run () {
      const client = new Client({
        url: `wss://lotus.testground.ipfs.team/api/${node}/miner/rpc/v0`,
      })
      const address = await client.actorAddress()
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