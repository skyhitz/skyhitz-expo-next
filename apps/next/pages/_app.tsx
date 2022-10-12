import { Provider } from "app/provider";
import Head from "next/head";
import React from "react";
import type { SolitoAppProps } from "solito";
import "raf/polyfill";
import { WebNavigation } from "app/navigation/web";
import "../global";

function MyApp({ Component, pageProps }: SolitoAppProps) {
  return (
    <>
      <Head>
        <title>Skyhitz</title>
        <meta
          name="description"
          content="Upload, buy or sell music NFTs on the Stellar Network. Join a music community of beatmakers!"
        />
        <link rel="icon" href="/icon.png" />
      </Head>
      <Provider>
        <WebNavigation>
          <Component {...pageProps} />
        </WebNavigation>
      </Provider>
    </>
  );
}

export default MyApp;
