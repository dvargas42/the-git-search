import { GetStaticPaths, GetStaticProps } from "next";
import { useSearchData } from "../../hooks/useSearchData";
import { api } from '../../services/api'
import { NumberFormat } from '../../utils/format'

import { UserCard } from "../../components/UserCard";

import styles from './results.module.scss'

interface SearchDataProps {
  login: string;
  avatar_url: string;
  url: string;
  html_url: string;
  score: number;
}

export default function Results(searchData: SearchDataProps) {
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

  const searchData = data.items.map((user: SearchDataProps) => {
    return{
      login: user.login,
      avatar_url: user.avatar_url,
      url: user.url,
      html_url: user.html_url,
      score: NumberFormat(user.score)
    }
  })

  return {
    props: {
      searchData,
    },
    revalidate: 60 * 60 * 24 // 24 hours
  }
}