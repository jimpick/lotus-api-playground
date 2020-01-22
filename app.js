import ReactDOM from '/web_modules/react-dom.js'
import { html } from '/web_modules/htm/react.js'

function Main (props) {
  return html`
    <h1>Lotus API Playground</h1>
    <ul>
      <li><a href="/chain-head/">Chain Head</a></li>
    </ul>
  `
}

ReactDOM.render(html`<${Main} />`, document.getElementById('app'))
