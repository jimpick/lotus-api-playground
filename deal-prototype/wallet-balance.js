import { useState, useEffect } from '/web_modules/react.js'
import { html } from '/web_modules/htm/react.js'

export default function WalletBalance ({ node }) {
  const [address, setAddress] = useState()
  const [refresh, setRefresh] = useState()
  const [error, setError] = useState()
  useEffect(() => {
    if (error) throw error
    async function run () {
      try {
        const address = await node.walletDefaultAddress()
        setAddress(address)
      } catch (e) {
        setError(e)
        return
      }
      setTimeout(() => setRefresh(Date.now()), 5000)
    }
    run()
  }, [node, refresh, error])

  const balance = 0

  return html`
    <div>
      <div>
        Address: ${address}<br />
        Balance: ${balance}
      </div>
    </div>
  `
}
