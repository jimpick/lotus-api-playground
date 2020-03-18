import { useEffect, useState } from '/web_modules/react.js'
import { html } from '/web_modules/htm/react.js'

export default function Version ({ client }) {
  const [version, setVersion] = useState()

  useEffect(() => {
    if (client) {
      async function run () {
        const version = await client.version()
        setVersion(version)
      }
      run()
    }
  }, [client])

  return html`
    <div>
      Version: ${JSON.stringify(version)}
    </div>
  `
}