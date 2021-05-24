import { GetStaticPaths, GetStaticProps } from "next";
import { useSearchData } from "../../hooks/useSearchData";
import FlatList from 'flatlist-react'

import { UserCard } from "../../components/UserCard";
import { DateFormat, NumberFormat } from '../../utils/format'
import { api } from '../../services/api'

import styles from './results.module.scss'
import { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";

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
  data: SearchProps[];
  total_count: number;
}

interface DataProps {
  data: SearchProps[];
  total_count: number;
  search: string;
}

async function SearchData (
  search: string | string[],
  page: number
): Promise<SearchDataProps> {

  const { data }= await api.get(`search/users?q=${search}`,{
    params: {
      per_page: 12,
      page,
    }
  })

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

  return {
    data: searchData,
    total_count: data.total_count
  }
}

export default function Results({ data, total_count, search }: DataProps) {
  const [searchData, setSearchData] = useState<SearchProps[]>()
  const [currentPage, setCurrentPage] = useState(2)
  const [hasMorePages, setHasMorePages] = useState(true)
  
  const totalPages = Math.ceil(total_count / 12)
  
  useEffect(()=> {
    setSearchData(data)    
  }, [data])

  async function NextPage() {
    try {
      if (currentPage > totalPages) {
        setHasMorePages(!hasMorePages)
        throw('No more pages')
      }

      const response = await SearchData(search, currentPage)
      
      setSearchData([...searchData, ...response.data])
      setCurrentPage(currentPage + 1)
    } catch (err) {
      alert(err)
    }
  }

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
              renderWhenEmpty={() => <div>Items não encontrados</div>}
              hasMoreItens={true}
              loadMoreItems={NextPage}
              paginationLoadingIndicator={<div style={{background: '#090'}}>Getting more items...</div>}
              //paginationLoadingIndicatorPosition="right"
            />
          </ul>
          {/* <button
          onClick={NextPage}>
            carregar
          </button> */}
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
  const { search } = ctx.params
  const page = 1

  const { data, total_count } = await SearchData(search, page)

  return {
    props: {
      data,
      total_count,
      search,
    },
    revalidate: 60 * 60 * 24 // 24 hours
  }
}