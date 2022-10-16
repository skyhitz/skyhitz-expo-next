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
          content="stellar, crypto, music nfts, beats market, beats website, lofi beats, fresh beats, music creators, exclusive beats for sale"
        />
        <meta name="twitter:card" content="app" />
        <meta name="twitter:site" content="@skyhitzio" />
        <meta
          name="twitter:description"
          content="Upload exclusive beats for sale and buy fresh songwriting ideas from other music producers. Join a music community of beatmakers!"
        />
        <meta name="twitter:app:country" content="US" />
        <meta name="twitter:app:name:iphone" content="Skyhitz" />
        <meta name="twitter:app:id:iphone" content="1105406020" />
        <meta name="twitter:app:url:iphone" content="skyhitz://+" />
        <meta name="twitter:app:name:ipad" content="Skyhitz" />
        <meta name="twitter:app:id:ipad" content="1105406020" />
        <meta name="twitter:app:url:ipad" content="skyhitz://+" />
        <meta name="twitter:app:name:googleplay" content="Skyhitz" />
        <meta name="twitter:app:id:googleplay" content="com.skyhitz.skyhitz" />
        <meta
          name="twitter:app:url:googleplay"
          content="https://play.google.com/store/apps/details?id=com.skyhitz.skyhitz"
        />
        <meta property="og:title" content="Skyhitz" />
        <meta
          property="og:description"
          content="Upload exclusive beats for sale and buy fresh songwriting ideas from other music producers. Join a music community of beatmakers!"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/skyhitz/image/upload/c_scale,h_531,q_auto/v1583723774/web/social.png"
        />
        <meta property="og:url" content="https://skyhitz.io" />
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
