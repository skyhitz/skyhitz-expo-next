import React from "react";
import BeatmakerScreen from "app/features/dashboard/beatmaker";
import { GetStaticProps } from "next";
import { usersIndex } from "app/api/algolia";
import { isEmpty } from "ramda";
import type { Metadata, ResolvingMetadata } from "next";
import { MetaProps } from "app/types";
import { User } from "app/api/graphql";
import { imageUrlMedium } from "app/utils/entry";
import { Config } from "app/config";

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

export async function generateMetadata(
  props: MetaProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  let metadata: Metadata = {};

  const id = props.params?.id as string;
  const res = await usersIndex.search("", {
    filters: `id:${id}`,
  });

  if (isEmpty(res.hits)) {
    metadata = {
      title: (await parent).title,
      twitter: {
        title: (await parent).twitter?.title,
        card: (await parent).twitter?.card,
        images: (await parent).twitter?.images,
      },
      openGraph: {
        title: (await parent).openGraph?.title,
        type: "website",
        description: (await parent).openGraph?.description,
        url: (await parent).openGraph?.url as string | URL | undefined,
        videos: (await parent).openGraph?.videos,
        images: (await parent).openGraph?.images,
      },
    };
    return metadata;
  }

  const user = res.hits[0] as unknown as User;

  const title = user.username;
  const imageUrl = user.avatarUrl;
  const description = user.description ? user.description : "";
  const images = [
    {
      url: imageUrlMedium(imageUrl),
      type: "image/png",
      width: 480,
      height: 480,
    },
  ];

  return {
    title,
    twitter: {
      title,
      card: "summary",
      images,
    },
    openGraph: {
      title,
      type: "website",
      description,
      url: `${Config.APP_URL}/dashboard/beatmaker/${user.id}`,
      images,
    },
  };
}
