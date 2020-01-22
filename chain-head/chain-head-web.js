import { useEffect, useState } from '/web_modules/react.js'
import ReactDOM from '/web_modules/react-dom.js'
import { html } from '/web_modules/htm/react.js'
import ReactJson from '/web_modules/react-json-view.js'
import Client from '/lib/client.js'

function JSONTree2 (props) {
  return html`<pre>Props: ${props.data.a}</pre>`
}

function ChainHead (props) {
  const [chainHead, setChainHead] = useState()

  useEffect(() => {
    async function run () {
      const client = new Client({
        url: '/api/rpc/v0',
        token: localStorage.getItem('token')
      })
      const json = await client.request('ChainHead')
      setChainHead(json)
    }
    run()
  }, [])

  return html`
    <h1>Chain Head</h1>
    <nav>
      <a href="/">Top</a>
    </nav>

    <${ReactJson}
      src=${chainHead}
      collapseStringsAfterLength=${50}
      displayDataTypes=${false}
      onSelect=${onSelect} />

  `

  function onSelect (select) {
    console.log('Select', select)
  }
}

ReactDOM.render(html`<${ChainHead} />`, document.getElementById('app'))
