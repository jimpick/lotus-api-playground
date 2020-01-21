// Import your web-ready dependencies
import { h, Component, render } from '/web_modules/preact.js'
import htm from '/web_modules/htm.js'

const html = htm.bind(h)

// Create your main app component
function SomePreactComponent (props) {
  return html`
    <h1>Lotus API Playground</h1>
    <ul>
      <li><a href="/chain-head/">Chain Head</a></li>
    </ul>
  `
}

// Inject your application into the an element with the id `app`.
render(html`<${SomePreactComponent} />`, document.getElementById('app'))
