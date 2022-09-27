import { tw } from "app/design-system/tailwind";
import { Entry } from "app/api/graphql";
import { Pressable, Text, View } from "app/design-system";
import InfoCircle from "app/ui/icons/info-circle";
import { PriceContainer } from "./PriceContainer";
import { Owners } from "./owners";
import { usePlayback } from "app/hooks/usePlayback";
import PlayIcon from "app/ui/icons/play";
import LikeButton from "app/ui/buttons/likeButton";
import { CollapsableView } from "app/ui/CollapsableView";
import Like from "app/ui/icons/like";
import { IconProps } from "app/types";
import { LikesList } from "app/features/player/components/likesList";

type Props = {
  entry: Entry;
};

const FilledLike = (iconProps: IconProps) => Like({ ...iconProps, fill: true });

export function BeatSummaryColumn({ entry }: Props) {
  const { issuer, artist, code, title, description } = entry;
  const { playEntry } = usePlayback();

  return (
    <View className="flex md:flex-1 md:ml-2">
      <View className="mb-4">
        <Text className="text-3xl md:text-7xl font-bold">{title}</Text>
        <Text className="md:text-2xl">{artist}</Text>
        <View className="flex-row mt-3 items-center">
          <Text className="text-grey-light">Owned by TODO</Text>
          <View className="w-0.25 h-6 bg-grey-light mx-3" />
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
      <Owners code={code} issuer={issuer} />
    </View>
  );
}
