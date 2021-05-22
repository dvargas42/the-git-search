import Head from 'next/head'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'

import styles from './home.module.scss'

export default function Home() {
  return (
    <>
      <Header />
      <Footer />
    </>
  )
}
