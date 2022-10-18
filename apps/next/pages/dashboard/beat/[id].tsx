import React from "react";
import BeatScreen from "app/features/dashboard/beat";
import Head from "next/head";

export default function BeatPage() {
  return (
    <>
      <Head>
        <meta property="og:title" content="Beat" key="og:title" />
        <meta
          property="og:description"
          key="og:description"
          content="Listen to the uploaded beat!"
        />
        <meta property="og:type" key="og:type" content="video.other" />
        <meta
          property="og:image"
          key="og:image"
          content="https://skyhitz.io/skyhitz.png"
        />
        <meta
          property="og:url"
          key="og:url"
          content="https://ipfs.io/ipfs/bafybeiaq5om3sg7fund5azcjs4eokaotoidlg5lxyc7pjkljuosiivanga"
        />
      </Head>
      <BeatScreen />
    </>
  );
}
