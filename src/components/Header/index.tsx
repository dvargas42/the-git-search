import styles from './header.module.scss'
import { SearchBox } from './SearchBox'

export function Header() {
  return (
    <div className={styles.headerContainer}>
      <img src="/images/Logotype.svg" alt="logo" />
      <SearchBox />
    </div>
  )
}