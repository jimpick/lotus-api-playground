import { useState, useEffect } from '/web_modules/react.js'

export default function useImportedCids () {
  const [cids, setCids] = useState([])

  useEffect(() => {
    const cids = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key.startsWith('cid:')) {
        try {
          const cid = key.replace(/^cid:/, '')
          const record = JSON.parse(localStorage.getItem(key))
          cids.push({
            cid,
            ...record
          })
        } catch (e) {
          console.error('Parse error', e)
        }
      }
    }
    const sortedCids = cids.sort(({ importedAt: a }, { importedAt: b }) => {
      return new Date(b) - new Date(a)
    })
    setCids(sortedCids)
  }, [])

  return cids
}
