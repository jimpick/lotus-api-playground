import { useState, useEffect } from '/web_modules/react.js'
import { html } from '/web_modules/htm/react.js'

export default function CidList (props) {
  const [cids, setCids] = useState([])

  useEffect(() => {
    const cids = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key.startsWith('cid:')) {
        try {
          const cid = key.replace(/^cid:/, '')
          const record = JSON.parse(localStorage.getItem(key))
          console.log('Jim', i, key, record)
          cids.push({
            cid,
            ...record
          })
        } catch (e) {
          console.error('Parse error', e)
        }
      }
    }
    const sortedCids = cids.sort(({importedAt: a}, {importedAt: b}) => {
      return (new Date(b)) - (new Date(a))
    })
    setCids(sortedCids)
  }, [])

  return html`
    <ul>
    ${cids.map(record => {
      return html`
        <li>
          <a href="#${record.cid}">${record.cid}</a> <b>${record.name}</b> <i>${record.size}</i>
        </li>
      `
    })}
    </ul>
  `
}
