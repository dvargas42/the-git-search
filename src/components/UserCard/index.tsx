import styles from './styles.module.scss'

export function UserCard() {
  return (
    <li className={styles.cardContainer}> 
      <img src="/images/Avatar.png" alt="avatar" />

      <div className={styles.cardContent}>
        <h1>Milena Melo</h1>

        <a href="">https://github.com/MilenaMelo</a>

        <span>Score: 1.00</span>

        <button>
          VER MAIS
        </button>
      </div>
    </li>
  )
}