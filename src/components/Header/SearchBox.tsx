import { useState } from 'react'
import Link from 'next/link'
import { useSearchData } from '../../hooks/useSearchData'

import styles from './searchBox.module.scss'

export function SearchBox() {
  const { handleRequest  } = useSearchData()
  const [search, setSearch] = useState<string>('')

  function handleRequestInput() {
    if (search) {
      handleRequest(search)
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
          onClick={handleRequestInput}
        >
          <img src="/images/Magnifier.svg" alt="Lupa" />
        </button>
      </Link>
    </label>
  )
}