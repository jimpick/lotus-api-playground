import { useState, useEffect } from '/web_modules/react.js'
import { html } from '/web_modules/htm/react.js'
import { FilecoinNumber } from '/web_modules/@openworklabs/filecoin-number.js'

function MarketBalance ({ node, address }) {
  const [balance, setBalance] = useState()
  const [refresh, setRefresh] = useState()
  const [error, setError] = useState()

  useEffect(() => {
    if (!address) return
    if (error) throw error
    async function run () {
      try {
        const balance = await node.stateMarketBalance(address, [])
        console.log('Jim stateMarketBalance', balance)
        setBalance({
          escrow: new FilecoinNumber(balance.Escrow, 'attofil'),
          locked: new FilecoinNumber(balance.Locked, 'attofil'),
        })
      } catch (e) {
        setError(e)
        return
      }
      setTimeout(() => setRefresh(Date.now()), 1000)
    }
    run()
  }, [node, address, refresh, error])
  return html`
    <span>
      ${address.slice(0, 4) + '..' + address.slice(-4)}:
      ${balance !== undefined && html`
        Escrow: ${balance.escrow.toFil()} ${' '}
        Locked: ${balance.locked.toFil()}
      `}<br />
    </span>
  `
}

export default function MarketBalances ({ node, wallets, walletsDispatch }) {
  const [address, setAddress] = useState()
  const [balance, setBalance] = useState()
  const [refresh, setRefresh] = useState()
  const [error, setError] = useState()
  useEffect(() => {
    if (error) throw error
    async function run () {
      try {
        const address = await node.walletDefaultAddress()
        setAddress(address)
        walletsDispatch({
          type: 'addWallet',
          walletAddress: address
        })
      } catch (e) {
        setError(e)
        return
      }
    }
    run()
  }, [node, error])
  useEffect(() => {
    if (!address) return
    if (error) throw error
    async function run () {
      try {
        const balance = await node.walletBalance(address)
        setBalance(new FilecoinNumber(balance, 'attofil'))
      } catch (e) {
        setError(e)
        return
      }
      setTimeout(() => setRefresh(Date.now()), 5000)
    }
    run()
  }, [node, address, refresh, error])

  return html`
    <div>
      <div>
        Address: ${address && address.slice(0, 4) + '..' + address.slice(-4)}<br />
        Balance: ${balance !== undefined && balance.toFil()}<br />
        Market Wallets:
          ${[...wallets].map(walletAddress => {
            return html`
              <li key=${walletAddress}>
                <${MarketBalance} node=${node} address=${walletAddress} />
              </li>
            `
          })}
      </div>
    </div>
  `
}
