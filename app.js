import ReactDOM from '/web_modules/react-dom.js'
import { html } from '/web_modules/htm/react.js'
import LocalNet from './chain-notify-it-3/local-net.js'

ReactDOM.render(
  html`
    <${LocalNet} />
  `,
  document.getElementById('app')
)
