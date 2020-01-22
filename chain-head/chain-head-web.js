import { h, Component, render } from '/web_modules/preact.js'
import { useEffect, useState } from '/web_modules/preact/hooks.js'
import htm from '/web_modules/htm.js'
import JSONTree from '/web_modules/@jimpick/preact-json-tree/umd/react-json-tree.js'
import Client from '/lib/client.js'

const html = htm.bind(h)

// Create your main app component
function ChainHead (props) {
  const [chainHead, setChainHead] = useState()

  useEffect(() => {
    async function run () {
      const client = new Client({
        url: '/api/rpc/v0',
        token: localStorage.getItem('token')
      })
      const json = await client.request('ChainHead')
      setChainHead(JSON.stringify(json, null, 2))
    }
    run()
  }, [])

  return html`
    <h1>Chain Head</h1>
    <pre>${chainHead}</pre>
    <JSONTree data=${chainHead} />
  `
}

// Inject your application into the an element with the id `app`.
render(html`<${ChainHead} />`, document.getElementById('app'))
