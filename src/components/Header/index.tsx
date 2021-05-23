import Link from 'next/link'
import styles from './header.module.scss'
import { SearchBox } from './SearchBox'

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