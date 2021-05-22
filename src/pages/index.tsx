import Head from 'next/head'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'

import styles from './home.module.scss'

export default function Home() {
  return (
    <>
      <Header />
      <main className={styles.homeContainer}>
        <Head>
          <title>Home | The Git Search</title>
        </Head>
          <img className={styles.homeContent} src="/images/LogotypeShadow.svg" alt="hero" />
      </main>
      <Footer />
    </>
  )
}
