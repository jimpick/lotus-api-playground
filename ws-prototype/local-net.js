import ReactDOM from '/web_modules/react-dom.js'
import { html } from '/web_modules/htm/react.js'
import useLotusClient from './use-lotus-client.js'
import MinerPanel from './miner-panel.js'

function LocalNet (props) {
  const node0 = useLotusClient(0, 'node')
  const miner0 = useLotusClient(0, 'miner')
  const node1 = useLotusClient(1, 'node')
  const miner1 = useLotusClient(1, 'miner')
  const node2 = useLotusClient(2, 'node')
  const miner2 = useLotusClient(2, 'miner')

  const nodes = []
  if (node0 && miner0) nodes.push([node0, miner0])
  if (node1 && miner1) nodes.push([node1, miner1])
  if (node2 && miner2) nodes.push([node2, miner2])

  return html`
    <div>
      <h1>Lotus JS Client Websocket Prototype</h1>
      <p style=${{fontSize: "small"}}>
      This is a simple demo React app that shows the live status of 3 nodes+miners
      using a variety of Lotus JSON-RPC API calls via 6 websockets. Library
      code will be moved into npm-published packages soon... [<a href="https://github.com/jimpick/lotus-api-playground/tree/demo/2020-03-20/ws-prototype">Source</a>]
      </p>
      <p style=${{fontSize: "small"}}>
      2020.02.30: This is connected to a live Lotus "local net" running on a Kubernetes
      cluster connect to "Testground" (testnet/3 branch with 2048 byte sectors). 
      I'm using this local net for development... the demo will work for now,
      but will likely break in the future as things change. - Jim
      </p>
      <div style=${{display: 'grid', gridTemplateRows: `repeat(${nodes.length}, auto)`}}>
        ${nodes.map(([node, miner], i) => html`
          <div key=${i} style=${{gridColumn: i + 1}}>
            <${MinerPanel} node=${node} miner=${miner} />
          </div>
        `)}
      </div>
    </div>
  `
}

const appEl = document.getElementById('app')
ReactDOM.createRoot(appEl).render(html`<${LocalNet} />`)
