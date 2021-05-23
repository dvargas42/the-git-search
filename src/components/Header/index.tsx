import Link from 'next/link'

import { SearchBox } from './SearchBox'

import styles from './header.module.scss'

export function Header() {
  return (
    <div className={styles.headerContainer}>
      <Link href={'/'}>
        <a>
          <img src="/images/Logotype.svg" alt="logo" />
        </a>
      </Link>
      <SearchBox />
    </div>
  )
}