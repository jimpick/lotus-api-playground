import { useEffect, useState } from '/web_modules/react.js'
import ReactDOM from '/web_modules/react-dom.js'
import { html } from '/web_modules/htm/react.js'

function ChainNotify (props) {
  const [height, setHeight] = useState()

  useEffect(() => {
    async function run () {
      const ws = new WebSocket(`ws://${location.host}/api/rpc/v0`)
      const request = {
        jsonrpc: "2.0",
        id: 1,
        method: "Filecoin.ChainNotify",
        params: []
      }
      ws.onopen = function (event) {
        ws.send(JSON.stringify(request))
      }
      ws.onmessage = function (event) {
        try {
          const { method, params } = JSON.parse(event.data)
          if (method === 'xrpc.ch.val') {
            const changes = params[1]
            for (const change of changes) {
              const { Type: changeType, Val: { Height: height }} = change
              if (changeType === 'current' || changeType === 'apply') {
                setHeight(height)
              }
            }
          }
        } catch (e) {
          console.error(e)
        }
      }
    }
    run()
  }, [])

  return html`
    <h1>Chain Notify</h1>
    <nav>
      <a href="/">Top</a>
    </nav>
    Height: ${height}
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

ReactDOM.render(html`<${ChainNotify} />`, document.getElementById('app'))
