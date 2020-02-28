import { useState, useEffect } from '/web_modules/react.js'
import ReactDOM from '/web_modules/react-dom.js'
import { html } from '/web_modules/htm/react.js'
import ChainHeight from './chainHeight.js'
import CidList from './cidList.js'
import FilePicker from './filePicker.js'
import Importer from './importer.js'

function UploadDemo (props) {
  const [file, setFile] = useState()

  const getCidFromHash = () => {
    return document.location.hash.replace(/^#/, '')
  }
  const [cid, setCid] = useState(getCidFromHash())
  useEffect(() => {
    window.onhashchange = () => {
      setCid(getCidFromHash())
    }
  }, [])

  let view
  if (!cid) {
    view = html`
      <${CidList} />
      <${FilePicker} onFile=${setFile} />
      ${file && html`<${Importer} file=${file} />`}
    `
  } else {
    view = html`<div>CID: ${cid}</div>`
  }
  return html`
    <h1>Upload Demo</h1>
    <nav>
      <a href="/">Top</a> ${cid && html`<a href="#">All Uploads</a>`}
    </nav>
    <${ChainHeight} />
    ${view}
  `
}

ReactDOM.render(html`<${UploadDemo} />`, document.getElementById('app'))
