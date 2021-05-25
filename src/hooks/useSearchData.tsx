import { createContext, ReactNode, useContext, useState } from 'react'

interface SearchDataContextProps {
  request: string;
  handleRequest: (word: string) => void;
  isOpenModal: boolean;
  toggleUserModal: () => void;
  userDetails: UserDetailsProps;
  handleUser:(user: UserDetailsProps) => void;
}

interface SearchDataProviderProps {
  children: ReactNode;
}

interface UserDetailsProps {
  id: number;
  login: string;
  avatar_url: string;
  url: string;
  html_url: string;
  score: number;
  name: string;
  created_at: string;
  followers: number,
  following: number,
}

export const SearchDataContext = createContext(
  {} as SearchDataContextProps
)

export function SearchDataProvider({ children }: SearchDataProviderProps) {
  const [request, setRequest] = useState<string>()
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [userDetails, setUserDetails] = useState<UserDetailsProps>()

  function handleRequest(word: string) {
    setRequest(word)
  }

  function toggleUserModal() {
    console.log(isOpenModal)
    setIsOpenModal(!isOpenModal)
  }

  function handleUser(user: UserDetailsProps) {
    setUserDetails (user)
  }

  return (
    <SearchDataContext.Provider
      value={{
        request,
        handleRequest,
        isOpenModal,
        toggleUserModal,
        handleUser,
        userDetails,
      }}
    >
      {children}
    </SearchDataContext.Provider>
  )
}

export const useSearchData = () => {
  return useContext(SearchDataContext)
}