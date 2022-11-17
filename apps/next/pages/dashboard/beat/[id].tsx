import React from "react";
import BeatScreen from "app/features/dashboard/beat";
import { entriesIndex } from "app/api/algolia";
import { GetStaticProps } from "next";
import { isEmpty, map, filter } from "ramda";
import { Entry } from "app/api/graphql";
import { isSome } from "app/utils";

export async function getStaticPaths() {
  const res = await entriesIndex.search<Entry>("", {
    hitsPerPage: 1000,
  });

  const ids = filter(
    isSome,
    map((entry) => {
      if (entry.id) {
        return { params: { id: entry.id } };
      }
      return null;
    }, res.hits as Entry[])
  );

  if (isEmpty(res.hits)) {
    return { props: {} };
  }
  return {
    paths: ids,
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

type Props = {
  entry?: Entry;
};

export default function BeatPage({ entry }: Props) {
  return <BeatScreen entry={entry} />;
}
