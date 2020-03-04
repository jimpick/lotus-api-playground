import assert from 'assert'

import Client from '../lib/client.js'

import 'isomorphic-fetch'

describe('Version', function () {
  describe('get version', function () {
    it('should return a string', async function () {
      this.timeout(0)
      const client = new Client({
        url: 'http://127.0.0.1:8001/rpc/v0',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiLCJzaWduIiwiYWRtaW4iXX0.xAJpb1mdraYPKme5H1w1RUhjcQ7uvd8BcYvU5M0h_vI'
      })
      const json = await client.request('ChainHead')
      console.log('Jim json', json)
      assert.ok(true)
    })
  })
})
