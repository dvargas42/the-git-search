import Head from 'next/head'

import styles from './home.module.scss'

export default function Home() {
  return (
    <>
      <main className={styles.homeContainer}>
        <Head>
          <title>Home | The Git Search</title>
        </Head>
        
        <img className={styles.homeContent} src="/images/LogotypeShadow.svg" alt="hero" />
      </main>
    </>
  )
}
