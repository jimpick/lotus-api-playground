import { useEffect, useState } from '/web_modules/react.js'
import { html } from '/web_modules/htm/react.js'

export default function Version ({ client }) {
  const [version, setVersion] = useState()

  useEffect(() => {
    async function run () {
      const version = await client.version()
      setVersion(version)
    }
    run()
  }, [client])

  if (!version) return html`<div>Loading...</div>`
  return html`
    <div>
      Version: ${version.Version}<br />
      API Version: ${version.APIVersion}<br />
      Block Delay: ${version.BlockDelay}
    </div>
  `
}