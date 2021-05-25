import { AppProps } from 'next/app'
import Modal from 'react-modal';
import { SearchDataProvider } from '../hooks/useSearchData'

import { Footer } from '../components/Footer'
import { Header } from '../components/Header'

import '../styles/global.scss'

Modal.setAppElement('#__next')

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SearchDataProvider>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </SearchDataProvider>
  )
}

export default MyApp
