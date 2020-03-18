import ReactDOM from '/web_modules/react-dom.js'
import { html } from '/web_modules/htm/react.js'
import ChainNotify from './chain-notify.js'
import MinerAddress from './miner-address.js'
import Version from './version.js'

function LocalNet (props) {
  return html`
    <h1>Websocket Prototype</h1>
    <nav>
      <a href="/">Top</a>
    </nav>
    <${ChainNotify} node="0" />
    <${MinerAddress} node="0" />
    <${Version} node="0" />
  `
}

ReactDOM.render(
  html`
    <${LocalNet} />
  `,
  document.getElementById('app')
)
