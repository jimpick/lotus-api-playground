import ReactDOM from '/web_modules/react-dom.js'
import { html } from '/web_modules/htm/react.js'

function Main (props) {
  return html`
    <h1>Lotus API Playground</h1>
    <ul>
      <li><a href="/chain-head/">Chain Head</a></li>
      <li><a href="/chain-notify/">Chain Notify</a></li>
      <li><a href="/chain-notify-it/">Chain Notify (using async iterator)</a></li>
    </ul>
  `
}

ReactDOM.render(html`<${Main} />`, document.getElementById('app'))
