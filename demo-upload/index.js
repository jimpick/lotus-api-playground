import { useState } from '/web_modules/react.js'
import ReactDOM from '/web_modules/react-dom.js'
import { html } from '/web_modules/htm/react.js'
import ChainHeight from './chainHeight.js'
import FilePicker from './filePicker.js'
import Importer from './importer.js'

function UploadDemo (props) {
  const [file, setFile] = useState()

  return html`
    <h1>Upload Demo</h1>
    <nav>
      <a href="/">Top</a>
    </nav>
    <${ChainHeight} />
    <${FilePicker} onFile=${setFile} />
    ${file && html`<${Importer} file=${file} />`}
  `
}

ReactDOM.render(html`<${UploadDemo} />`, document.getElementById('app'))
