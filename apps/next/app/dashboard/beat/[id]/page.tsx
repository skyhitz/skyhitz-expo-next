import React from "react";
import type { Metadata, ResolvingMetadata } from "next";
import BeatScreen from "app/features/dashboard/beat";
import { entriesIndex } from "app/api/algolia";
import { GetStaticProps } from "next";
import { isEmpty, map, filter } from "ramda";
import { Entry } from "app/api/graphql";
import { isSome } from "app/utils";
import { imageUrlMedium, videoSrc } from "app/utils/entry";
import { Config } from "app/config";
import { MetaProps } from "app/types";

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

export async function generateMetadata(
  props: MetaProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  let metadata: Metadata = {};

  const id = props.params?.id as string;
  const res = await entriesIndex.search("", {
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

  const entry = res.hits[0] as unknown as Entry;

  const title = entry?.title;
  const videoUrl = entry.videoUrl;
  const imageUrl = entry.imageUrl;
  const description = entry.description ? entry.description : "";
  const videoSource = `${videoSrc(videoUrl)}`;

  return {
    title,
    twitter: {
      title,
      card: "player",
      players: {
        width: 480,
        height: 480,
        streamUrl: videoSource,
        playerUrl: videoSource,
      },
      images: [{ url: imageUrlMedium(imageUrl) }],
    },
    openGraph: {
      title,
      type: "website",
      description,
      url: `${Config.APP_URL}/dashboard/beat/${id}`,
      videos: [
        {
          url: videoSource,
          width: 480,
          height: 480,
          type: "video/mp4",
        },
      ],
      images: [{ url: imageUrlMedium(imageUrl) }],
    },
  };
}
