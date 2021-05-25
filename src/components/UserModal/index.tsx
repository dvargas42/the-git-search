import Link from 'next/link'
import Modal from 'react-modal'
import { useSearchData } from '../../hooks/useSearchData'

import styles from './styles.module.scss'

interface UserModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
} 

export function UserModal({isOpen, onRequestClose }: UserModalProps) {
  const { userDetails, toggleUserModal } = useSearchData()

  function handleUserModalClose() {
    toggleUserModal()
  } 

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles.userModalContainer}
      overlayClassName={styles.userModalOverlay}
    >
      <div className={styles.modalContent}>
        <img src={userDetails?.avatar_url } alt="Avatar" />

        <div className={styles.userData}>
          <div>
            <h1>
              {userDetails?.name ? userDetails?.name: userDetails?.login}
            </h1>
          </div>

          <ul>
            <li>
              <p>Username:</p>
              {userDetails?.login}
            </li>

            <li className={styles.right}>
              <p>Seguindo:</p>
              {userDetails?.following}
            </li>

            <li>
              <p>Cadastrado(a):</p>
              {userDetails?.created_at}
            </li>

            <li className={styles.right}>
              <p>Seguidores:</p>
              {userDetails?.followers}
            </li>
            <li>
              <p>URL:</p>

              <Link href={userDetails?.html_url}>
                <a>{userDetails?.html_url}</a>
              </Link>
            </li>
          </ul>

          <button
            type='button'
            onClick={handleUserModalClose}
          >
            FECHAR
          </button>
        </div>
      </div>  
    </Modal>
  )
}