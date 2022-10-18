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
        <meta
          name="title"
          content="Skyhitz - Music NFT marketplace on Stellar"
        />
        <meta
          name="description"
          content="Upload, buy or sell music NFTs on the Stellar Network. Join a music community of beatmakers!"
        />
        <meta
          name="keywords"
          content="stellar, xlm, mfts, crypto, music nfts, beats market, beats website, lofi beats, fresh beats, music creators, exclusive beats for sale"
        />
        <meta name="twitter:card" content="media" />
        <meta name="twitter:site" content="@skyhitzio" />
        <meta property="og:title" content="Skyhitz" key="og:title" />
        <meta
          property="og:description"
          key="og:description"
          content="Upload, buy or sell music NFTs on the Stellar Network. Join a music community of beatmakers!"
        />
        <meta property="og:type" key="og:type" content="website" />
        <meta
          property="og:image"
          key="og:image"
          content="https://skyhitz.io/skyhitz.png"
        />
        <meta property="og:url" key="og:url" content="https://skyhitz.io" />
        <meta property="fb:app_id" content="564403243666491" />
        <meta property="og:site_name" content="Skyhitz" />
        <meta
          name="p:domain_verify"
          content="418ab0845b3db4cf3f4c9efe8ad0f80e"
        />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="theme-color" content="#000" />
        <title>Skyhitz - Music NFTs on Stellar</title>
        <link rel="canonical" href="https://skyhitz.io" />
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
