import ReactDOM from '/web_modules/react-dom.js'
import { useState, useReducer, Suspense } from '/web_modules/react.js'
import { html } from '/web_modules/htm/react.js'
import Uploader from './uploader.js'
import useLotusClient from './use-lotus-client.js'
import MinerPanel from './miner-panel.js'
import ErrorBoundary from './error-boundary.js'
import MarketBalances from './market-balances.js'

function reducer (state, action) {
  switch (action.type) {
    case 'addWallet':
      const newWallets = new Set(state)
      newWallets.add(action.walletAddress)
      return newWallets
    default:
      throw new Error()
  }
}

function LocalNet (props) {
  const [genesisNodeNumber, setGenesisNodeNumber] = useState()
  const [node0, nodeToken0] = useLotusClient(0, 'node')
  const [miner0] = useLotusClient(0, 'miner')
  const [node1, nodeToken1] = useLotusClient(1, 'node')
  const [miner1] = useLotusClient(1, 'miner')
  const [node2, nodeToken2] = useLotusClient(2, 'node')
  const [miner2] = useLotusClient(2, 'miner')
  const [wallets, walletsDispatch] = useReducer(reducer, new Set())

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

  async function proposeDeal (cid, minerAddress) {
    console.log(`Proposing deal to ${minerAddress} for ${cid}`)
    const node = nodes[genesisNodeNumber][0]
    const address = await node.walletDefaultAddress()
    const dataRef = {
      Data: {
        TransferType: 'graphsync',
        Root: {
          // '/': 'bafkreifi255my6g5wket4fxgirz7zy2raocn7rytby6bucjl2aoeiqvy4y'
          '/': cid
        },
        PieceCid: null,
        PieceSize: 0
      },
      Wallet: address,
      Miner: minerAddress,
      EpochPrice: '500',
      BlocksDuration: 100
    }
    const result = await node.clientStartDeal(dataRef)
    console.log('Deal result', result)
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
                  <hr />
                  <${MarketBalances}
                    node=${node}
                    wallets=${wallets}
                    walletsDispatch=${walletsDispatch}
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
