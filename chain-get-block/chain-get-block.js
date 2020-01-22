import { useEffect, useState } from '/web_modules/react.js'
import ReactDOM from '/web_modules/react-dom.js'
import { html } from '/web_modules/htm/react.js'
import ReactJson from '/web_modules/react-json-view.js'
import Client from '/lib/client.js'

function ChainGetBlock (props) {
  const [block, setBlock] = useState()
  const searchParams = (new URL(document.location)).searchParams
  const cid = searchParams.get('cid')

  useEffect(() => {
    async function run () {
      const client = new Client({
        url: '/api/rpc/v0',
        token: localStorage.getItem('token')
      })
      const params = {
        '/': cid
      }
      const json = await client.request('ChainGetBlock', params)
      setBlock(json)
    }
    run()
  }, [])

  return html`
    <h1>Block</h1>
    CID: ${cid}
    <nav>
      <a href="/">Top</a>
    </nav>

    <${ReactJson}
      src=${block}
      collapseStringsAfterLength=${70}
      displayDataTypes=${false}
      onSelect=${onSelect} />

  `

  function onSelect (select) {
    console.log('Select', select)
    const { namespace, name, value } = select
    if (namespace.length === 2 && namespace[0] === 'Parents') {
      console.log('Block CID', value)
      location.href = '/chain-get-block/?cid=' + value
    }
    if (name === 'Miner') {
      console.log('Miner', value)
      location.href = '/state-get-actor/?actor=' + value
    }
  }
}

ReactDOM.render(html`<${ChainGetBlock} />`, document.getElementById('app'))
