import React from "react";
import BeatmakerScreen from "app/features/dashboard/beatmaker";
import { GetStaticProps } from "next";
import { usersIndex } from "app/api/algolia";
import { isEmpty } from "ramda";

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export const getStaticProps: GetStaticProps = async (props) => {
  const id = props.params?.id as string;
  const res = await usersIndex.search("", {
    filters: `id:${id}`,
  });

  if (isEmpty(res.hits)) {
    return { props: {} };
  }

  const beatmaker = res.hits[0];

  return {
    props: {
      beatmaker,
    },
  };
};

export default function BeatmakerPage() {
  return <BeatmakerScreen />;
}
