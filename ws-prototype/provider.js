export default class BrowserProvider {
  constructor (url) {
    this.url = url
    this.id = 0
    this.inflight = new Map()
  }

  connect () {
    if (!this.connectPromise) {
      this.connectPromise = new Promise((resolve, reject) => {
        this.ws = new WebSocket(this.url)
        // FIXME: reject on error or timeout
        this.ws.onopen = function () {
          resolve()
        }
        this.ws.onmessage = this.receive.bind(this)
      })
    }
    return this.connectPromise
  }

  send (request) {
    const json = {
      jsonrpc: '2.0',
      id: this.id++,
      ...request
    }
    const promise = new Promise((resolve, reject) => {
      this.ws.send(JSON.stringify(json))
      // FIXME: Add timeout
      this.inflight.set(json.id, cb)
      function cb (err, result) {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      }
    })
    return promise
  }

  receive (event) {
    try {
      const {
        result,
        id
      } = JSON.parse(event.data)
      // FIXME: JSON-RPC errors?
      const cb = this.inflight.get(id)
      if (cb) {
        this.inflight.delete(id)
        cb(null, result)
      }
    } catch (e) {
      console.error('RPC receive error', e)
    }
  }

  close () {
    if (this.ws) {
      this.ws.close()
    }
  }
}