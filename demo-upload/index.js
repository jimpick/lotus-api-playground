import { useEffect, useState, useRef } from '/web_modules/react.js'
import ReactDOM from '/web_modules/react-dom.js'
import { html } from '/web_modules/htm/react.js'
import Client from '/lib/client-it.js'

function UploadDemo (props) {
  const [height, setHeight] = useState()
  const [file, setFile] = useState()
  const fileInput = useRef(null)

  useEffect(() => {
    async function run () {
      const client = new Client({
        url: `ws://${location.host}/api/rpc/v0`,
        token: localStorage.getItem('token')
      })
      const source = client.chainNotify(setHeight)
      for await (const changes of source) {
        for (const change of changes) {
          const { Type: changeType, Val: { Height: height }} = change
          console.log(`Time: ${new Date()} Type: ${changeType} Height: ${height}`)
          if (changeType === 'current' || changeType === 'apply') {
            setHeight(height)
          }
        }
      }
    }
    run()
  }, [])

  function handleFileChange (event) {
    event.preventDefault()
    console.log(
      `Selected file - ${
        fileInput.current.files[0].name
      }`, fileInput
    )
    setFile(fileInput.current.files[0])
  }

  let info
  if (file) {
    info = html`
      <div>
        File: ${file.name}<br />
        Size: ${file.size}<br />
        Type: ${file.type}
      </div>
    `
  }
  return html`
    <h1>Upload Demo</h1>
    <nav>
      <a href="/">Top</a>
    </nav>
    <div>
      Height: ${height}
    </div>
    <label>
      Upload file:
      <input type="file" ref=${fileInput} onChange=${handleFileChange} />
    </label>
    ${info}
  `
}

ReactDOM.render(html`<${UploadDemo} />`, document.getElementById('app'))
