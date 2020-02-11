import { useState, useRef } from '/web_modules/react.js'
import { html } from '/web_modules/htm/react.js'

export default function FilePicker (props) {
  const [file, setFile] = useState()
  const fileInput = useRef(null)

  function handleFileChange () {
    const newFile = fileInput.current.files[0]
    setFile(newFile)
    if (props.onFile) {
      props.onFile(newFile)
    }
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
    <div class="filePicker">
      <label>
        Upload file:
        <input type="file" ref=${fileInput} onChange=${handleFileChange} />
      </label>
      ${info}
    </div>
  `
}
