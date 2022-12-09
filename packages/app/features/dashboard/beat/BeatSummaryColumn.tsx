import { tw } from "app/design-system/tailwind";
import { Entry, EntryHolder } from "app/api/graphql";
import { ActivityIndicator, Pressable, Text, View } from "app/design-system";
import InfoCircle from "app/ui/icons/info-circle";
import { PriceContainer } from "./PriceContainer";
import { Owners } from "./BeatOwners";
import { usePlayback } from "app/hooks/usePlayback";
import PlayIcon from "app/ui/icons/play";
import PauseIcon from "app/ui/icons/pause";
import LikeButton from "app/ui/buttons/likeButton";
import { CollapsableView } from "app/ui/CollapsableView";
import Like from "app/ui/icons/like";
import { IconProps } from "app/types";
import { LikesList } from "app/features/player/components/likesList";
import { ShareButton } from "app/ui/buttons/ShareButton";
import { Config } from "app/config";
import { ComponentAuthGuard } from "app/utils/authGuard";
import { BeatSkeleton } from "app/ui/skeletons/BeatSkeleton";

type Props = {
  entry: Entry | undefined;
  holders?: EntryHolder[] | null;
};

const FilledLike = (iconProps: IconProps) => Like({ ...iconProps, fill: true });

const skeletonStyle = tw.prefixMatch("md")
  ? "collapsable"
  : "collapsableMobile";

export function BeatSummaryColumn({ entry, holders }: Props) {
  return (
    <View className="flex md:flex-1 md:ml-2 w-full">
      {entry && (
        <View>
          <Text className="text-3xl md:text-5xl font-bold mb-2">
            {entry.title}
          </Text>
          <Text className="md:text-2xl">{entry.artist}</Text>
          <View className="flex-row mt-4 items-center">
            <PlayBeatButton currentEntry={entry} />
            <Text className="text-grey-light ml-1">Listen</Text>
            <View className="w-0.25 h-6 bg-grey-light mx-3" />
            <ComponentAuthGuard>
              <LikeButton size={24} entry={entry} />
              <Text className="text-grey-light ml-1">Add to favorites</Text>
              <View className="w-0.25 h-6 bg-grey-light mx-3" />
            </ComponentAuthGuard>
            <ShareButton
              url={`${Config.APP_URL}/dashboard/beat/${entry.id}`}
              title="Share this beat!"
            />
          </View>
        </View>
      )}
      {!entry && <BeatSkeleton style={skeletonStyle} />}
      {entry && <PriceContainer entry={entry} />}
      {!entry && <BeatSkeleton style={skeletonStyle} />}
      {entry && (
        <CollapsableView icon={InfoCircle} headerText="Description">
          <Text className="p-3">{entry.description}</Text>
        </CollapsableView>
      )}
      {!entry && <BeatSkeleton style={skeletonStyle} />}
      {entry && (
        <CollapsableView icon={FilledLike} headerText="Likes">
          <LikesList classname="px-5 my-5" entry={entry} />
        </CollapsableView>
      )}
      {!holders && <BeatSkeleton style={skeletonStyle} />}
      {holders && <Owners holders={holders} />}
    </View>
  );
}

function PlayBeatButton({ currentEntry }: { currentEntry: Entry }) {
  const { playEntry, playPause, entry, playbackState } = usePlayback();

  if (entry?.id === currentEntry.id) {
    if (playbackState === "LOADING" || playbackState === "FALLBACK") {
      return <ActivityIndicator />;
    }

    return (
      <Pressable onPress={playPause}>
        {playbackState === "PLAYING" ? (
          <PauseIcon color={tw.color("white")} size={22} />
        ) : (
          <PlayIcon color={tw.color("white")} size={22} />
        )}
      </Pressable>
    );
  }

  return (
    <Pressable onPress={() => playEntry(currentEntry, [currentEntry])}>
      <PlayIcon color={tw.color("grey-light")} />
    </Pressable>
  );
}
