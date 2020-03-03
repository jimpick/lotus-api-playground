import { useState, useEffect } from '/web_modules/react.js'
import Client from '/lib/client-it.js'

export default function useMiners () {
  const [miners, setMiners] = useState([])

  useEffect(() => {
    async function run () {
      const client = new Client({
        url: `ws://${location.host}/api/rpc/v0`,
        token: localStorage.getItem('token')
      })
      const miners = await client.stateListMiners()
      setMiners(miners)
    }
    run()
  }, [])

  return miners
}
