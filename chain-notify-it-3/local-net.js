import ReactDOM from '/web_modules/react-dom.js'
import { html } from '/web_modules/htm/react.js'
import ChainNotify from './chain-notify.js'
import MinerAddress from './miner-address.js'

export default function LocalNet (props) {
  return html`
    <h1>Local Net Lotus Websocket Demo</h1>
    <p>
      Connected to Jim's development Kubernetes Lotus local net instance. May disappear at any time.
    </p>
    <${ChainNotify} node="0" />
    <${MinerAddress} node="0" />
    <${ChainNotify} node="1" />
    <${MinerAddress} node="1" />
    <${ChainNotify} node="2" />
    <${MinerAddress} node="2" />
  `
}

ReactDOM.render(
  html`
    <${LocalNet} />
  `,
  document.getElementById('app')
)
