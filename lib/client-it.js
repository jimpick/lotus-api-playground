import pushable from '/web_modules/it-pushable.js'

export default class Client {
  constructor ({ url, token }) {
    this.url = url
    this.token = token
    this.idCounter = 0
  }

  chainNotify () {
    const ws = new WebSocket(this.url)
    const request = {
      jsonrpc: "2.0",
      id: 1,
      method: "Filecoin.ChainNotify",
      params: []
    }
    const source = pushable()
    ws.onopen = function (event) {
      ws.send(JSON.stringify(request))
    }
    ws.onmessage = function (event) {
      try {
        const { method, params } = JSON.parse(event.data)
        if (method === 'xrpc.ch.val') {
          const changes = params[1]
          source.push(changes)
          /*
          for (const change of changes) {
            const { Type: changeType, Val: { Height: height }} = change
            console.log(`Time: ${new Date()} Type: ${changeType} Height: ${height}`)
            if (changeType === 'current' || changeType === 'apply') {
              cb(height)
            }
          }
          */
        }
      } catch (e) {
        console.error(e)
      }
    }
    return source
  }
}
