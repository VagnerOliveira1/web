import React from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.css'

const MyApp: React.FC<AppProps> = ({Component, pageProps }) => {
  return(
  <>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Head>
          <title> Agenda</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <ToastContainer />
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  </>

  )
}

export default MyApp;