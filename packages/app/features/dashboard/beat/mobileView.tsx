import { ScrollView } from "app/design-system/ScrollView";
import { TitleAndAuthor } from "app/features/dashboard/beat/titleAndAuthor";
import { Artwork } from "app/features/dashboard/beat/artwork";
import { Description } from "app/features/dashboard/beat/description";
import { Price } from "app/features/dashboard/beat/price";
import { Likes } from "app/features/dashboard/beat/likes";
import { Offers } from "app/features/dashboard/beat/offers";
import { Owners } from "app/features/dashboard/beat/owners";
import { Activity } from "app/features/dashboard/beat/activity";
import { Details } from "app/features/dashboard/beat/details";
import { tw } from "app/design-system/tailwind";
import { View } from "app/design-system";

export default function MobileView({ id }: { id: string }) {
  return (
    <ScrollView contentContainerStyle={tw`mx-4`}>
      <View className="mx-auto w-full max-w-lg">
        <Artwork />
        <TitleAndAuthor />
        <Description />
        <Price />
        <Likes id={id} />
        <Offers />
        <Owners />
        <Activity />
        <Details />
      </View>
    </ScrollView>
  );
}
