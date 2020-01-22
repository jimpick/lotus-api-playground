import ReactDOM from 'react-dom'
import { html } from 'htm/react'

function Main (props) {
  return html`
    <h1>Lotus API Playground</h1>
    <ul>
      <li><a href="/chain-head/">Chain Head</a></li>
    </ul>
  `
}

ReactDOM.render(html`<${Main} />`, document.getElementById('app'))
