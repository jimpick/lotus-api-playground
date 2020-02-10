function start (cb) {
  console.log('Jim1')
  const ws = new WebSocket(`ws://${location.host}/api/rpc/v0`)
  ws.onopen = function (event) {
    console.log('Jim2')

    function send (message) {
      console.log('js send', message)
      ws.send(message)
    }

    ws.onmessage = function (event) {
      console.log('js recv', event.data)
      if (window.ws.handler) {
        window.ws.handler(event.data)
      }
    }

    window.ws.send = send

    cb(ws)
  }
}

window.ws = {
  start
}