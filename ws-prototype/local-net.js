import ReactDOM from '/web_modules/react-dom.js'
import { html } from '/web_modules/htm/react.js'
import useLotusClient from './use-lotus-client.js'
import ChainNotify from './chain-notify.js'
import MinerAddress from './miner-address.js'
import Version from './version.js'

function LocalNet (props) {
  const miner0 = useLotusClient(0, 'miner')
  return html`
    <h1>Websocket Prototype</h1>
    <nav>
      <a href="/">Top</a>
    </nav>
    <${ChainNotify} node="0" />
    <${MinerAddress} client=${miner0} />
    <${Version} client=${miner0} />
  `
}

ReactDOM.render(
  html`
    <${LocalNet} />
  `,
  document.getElementById('app')
)
