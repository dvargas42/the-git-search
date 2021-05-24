import styles from './styles.module.scss'

interface ItemData {
  item: {
    id: number;
    login: string;
    avatar_url: string;
    url: string;
    html_url: string;
    score: number;
    name: string;
    created_at: string;
  }
  index: number
}

export function UserCard( {item, index} : ItemData) {

  function lengthVerify(field: string) {
    if (field.length > 25) {
      return (field.slice(0, 23 - field.length ) + '...')
    }
    return field
  }

  return (
    <li key={index} className={styles.cardContainer}> 
      <img src={item.avatar_url} alt="avatar" />

      <div className={styles.cardContent}>
        <h1>{ item.name
          ? lengthVerify(item.name)
          : item.login
        }
        </h1>

        <a href={item.html_url}>{item.html_url}</a>

        <span>Score: {item.score}</span>

        <button
          type="button"
          onClick={() => true}
        >
          VER MAIS
        </button>
      </div>
    </li>
  )
}