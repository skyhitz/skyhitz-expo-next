import { Text, View } from "app/design-system";
import { Maybe } from "app/types";

export function TitleAndAuthor({
  title,
  author,
}: {
  title: Maybe<string>;
  author: Maybe<string>;
}) {
  return (
    <View className="mb-4">
      <Text className="text-3xl md:text-7xl">{title}</Text>
      <Text className="md:text-2xl">by {author}</Text>
    </View>
  );
}
