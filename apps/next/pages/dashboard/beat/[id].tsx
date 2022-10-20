import React from "react";
import BeatScreen from "app/features/dashboard/beat";
import { entriesIndex } from "app/api/algolia";
import { GetStaticProps } from "next";
import { isEmpty } from "ramda";

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

  if (isEmpty(res.hits)) {
    return { props: {} };
  }

  const entry = res.hits[0];

  return {
    props: {
      entry,
    },
  };
};

export default function BeatPage() {
  return <BeatScreen />;
}
