// Import your web-ready dependencies
import { h, Component, render } from '/web_modules/preact.js'
import { useEffect } from '/web_modules/preact/hooks.js'
import htm from '/web_modules/htm.js'
import Client from '/lib/client.js'

const html = htm.bind(h)

// Create your main app component
function ChainHead (props) {
  useEffect(() => {
    async function run () {
      const client = new Client({
        url: '/api/rpc/v0',
        token: localStorage.getItem('token')
      })
      const json = await client.request('ChainHead')
      console.log('Jim json', json)
    }
    run()
  }, [])

  return html`
    <h1>Chain Head</h1>
  `
}

// Inject your application into the an element with the id `app`.
render(html`<${ChainHead} />`, document.getElementById('app'))
