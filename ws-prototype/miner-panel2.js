import { html } from '/web_modules/htm/react.js'
import useSuspenseQuery from './use-suspense-query.js'
import Version from './version.js'

export default function MinerPanel2 ({ node, miner }) {
  const query = useSuspenseQuery(async () => {
    const address = await miner.actorAddress()
    const sectorSize = await node.stateMinerSectorSize(address, [])
    return { address, sectorSize }
  }, [node, miner])

  if (!query) return null
  const { address, sectorSize } = query.read()

  return html`
    <div>
      <div>
        Address: ${address}
      </div>
      <div>
        Sector Size: ${sectorSize}
      </div>
      <${Version} client=${node} />
    </div>
  `
}
