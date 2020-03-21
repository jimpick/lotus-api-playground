import { useEffect, useState } from '/web_modules/react.js'
import { html } from '/web_modules/htm/react.js'
import suspenseQuery from './suspense-query.js'

export default function MinerPanel2 ({ node, miner }) {
  const [query, setQuery] = useState()
  useEffect(() => {
    setQuery(suspenseQuery(async () => {
      const address = await miner.actorAddress()
      const sectorSize = await node.stateMinerSectorSize(address, [])
      return {
        address,
        sectorSize
      }
    }))
  }, [node, miner])

  if (!query) return null
  const {
    address,
    sectorSize
  } = query.read()

  return html`
    <div>
      <div>
        Address: ${address}
      </div>
      <div>
        Sector Size: ${sectorSize}
      </div>
    </div>
  `
}
