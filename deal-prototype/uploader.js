import { useState, useEffect } from '/web_modules/react.js'
import { html } from '/web_modules/htm/react.js'
import CidList from './cidList.js'
import FilePicker from './filePicker.js'
import Importer from './importer.js'
import useImportedCids from './useImportedCids.js'

export default function Uploader ({ nodeNumber, token, proposeDeal }) {
  const [file, setFile] = useState()
  const cids = useImportedCids()

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
      <div>
        <${CidList} cids=${cids} />
        <${FilePicker} onFile=${setFile} />
        ${file &&
          html`
            <${Importer} nodeNumber=${nodeNumber} token=${token} file=${file} />
          `}
        <hr />
      </div>
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
        <div style=${{ marginBottom: '1rem' }}>
          <ul>
            <li>CID: ${cid}</li>
            <li>Name: ${name}</li>
            <li>Type: ${type}</li>
            <li>Size: ${size}</li>
            <li>Imported At: ${importedAt}</li>
          </ul>
          <button onClick=${() => deal('t01003')}>
            Propose Deal with t01003
          </button>
          <button onClick=${() => deal('t01004')}>
            Propose Deal with t01004
          </button>
        </div>
      `

      function deal (minerAddress) {
        console.log('Jim deal', minerAddress)
        proposeDeal(cid, minerAddress)
      }
    }
  }
  return html`
    <div>
      <nav>
        ${cid &&
          html`
            <a href="#">All Uploads</a>
          `}
      </nav>
      ${view}
    </div>
  `
}
