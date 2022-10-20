import { Provider } from "app/provider";
import Head from "next/head";
import React from "react";
import type { SolitoAppProps } from "solito";
import "raf/polyfill";
import { WebNavigation } from "app/navigation/web";
import "../global";
import { imageUrlMedium, videoSrc } from "app/utils/entry";
import { Config } from "app/config";

function MyApp({ Component, pageProps }: SolitoAppProps) {
  const entry = pageProps.entry;
  const beatmaker = pageProps.beatmaker;
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
        {entry ? (
          <>
            <meta name="twitter:card" content="player" />
            <meta property="og:title" content={`${entry.title}`} />
            <meta property="twitter:title" content={`${entry.title}`} />
            <meta property="og:description" content={`${entry.description}`} />
            <meta property="og:type" content="video.other" />
            <meta
              property="twitter:image"
              content={`${imageUrlMedium(entry.imageUrl!)}`}
            />
            <meta
              property="og:image"
              content={`${imageUrlMedium(entry.imageUrl!)}`}
            />
            <meta
              property="twitter:player"
              content={`${videoSrc(entry.videoUrl!)}`}
            />
            <meta property="twitter:player:width" content="480" />
            <meta property="twitter:player:height" content="480" />
            <meta property="og:url" content={`${videoSrc(entry.videoUrl!)}`} />
          </>
        ) : beatmaker ? (
          <>
            <meta name="twitter:card" content="summary" />
            <meta property="og:title" content={beatmaker.username} />
            <meta property="og:description" content={beatmaker.description} />
            <meta property="og:type" content="website" />
            <meta
              property="og:image"
              content={imageUrlMedium(beatmaker.avatarUrl)}
            />
            <meta
              property="og:url"
              content={`${Config.APP_URL}/dashboard/beatmaker/${beatmaker.id}`}
            />
          </>
        ) : (
          <>
            <meta name="twitter:card" content="summary" />
            <meta property="og:title" content="Skyhitz" />
            <meta
              property="og:description"
              content="Upload, buy or sell music NFTs on the Stellar Network. Join a music community of beatmakers!"
            />
            <meta property="og:type" content="website" />
            <meta
              property="og:image"
              content="https://res.cloudinary.com/skyhitz/image/upload/c_scale,h_531,q_auto/v1583723774/web/social.png"
            />
            <meta property="og:url" key="og:url" content="https://skyhitz.io" />
          </>
        )}

        <meta name="twitter:site" content="@skyhitzio" />

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
