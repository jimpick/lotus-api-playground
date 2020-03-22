import { useEffect, useState } from '/web_modules/react.js'
import suspenseQuery from './suspense-query.js'

export default function useSuspenseQuery (queryPromise, deps) {
  const [query, setQuery] = useState()
  useEffect(() => {
    setQuery(suspenseQuery(queryPromise))
  }, deps)
  return query
}
