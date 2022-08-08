import { Provider } from 'app/provider'
import Head from 'next/head'
import React from 'react'
import type { SolitoAppProps } from 'solito'
import 'raf/polyfill'
import '../style.css'

function MyApp({ Component, pageProps }: SolitoAppProps) {
  return (
    <>
      <Head>
        <title>Solito Example App</title>
        <meta
          name="description"
          content="Expo + Next.js with Solito. By Fernando Rojo."
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="preload"
          href="/fonts/Raleway-Light.ttf"
          as="font"
          crossOrigin=""
        />
      </Head>
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </>
  )
}

export default MyApp
