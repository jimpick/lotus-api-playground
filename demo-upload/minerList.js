import { html } from '/web_modules/htm/react.js'

export default function MinerList ({ miners }) {
  return html`
    <ul>
    ${miners.map(minerId => {
      return html`
        <li>
          ${minerId}
        </li>
      `
    })}
    </ul>
  `
}
