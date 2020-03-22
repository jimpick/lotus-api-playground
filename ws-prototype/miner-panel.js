import { useEffect, useState } from '/web_modules/react.js'
import { html } from '/web_modules/htm/react.js'
import ChainNotify from './chain-notify.js'
import Version from './version.js'

const sectorStates = {
  0: 'UndefinedSectorState',
	1: 'Empty',
  2: 'Packing',
  3: 'Unsealed',
  4: 'PreCommitting',
  5: 'WaitSeed',
	6: 'Committing',
  7: 'CommitWait',
	8: 'FinalizeSector',
	9: 'Proving',
	20: 'FailedUnrecoverable',
	21: 'SealFailed',
	22: 'PreCommitFailed',
	23: 'SealCommitFailed',
	24: 'CommitFailed',
	25: 'PackingFailed',
  29: 'Faulty',
  30: 'FaultReported',
  31: 'FaultedFinal'
}

export default function MinerPanel ({ node, miner }) {
  const [address, setAddress] = useState()
  const [sectorSize, setSectorSize] = useState()
  const [minerPower, setMinerPower] = useState()
  const [sectorCount, setSectorCount] = useState()
  const [faults, setFaults] = useState()
  const [postState, setPostState] = useState()
  const [sectors, setSectors] = useState([])
  const [refresh, setRefresh] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    async function run () {
      const address = await miner.actorAddress()
      setAddress(address)
      const sectorSize = await node.stateMinerSectorSize(address, [])
      setSectorSize(sectorSize)
    }
    run()
  }, [node, miner])

  useEffect(() => {
    if (!address) return
    async function run () {
      const minerPower = await node.stateMinerPower(address, [])
      setMinerPower(minerPower)
      const sectorCount = await node.stateMinerSectorCount(address, [])
      setSectorCount(sectorCount)
      const faults = await node.stateMinerFaults(address, [])
      setFaults(faults)
      const postState = await node.stateMinerPostState(address, [])
      setPostState(postState)
      const sectorsList = await miner.sectorsList()
      const sectors = []
      for (let sectorNum of sectorsList) {
        const status = await miner.sectorsStatus(sectorNum)
        const state = sectorStates[status.State] !== undefined ?
          sectorStates[status.State] : status.State
        sectors.push({ sectorNum, state })
      }
      setSectors(sectors.sort(({sectorNum: a}, {sectorNum: b}) => {
        return Number(a) - Number(b)
      }))
      setTimeout(() => setRefresh(Date.now()), 5000)
    }
    run()
  }, [address, node, miner, refresh])

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
          <li key="1">Committed: ${sectorCount && sectorCount.Sset}</li>
          <li key="2">Proving: ${sectorCount && sectorCount.Pset}</li>
          <li key="3">Faults: ${faults && faults.length}</li>
        </ul>
      </div>
      <div>
        Post State: <br />
        <ul style=${{margin: '0 0'}}>
          <li key="1">Proving Period Start: ${postState && postState.ProvingPeriodStart}</li>
          <li key="2">Consecutive Failures: ${postState && postState.NumConsecutiveFailures}</li>
        </ul>
      </div>
      <div>
        Sectors: <br />
        <ul style=${{margin: '0 0'}}>
          ${sectors.map(sector => html`
            <li key=${sector.sectorNum}>${sector.sectorNum}: ${sector.state}</li>
          `)}
        </ul>
        <button onClick=${pledge}>Pledge</button> <span>${message}</span>
      </div>
      <br />
      <${Version} client=${miner} />
    </div>
  `

  async function pledge () {
    setMessage('Pledging...')
    await miner.pledgeSector()
    setMessage('Sector Pledged')
    setRefresh(Date.now())
    setTimeout(() => setMessage(''), 1000)
  }
}
