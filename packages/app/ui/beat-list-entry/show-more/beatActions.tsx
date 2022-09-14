import { Pressable, Text, View } from "app/design-system";
import Price from "app/ui/price";
import { FavoriteButton } from "app/ui/buttons/favoriteButton";

export function BeatActions() {
  return (
    <View className="flex items-center">
      <Pressable className="btn h-10">
        <Price price={0} />
        <Text className="text-sm"> - Buy Now</Text>
      </Pressable>
      <View className="flex flex-row items-center mt-7">
        <FavoriteButton size={24} />
        <Text className="ml-2.5 text-sm">Like</Text>
      </View>
    </View>
  );
}
