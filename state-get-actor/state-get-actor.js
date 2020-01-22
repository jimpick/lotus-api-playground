import { useEffect, useState } from '/web_modules/react.js'
import ReactDOM from '/web_modules/react-dom.js'
import { html } from '/web_modules/htm/react.js'
import ReactJson from '/web_modules/react-json-view.js'
import Client from '/lib/client.js'

function StateGetActor (props) {
  const [actor, setActor] = useState()
  const searchParams = (new URL(document.location)).searchParams
  const actorAddress = searchParams.get('actor')

  useEffect(() => {
    async function run () {
      const client = new Client({
        url: '/api/rpc/v0',
        token: localStorage.getItem('token')
      })
      const json = await client.request('StateGetActor', actorAddress, null)
      setActor(json)
    }
    run()
  }, [])

  return html`
    <h1>Actor: ${actorAddress}</h1>
    <nav>
      <a href="/">Top</a>
    </nav>

    <${ReactJson}
      src=${actor}
      collapseStringsAfterLength=${70}
      displayDataTypes=${false}
      onSelect=${onSelect} />

  `

  function onSelect (select) {
    console.log('Select', select)
    const { namespace, value } = select
    /*
    if (namespace.length === 2 && namespace[0] === 'Parents') {
      console.log('Block CID', value)
      location.href = '/chain-get-block/?cid=' + value
    }
    */
  }
}

ReactDOM.render(html`<${StateGetActor} />`, document.getElementById('app'))
