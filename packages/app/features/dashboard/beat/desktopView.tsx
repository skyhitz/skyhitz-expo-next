import { ScrollView } from "app/design-system/ScrollView";
import { tw } from "app/design-system/tailwind";
import { View } from "app/design-system";
import { TitleAndAuthor } from "app/features/dashboard/beat/titleAndAuthor";
import { Artwork } from "app/features/dashboard/beat/artwork";
import { Offers } from "app/features/dashboard/beat/offers";
import { Activity } from "app/features/dashboard/beat/activity";
import { Details } from "app/features/dashboard/beat/details";
import { Owners } from "app/features/dashboard/beat/owners";
import { Likes } from "app/features/dashboard/beat/likes";
import { Price } from "app/features/dashboard/beat/price";
import { Description } from "app/features/dashboard/beat/description";
import { Entry } from "app/api/graphql";

export default function DesktopView({
  id,
  issuer,
  artist,
  code,
  title,
  imageUrl,
  description,
}: Entry) {
  return (
    <ScrollView
      contentContainerStyle={tw`flex flex-row flex-1 items-start w-full max-w-screen-xl mx-auto pt-16`}
    >
      <View className="flex flex-1 mx-4">
        <Artwork uri={imageUrl} />
        <Offers code={code} issuer={issuer} />
        <Activity code={code} issuer={issuer} />
        <Details code={code} issuer={issuer} />
      </View>
      <View className="flex w-full max-w-xl xl:max-w-3xl mr-5">
        <TitleAndAuthor artist={artist} title={title} />
        <Description description={description} />
        <Price issuer={issuer} code={code} />
        <Likes id={id} />
        <Owners code={code} issuer={issuer} />
      </View>
    </ScrollView>
  );
}
