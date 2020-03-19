import ReactDOM from '/web_modules/react-dom.js'
import { html } from '/web_modules/htm/react.js'
import useLotusClient from './use-lotus-client.js'
import ChainNotify from './chain-notify.js'
import MinerAddress from './miner-address.js'
import Version from './version.js'

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
    <h1>Websocket Prototype</h1>
    <nav>
      <a href="/">Top</a>
    </nav>
    <div style=${{display: 'grid', gridTemplateRows: `repeat(${nodes.length}, auto)`}}>
      ${nodes.map(([node, miner], i) => html`
        <div style=${{gridColumn: i + 1}}>
          <${MinerAddress} client=${miner} />
          <${ChainNotify} client=${node} />
          <${Version} client=${miner} />
        </div>
      `)}
    </div>
  `
}

ReactDOM.render(
  html`
    <${LocalNet} />
  `,
  document.getElementById('app')
)
