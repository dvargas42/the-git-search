import { GetStaticPaths, GetStaticProps } from "next";
import { api } from '../../services/api'

import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

import styles from './results.module.scss'
import { UserCard } from "../../components/UserCard";

export default function Results() {
  return (
    <>
      <main className={styles.resultsContainer}>
        <div className={styles.resultsContent}>

          <div className={styles.title}>
            <h1>Resultados para: Paytime</h1>
          </div>

          <ul className={styles.userList}>
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
          </ul>

          <div className={styles.space} />
        </div>
      </main>
    </>
  )
}
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback:  'blocking',
}}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { search } = ctx.params;

  const { data } = await api.get(`/search/users?q=${search}`)

  console.log(data)

  return {
    props: {
    },
    revalidate: 60 * 60 * 24 // 24 hours
  }
}