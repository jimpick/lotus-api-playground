import { useEffect, useState } from '/web_modules/react.js'
import { html } from '/web_modules/htm/react.js'
import Client from '/lib/client-it.js'

export default function ChainHeight (props) {
  const [height, setHeight] = useState()

  useEffect(() => {
    async function run () {
      const client = new Client({
        url: `ws://${location.host}/api/rpc/v0`,
        token: localStorage.getItem('token')
      })
      const source = client.chainNotify(setHeight)
      for await (const changes of source) {
        for (const change of changes) {
          const { Type: changeType, Val: { Height: height } } = change
          console.log(`Time: ${new Date()} Type: ${changeType} Height: ${height}`)
          if (changeType === 'current' || changeType === 'apply') {
            setHeight(height)
          }
        }
      }
    }
    run()
  }, [])

  return html`
    <div class="chainHeight">
      Height: ${height}
    </div>
  `
}
