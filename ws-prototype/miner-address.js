import { useEffect, useState } from '/web_modules/react.js'
import { html } from '/web_modules/htm/react.js'

export default function MinerAddress ({ client }) {
  const [address, setAddress] = useState()

  useEffect(() => {
    if (client) {
      async function run () {
        const address = await client.actorAddress()
        setAddress(address)
      }
      run()
    }
  }, [client])

  return html`
    <div>
      Address: ${address}
    </div>
  `
}