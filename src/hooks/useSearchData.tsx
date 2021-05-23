import { createContext, ReactNode, useContext, useState } from 'react'

interface SearchDataContextProps {
  search: string;
  handleSearch: (word: string) => void;
}
interface SearchDataProviderProps {
  children: ReactNode;
}

export const SearchDataContext = createContext(
  {} as SearchDataContextProps
)

export function SearchDataProvider({ children }: SearchDataProviderProps) {
  const [search, setSearch] = useState<string>()

  function handleSearch(word: string) {
    setSearch(word)
  }

  return (
    <SearchDataContext.Provider
      value={{
        search,
        handleSearch,
      }}
    >
      {children}
    </SearchDataContext.Provider>
  )
}

export const useSearchData = () => {
  return useContext(SearchDataContext)
}