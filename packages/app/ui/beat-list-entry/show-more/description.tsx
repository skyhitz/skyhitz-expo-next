import { Image, Text, View } from "app/design-system";
import { imageUrlMedium } from "app/utils/entry";

export function Description(props: {
  imageUrl?: string;
  title: string;
  artist: string;
}) {
  return (
    <View className="flex items-center">
      <Image
        source={{
          uri: props.imageUrl ? imageUrlMedium(props.imageUrl) : "",
          width: 225,
          height: 225,
        }}
      />
      <Text className="mt-6 sm:mt-10 font-bold text-sm">{props.title}</Text>
      <Text className="mt-2.5 text-xs">{props.artist}</Text>
    </View>
  );
}
