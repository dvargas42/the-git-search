import { useState } from 'react'
import Link from 'next/link'

import styles from './searchBox.module.scss'
import { useSearchData } from '../../hooks/useSearchData'

export function SearchBox() {
  const { handleSearch } = useSearchData()
  const [search, setSearch] = useState<string>()

  function handleSearchInput() {
    handleSearch(search)
    setSearch('')
  }

  return (
    <label className={styles.searchBoxContainer}>
      <input
        type="text"
        placeholder="Pesquisar"
        value={search}
        onChange={event => setSearch(event.target.value)}
      />
      <Link href={`/results/${search}`}>
        <button
          type='button'
          onClick={handleSearchInput}
        >
          <img src="/images/Magnifier.svg" alt="Lupa" />
        </button>
      </Link>
    </label>
  )
}