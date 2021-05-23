import { useState } from 'react'
import Link from 'next/link'
import { useSearchData } from '../../hooks/useSearchData'

import styles from './searchBox.module.scss'

export function SearchBox() {
  const { handleSearch } = useSearchData()
  const [search, setSearch] = useState<string>('')

  function handleSearchInput() {
    if (search) {
      handleSearch(search)
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
      />
      <Link href={search ? `/results/${search}`: ''}>
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