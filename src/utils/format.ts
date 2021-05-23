import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

export function DateFormat(date: string) {
  return format(
    new Date(date),
    'dd/MM/yyyy',
    {locale: ptBR}
  )
}

export function NumberFormat(num: number) {
  return new Intl.NumberFormat(
    'pt-BR',
    {
      minimumFractionDigits: 2
    }
  )
}