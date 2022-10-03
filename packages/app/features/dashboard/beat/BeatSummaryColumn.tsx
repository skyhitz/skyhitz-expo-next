import { tw } from "app/design-system/tailwind";
import { Entry, EntryDetails } from "app/api/graphql";
import { Pressable, Text, View } from "app/design-system";
import InfoCircle from "app/ui/icons/info-circle";
import { PriceContainer } from "./PriceContainer";
import { Owners } from "./BeatOwners";
import { usePlayback } from "app/hooks/usePlayback";
import PlayIcon from "app/ui/icons/play";
import LikeButton from "app/ui/buttons/likeButton";
import { CollapsableView } from "app/ui/CollapsableView";
import Like from "app/ui/icons/like";
import { IconProps } from "app/types";
import { LikesList } from "app/features/player/components/likesList";

type Props = {
  entryDetails: EntryDetails;
};

const FilledLike = (iconProps: IconProps) => Like({ ...iconProps, fill: true });

export function BeatSummaryColumn({ entryDetails }: Props) {
  const { artist, title, description } = entryDetails;
  const { playEntry } = usePlayback();

  const entry = entryDetails as Entry;

  return (
    <View className="flex md:flex-1 md:ml-2 w-full">
      <View className="mb-4">
        <Text className="text-3xl md:text-7xl font-bold">{title}</Text>
        <Text className="md:text-2xl">{artist}</Text>
        <View className="flex-row mt-3 items-center">
          <Pressable onPress={() => playEntry(entry, [entry])}>
            <PlayIcon color={tw.color("grey-light")} />
          </Pressable>
          <Text className="text-grey-light ml-1">Listen</Text>
          <View className="w-0.25 h-6 bg-grey-light mx-3" />
          <LikeButton size={24} entry={entry} />
          <Text className="text-grey-light ml-1">Add to favorites</Text>
        </View>
      </View>
      <PriceContainer entry={entry} />
      <CollapsableView icon={InfoCircle} headerText="Description">
        <Text className="p-3">{description}</Text>
      </CollapsableView>
      <CollapsableView icon={FilledLike} headerText="Likes">
        <LikesList classname="px-5 my-5" entry={entry} />
      </CollapsableView>
      {entryDetails.holders && <Owners holders={entryDetails.holders} />}
    </View>
  );
}