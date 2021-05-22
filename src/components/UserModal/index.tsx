import Modal from 'react-modal'

import styles from './styles.module.scss'

interface UserModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
} 

export function UserModal({isOpen, onRequestClose }: UserModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles.userModalContainer}
      overlayClassName={styles.userModalOverlay}
    >
      

      <div className={styles.modalContent}>
        <img src="/images/Avatar.png" alt="Avatar" />

        <div className={styles.userData}>
          <div>
            <h1>Milena Melo</h1>
          </div>

          <ul>
            <li>
              <p>Username:</p>
              Milena Melo
            </li>
            <li className={styles.right}>
              <p>Seguindo:</p>
              123
            </li>
            <li>
              <p>Cadastrado(a):</p>
              31/12/2020
            </li>
            <li className={styles.right}>
              <p>Seguidores:</p>
              321
            </li>
            <li>
              <p>URL:</p>
              <a>http://github.com/MilenaMelo</a>
            </li>
          </ul>

          <button>
            FECHAR
          </button>
        </div>
      </div>  
    </Modal>
  )
}