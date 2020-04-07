import { useEffect, useState } from '/web_modules/react.js'
import { html } from '/web_modules/htm/react.js'

export default function ChainNotify ({ client }) {
  const [height, setHeight] = useState()

  useEffect(() => {
    async function run () {
      const cancelFunc = await client.chainNotify(newChanges)
      function newChanges (changes) {
        for (const change of changes) {
          const {
            Type: changeType,
            Val: { Height: height }
          } = change
          /*
          console.log(
            `Time: ${new Date()} Type: ${changeType} Height: ${height}`
          )
          */
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
      Height: ${height}
    </div>
  `
}
