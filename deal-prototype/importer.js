import { useState } from '/web_modules/react.js'
import { html } from '/web_modules/htm/react.js'

export default function Importer (props) {
  const [file, setFile] = useState()
  const [cid, setCid] = useState()

  if (file !== props.file) {
    console.log('New file', props.file.name)
    setFile(props.file)
    setCid(null)
  }

  return html`
    <div className="importer">
      ${!cid &&
        html`
          <button onClick=${doImport}>Import</button>
        `}
      ${cid &&
        html`
          CID: ${cid}
        `}
    </div>
  `

  async function doImport () {
    console.log('Import', file)
    const headers = {
      'Content-Type': file.type,
      Accept: '*/*',
      Authorization: `Bearer ${props.token}`
    }
    const api = 'lotus.testground.ipfs.team/api'
    const url = `https://${api}/${props.nodeNumber}/node/rest/v0/import`
    const response = await fetch(url, {
      method: 'PUT',
      headers,
      body: file
    })
    // FIXME: Check return code, errors
    const result = await response.json()
    console.log('Import result', result)
    const cid = result.Cid['/']
    setCid(cid)
    const record = {
      importedAt: new Date().toISOString(),
      name: file.name,
      type: file.type,
      size: file.size
    }
    localStorage.setItem(`cid:${cid}`, JSON.stringify(record))
    setTimeout(() => {
      document.location.hash = cid
      document.location.reload()
    }, 1000)
  }
}
