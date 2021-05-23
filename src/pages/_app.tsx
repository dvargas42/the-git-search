import { AppProps } from 'next/app'
import Modal from 'react-modal';

import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { UserModal } from '../components/UserModal';

import '../styles/global.scss'

Modal.setAppElement('#__next')

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <UserModal isOpen={false} onRequestClose={() => false}/>
      <Component {...pageProps} />
      <Footer />
    </>
  )
}

export default MyApp
