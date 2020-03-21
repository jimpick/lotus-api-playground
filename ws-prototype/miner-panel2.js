import { useEffect, useState } from '/web_modules/react.js'
import { html } from '/web_modules/htm/react.js'
import suspenseDelayWithClient from './suspense-delay-with-client.js'

export default function MinerPanel2 ({ node, miner }) {
  // const [address, setAddress] = useState()
  const [delay, setDelay] = useState()
  useEffect(() => setDelay(suspenseDelayWithClient(1000, miner)), [miner])

  if (!delay) return null
  const address = delay.read()

  return html`
    <div>
      <div>
        Address: ${address}
      </div>
    </div>
  `
}
