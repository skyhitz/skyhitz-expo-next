import { Pressable, Text, View } from "app/design-system";
import { Price } from "app/ui/beat-list-entry/price";
import { LikeButton } from "app/ui/buttons/likeButton";
import { Entry } from "app/api/graphql";

type Props = {
  entry: Entry;
};

export function BeatActions({ entry }: Props) {
  return (
    <View className="flex items-center">
      <Pressable className="btn h-10">
        <Price />
        <Text className="text-sm"> - Buy Now</Text>
      </Pressable>
      <View className="flex flex-row items-center mt-7">
        <LikeButton size={24} entry={entry} />
        <Text className="ml-2.5 text-sm">Like</Text>
      </View>
    </View>
  );
}
