import { useState, useEffect } from '/web_modules/react.js'
import ReactDOM from '/web_modules/react-dom.js'
import { html } from '/web_modules/htm/react.js'
import ChainHeight from './chainHeight.js'
import CidList from './cidList.js'
import FilePicker from './filePicker.js'
import Importer from './importer.js'
import useImportedCids from './useImportedCids.js'
import useMiners from './useMiners.js'
import MinerList from './minerList.js'

function UploadDemo (props) {
  const [file, setFile] = useState()
  const cids = useImportedCids()
  const miners = useMiners()

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
      <${CidList} cids=${cids} />
      <${FilePicker} onFile=${setFile} />
      ${file &&
        html`
          <${Importer} file=${file} />
        `}
    `
  } else {
    const record = cids.find(({ cid: recordCid }) => cid === recordCid)
    if (!record) {
      view = html`
        <div>Not Found</div>
      `
    } else {
      const { importedAt, name, type, size } = record
      view = html`
        <div>
          <ul>
            <li>CID: ${cid}</li>
            <li>Name: ${name}</li>
            <li>Type: ${type}</li>
            <li>Size: ${size}</li>
            <li>Imported At: ${importedAt}</li>
          </ul>
          <div>Miners:</div>
          <${MinerList} miners=${miners} />
        </div>
      `
    }
  }
  return html`
    <h1>Upload Demo</h1>
    <nav>
      <a href="/">Top</a> ${cid &&
        html`
          <a href="#">All Uploads</a>
        `}
    </nav>
    <${ChainHeight} />
    ${view}
  `
}

ReactDOM.render(
  html`
    <${UploadDemo} />
  `,
  document.getElementById('app')
)
