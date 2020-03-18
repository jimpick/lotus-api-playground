import ReactDOM from '/web_modules/react-dom.js'
import { html } from '/web_modules/htm/react.js'
import useLotusClient from './use-lotus-client.js'
import ChainNotify from './chain-notify.js'
import MinerAddress from './miner-address.js'
import Version from './version.js'

function LocalNet (props) {
  const miner0 = useLotusClient(0, 'miner')
  const miner1 = useLotusClient(1, 'miner')
  const miner2 = useLotusClient(2, 'miner')

  const miners = [miner0, miner1, miner2]
  return html`
    <h1>Websocket Prototype</h1>
    <nav>
      <a href="/">Top</a>
    </nav>
    <div style=${{display: 'grid', gridTemplateRows: `repeat(${miners.length}, auto)`}}>
      ${miners.map((miner, i) => html`
        <div style=${{gridColumn: i + 1}}>
          <${MinerAddress} client=${miner} />
          <${ChainNotify} node=${i} />
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
