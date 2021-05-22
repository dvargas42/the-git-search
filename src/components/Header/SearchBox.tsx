import styles from './searchBox.module.scss'

export function SearchBox() {
  return (
    <label className={styles.searchBoxContainer}>
      <input type="text" placeholder="Pesquisar" />
      <button>
        <img src="/images/Magnifier.svg" alt="Lupa" />
      </button>
    </label>
  )
}