import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import styles from './footer.module.scss'

export function Footer() {
  return (
    <div className={styles.footerContainer}>
      <h1>Projetado por: Daniel Vargas - {format(
        Date.now(),
        'dd/MM/yyyy',
        {locale: ptBR}
        )}
      </h1>
    </div>
  )
}