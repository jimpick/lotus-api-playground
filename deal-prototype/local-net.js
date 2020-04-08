import ReactDOM from '/web_modules/react-dom.js'
import { useState, Suspense } from '/web_modules/react.js'
import { html } from '/web_modules/htm/react.js'
import Uploader from './uploader.js'
import useLotusClient from './use-lotus-client.js'
import MinerPanel from './miner-panel.js'
import ErrorBoundary from './error-boundary.js'

function LocalNet (props) {
  const [genesisNodeNumber, setGenesisNodeNumber] = useState()
  const [node0, nodeToken0] = useLotusClient(0, 'node')
  const [miner0] = useLotusClient(0, 'miner')
  const [node1, nodeToken1] = useLotusClient(1, 'node')
  const [miner1] = useLotusClient(1, 'miner')
  const [node2, nodeToken2] = useLotusClient(2, 'node')
  const [miner2] = useLotusClient(2, 'miner')

  const nodes = []
  if (node0 && miner0) nodes[0] = [node0, miner0, nodeToken0]
  if (node1 && miner1) nodes[1] = [node1, miner1, nodeToken1]
  if (node2 && miner2) nodes[2] = [node2, miner2, nodeToken2]

  const uploaderNodeNumber = genesisNodeNumber

  function updateGenesisNodeNumber (number) {
    if (!genesisNodeNumber) {
      setGenesisNodeNumber(number)
    }
  }

  function proposeDeal (cid, minerAddress) {
    console.log(`Proposing deal to ${minerAddress} for ${cid}`)
  }

  return html`
    <div>
      <h1>Deal Prototype</h1>
      <nav>
        <a href="/">Top</a>
      </nav>
      ${uploaderNodeNumber !== undefined &&
        html`
          <${Uploader}
            nodeNumber=${uploaderNodeNumber}
            token=${nodes[uploaderNodeNumber][2]}
            proposeDeal=${proposeDeal}
          />
        `}
      <div
        style=${{
          display: 'grid',
          gridTemplateRows: `repeat(${nodes.length}, auto)`
        }}
      >
        ${nodes.map((nodeRecord, i) => {
          if (!nodeRecord)
            return html`
              <div />
            `
          const [node, miner] = nodeRecord
          return html`
            <div key=${i} style=${{ gridColumn: i + 1 }}>
              <${ErrorBoundary}>
                <${Suspense}
                  fallback=${html`
                    Loading...
                  `}
                >
                  <${MinerPanel}
                    nodeNumber=${i}
                    node=${node}
                    miner=${miner}
                    updateGenesisNodeNumber=${updateGenesisNodeNumber}
                  />
                <//>
              <//>
            </div>
          `
        })}
      </div>
    </div>
  `
}

const appEl = document.getElementById('app')
ReactDOM.createRoot(appEl).render(
  html`
    <${LocalNet} />
  `
)
