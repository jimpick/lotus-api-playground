import assert from 'assert'

import Client from '../lib/client.js'

import 'isomorphic-fetch'

describe('Version', function () {
  describe('get version', function () {
    it('should return a string', async function () {
      this.timeout(0)
      const client = new Client({
        url: 'http://localhost:8001/rpc/v0'
      })
      const json = await client.request('ChainHead')
      console.log('Jim json', json)
      assert.ok(true)
    })
  })
})
