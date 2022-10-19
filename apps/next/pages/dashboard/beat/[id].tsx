import React from "react";
import BeatScreen from "app/features/dashboard/beat";
import Head from "next/head";
import { entriesIndex } from "app/api/algolia";
import { Entry } from "app/api/graphql";
import { GetStaticProps } from "next";
import { imageSrc, videoSrc } from "app/utils/entry";

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export const getStaticProps: GetStaticProps = async (props) => {
  const id = props.params?.id as string;
  const res = await entriesIndex.search("", {
    filters: `id:${id}`,
  });
  console.log(res);
  const entry = res.hits[0];
  console.log(entry);

  return {
    props: {
      entry,
    },
  };
};
export default function BeatPage({ entry }: { entry: Entry }) {
  return (
    <>
      <Head>
        <meta name="twitter:card" key="twitter:card" content="player" />
        <meta property="og:title" content={`${entry.title}`} key="og:title" />
        <meta
          property="og:description"
          key="og:description"
          content={`${entry.description}`}
        />
        <meta property="og:type" key="og:type" content="video.other" />
        <meta
          property="og:image"
          key="og:image"
          content={`${imageSrc(entry.imageUrl!)}`}
        />
        <meta
          property="og:url"
          key="og:url"
          content={`${videoSrc(entry.videoUrl!)}`}
        />
      </Head>
      <BeatScreen />
    </>
  );
}
