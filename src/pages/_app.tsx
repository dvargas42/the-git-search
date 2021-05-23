import { AppProps } from 'next/app'
import Modal from 'react-modal';
import { SearchDataProvider } from '../hooks/useSearchData'

import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { UserModal } from '../components/UserModal';

import '../styles/global.scss'

Modal.setAppElement('#__next')

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SearchDataProvider>
      <Header />
      <UserModal isOpen={false} onRequestClose={() => false}/>
      <Component {...pageProps} />
      <Footer />
    </SearchDataProvider>
  )
}

export default MyApp
