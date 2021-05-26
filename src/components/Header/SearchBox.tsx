import { useState } from 'react'
import Router from 'next/router'
import { useSearchData } from '../../hooks/useSearchData'

import styles from './searchBox.module.scss'

export function SearchBox() {
  const [search, setSearch] = useState<string>('')

  const { handleRequest  } = useSearchData()

  function handleRequestInput() {
    if (search) {
      handleRequest(search)
      Router.push(`/results/${search}`)
      setSearch('')
    }
  }

  return (
    <label className={styles.searchBoxContainer}>
      <input
        type="text"
        placeholder="Pesquisar"
        value={search}
        onChange={event => setSearch(event.target.value)}
        onKeyPress={event => (
          event.key === 'Enter' && handleRequestInput())
      }
      />
      <button
        type='button'
        onClick={handleRequestInput}
      >
        <img src="/images/Magnifier.svg" alt="Lupa" />
      </button>
    </label>
  )
}