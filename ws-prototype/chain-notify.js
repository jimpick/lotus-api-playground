import { useEffect, useState } from '/web_modules/react.js'
import { html } from '/web_modules/htm/react.js'
import Client from './client-it.js'

export default function ChainNotify (props) {
  const [height, setHeight] = useState()
  const { node } = props

  useEffect(() => {
    async function run () {
      const client = new Client({
        url: `wss://lotus.testground.ipfs.team/api/${node}/node/rpc/v0`,
        token: localStorage.getItem('token')
      })
      const source = client.chainNotify(setHeight)
      for await (const changes of source) {
        for (const change of changes) {
          const {
            Type: changeType,
            Val: { Height: height }
          } = change
          console.log(
            `Time: ${new Date()} Type: ${changeType} Height: ${height}`
          )
          if (changeType === 'current' || changeType === 'apply') {
            setHeight(height)
          }
        }
      }
    }
    run()
  }, [])

  return html`
    <div>
      Node: ${node} Height: ${height}
    </div>
  `
}