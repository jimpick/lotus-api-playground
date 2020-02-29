import { html } from '/web_modules/htm/react.js'

export default function CidList ({ cids }) {
  return html`
    <ul>
    ${cids.map(record => {
      return html`
        <li>
          <a href="#${record.cid}">${record.cid}</a> <b>${record.name}</b> <i>${record.size}</i>
        </li>
      `
    })}
    </ul>
  `
}
