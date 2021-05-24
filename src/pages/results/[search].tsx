import { GetStaticPaths, GetStaticProps } from "next";
import { useSearchData } from "../../hooks/useSearchData";
import FlatList from 'flatlist-react'

import { UserCard } from "../../components/UserCard";
import { DateFormat, NumberFormat } from '../../utils/format'
import { api } from '../../services/api'

import styles from './results.module.scss'

interface userProps {
  id: number;
  login: string;
  avatar_url: string;
  url: string;
  html_url: string;
  score: number;
}

interface SearchProps extends userProps {
  name: string;
  created_at: string;
}

interface SearchDataProps {
  searchData: SearchProps;
}

export default function Results({ searchData }: SearchDataProps) {
  return (
    <>
      <main className={styles.resultsContainer}>
        <div className={styles.resultsContent}>

          <div className={styles.title}>
            <h1>Resultados para: Paytime</h1>
          </div>

          <ul className={styles.userList}>
            <FlatList 
              list={searchData}
              renderItem={(item:SearchProps, idx: number) => (
                <UserCard
                  item={ item }
                  index={ idx }
                />
              )}
            />
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

  const { data  } = await api.get(`search/users?q=${search}`)

  const searchData = await Promise.all(data.items.map(

    async (user: userProps) => {
      const { data } = await api.get(`users/${user.login}`)

      return{
        id: user.id,
        name: data.name,
        login: user.login,
        avatar_url: user.avatar_url,
        url: user.url, //
        html_url: user.html_url,
        score: NumberFormat(user.score),
        created_at: DateFormat(data.created_at)
      }
    }
  ))

  console.log(searchData)

  return {
    props: {
      searchData: searchData
    },
    revalidate: 60 * 60 * 24 // 24 hours
  }
}