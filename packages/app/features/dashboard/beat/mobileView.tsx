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
import { Entry } from "app/api/graphql";

export default function MobileView({
  id,
  title,
  artist,
  issuer,
  code,
  description,
  imageUrl,
}: Entry) {
  return (
    <ScrollView className="bg-blue-dark" contentContainerStyle={tw`mx-4 pb-4`}>
      <View className="mx-auto w-full max-w-lg">
        <Artwork uri={imageUrl} />
        <TitleAndAuthor title={title} artist={artist} />
        <Description description={description} />
        <Price id={id} />
        <Likes id={id} />
        <Offers code={code} issuer={issuer} />
        <Owners code={code} issuer={issuer} />
        <Activity code={code} issuer={issuer} />
        <Details code={code} issuer={issuer} />
      </View>
    </ScrollView>
  );
}
