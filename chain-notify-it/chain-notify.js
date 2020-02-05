import { useEffect, useState } from '/web_modules/react.js'
import ReactDOM from '/web_modules/react-dom.js'
import { html } from '/web_modules/htm/react.js'
import Client from '/lib/client-it.js'

function ChainNotify (props) {
  const [height, setHeight] = useState()

  useEffect(() => {
    async function run () {
      const client = new Client({
        url: `ws://${location.host}/api/rpc/v0`,
        token: localStorage.getItem('token')
      })
      client.chainNotify(setHeight)
    }
    run()
  }, [])

  return html`
    <h1>Chain Notify (using async iterator)</h1>
    <nav>
      <a href="/">Top</a>
    </nav>
    Height: ${height}
  `
}

ReactDOM.render(html`<${ChainNotify} />`, document.getElementById('app'))
