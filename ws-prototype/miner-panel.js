import { useEffect, useState } from '/web_modules/react.js'
import { html } from '/web_modules/htm/react.js'
import ChainNotify from './chain-notify.js'
import Version from './version.js'

export default function MinerAddress ({ node, miner }) {
  const [address, setAddress] = useState()
  const [sectorSize, setSectorSize] = useState()
  const [minerPower, setMinerPower] = useState()
  const [sectorCount, setSectorCount] = useState()
  const [faults, setFaults] = useState()

  useEffect(() => {
    async function run () {
      const address = await miner.actorAddress()
      setAddress(address)
      const sectorSize = await node.stateMinerSectorSize(address, [])
      setSectorSize(sectorSize)
      const minerPower = await node.stateMinerPower(address, [])
      setMinerPower(minerPower)
      const sectorCount = await node.stateMinerSectorCount(address, [])
      setSectorCount(sectorCount)
      const faults = await node.stateMinerFaults(address, [])
      setFaults(faults)
    }
    run()
  }, [miner])

  return html`
    <div>
      <${ChainNotify} client=${node} />
      <div>
        Address: ${address}
      </div>
      <div>
        Sector Size: ${sectorSize}
      </div>
      <div>
        Miner Power: ${minerPower && html`${minerPower.MinerPower} / ${minerPower.TotalPower}`}
      </div>
      <div>
        Sector Count:
        <ul style=${{margin: '0 0'}}>
          <li>Committed: ${sectorCount && sectorCount.Sset}</li>
          <li>Proving: ${sectorCount && sectorCount.Pset}</li>
          <li>Faults: ${faults && faults.length}</li>
        </ul>
      </div>
      <br />
      <${Version} client=${miner} />
    </div>
  `
}