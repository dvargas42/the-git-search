import { useEffect, useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { useSearchData } from "../../hooks/useSearchData";
import { api } from '../../services/api'

import { UserModal } from "../../components/UserModal";
import { UserCard } from "../../components/UserCard";
import { DateFormat, NumberFormat } from '../../utils/format'

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
  followers: number,
  following: number,
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
      per_page: 8,
      page,
    }
  })

  const searchData: SearchProps[] = await Promise.all(data.items.map(
    async (user: userProps) => {
      const { data } = await api.get(`users/${user.login}`)

      return{
        id: user.id,
        name: data.name,
        login: user.login,
        avatar_url: user.avatar_url,
        url: user.url, //
        html_url: user.html_url,
        followers: data.followers,
        following: data.following,
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
  const [searchData, setSearchData] = useState<SearchProps[]>(data)
  const [nextPage, setNextPage] = useState(1)

  const { request, isOpenModal, toggleUserModal } = useSearchData()
  
  const totalPages = Math.ceil(total_count / 8)
  
  useEffect(()=> {
    setSearchData(data)
    
    if (totalPages > 1)
      setNextPage(2)    
  }, [data])

  async function handleNextPage() {
    try {
      if (nextPage > totalPages) {
        throw('Não há mais itens!')
      }

      const response = await SearchData(search, nextPage)
      
      setSearchData([...searchData, ...response.data])
      setNextPage(nextPage + 1)
    } catch (err) {
      alert(err)
    }
  }

  return (
    <>
      <UserModal isOpen={isOpenModal} onRequestClose={toggleUserModal}/>

      <main className={styles.resultsContainer}>
        <div className={styles.resultsContent}>

          <div className={styles.title}>
            <h1>Resultados para: {request}</h1>
          </div>

          <ul className={styles.userList}>
            {searchData.map(item => (
              <UserCard 
                key={ item.id }
                item={ item }
              />
            ))}
          </ul>
          {nextPage <= totalPages &&
            <button 
              type='button'
              className={styles.loadingButton}
              onClick={handleNextPage}
            >
              MAIS RESULTADOS
            </button>
          }
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