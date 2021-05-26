import { useSearchData } from '../../hooks/useSearchData'

import styles from './styles.module.scss'

interface UserProps {
  id: number;
  login: string;
  avatar_url: string;
  url: string;
  html_url: string;
  score: number;
  name: string;
  created_at: string;
  followers: number,
  following: number,
}

interface ItemData {
  item: UserProps;
}

export function UserCard({ item } : ItemData) {
  const { toggleUserModal, handleUser } = useSearchData()

  function lengthVerify(field: string) {
    if (field.length > 25) {
      return (field.substr(0, 22 ) + '...')
    }

    return field
  }

  function handleUserDetails(user: UserProps) {
    handleUser(user)
    toggleUserModal()
  }

  return (
    <li key={item.id} className={styles.cardContainer}> 
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
          type='button'
          onClick={() => handleUserDetails(item)}
        >
          VER MAIS
        </button>
      </div>
    </li>
  )
}