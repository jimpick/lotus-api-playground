import { useEffect, useState } from '/web_modules/react.js'
import ReactDOM from '/web_modules/react-dom.js'
import { html } from '/web_modules/htm/react.js'
import ReactJson from '/web_modules/react-json-view.js'
import Client from '/lib/client.js'

function ChainHead (props) {
  const [chainHead, setChainHead] = useState()

  useEffect(() => {
    async function run () {
      const client = new Client({
        url: document.location.origin + '/api/rpc/v0',
        // url: 'http://127.0.0.1:8000/api/rpc/v0',
        // token: localStorage.getItem('token')
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
      collapseStringsAfterLength=${70}
      displayDataTypes=${false}
      onSelect=${onSelect}
    />
  `

  function onSelect (select) {
    console.log('Select', select)
    const { namespace, name, value } = select
    if (namespace.length === 2 && namespace[0] === 'Cids') {
      console.log('Block CID', value)
      location.href = '/chain-get-block/?cid=' + value
    }
    if (
      namespace.length === 4 &&
      namespace[0] === 'Blocks' &&
      namespace[2] === 'Parents'
    ) {
      console.log('Parent Block CID', value)
      location.href = '/chain-get-block/?cid=' + value
    }
    if (name === 'Miner') {
      console.log('Miner', value)
      location.href = '/state-get-actor/?actor=' + value
    }
  }
}

ReactDOM.render(
  html`
    <${ChainHead} />
  `,
  document.getElementById('app')
)
