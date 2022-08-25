import { FlatList, Image } from "react-native";
import { Pressable, Text, View } from "app/design-system";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { RECENTLY_ADDED } from "app/api/beats";
import Dollar from "app/ui/icons/dollar";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Entry, EntryPayload } from "app/models";
import { tw } from "app/design-system/tailwind";
import { BeatEntry } from "app/models/beat-entry";
import useBeatHorizonPrice from "app/hooks/use-beat-horizon-price";

export default function RecentlyAddedList() {
  const [nextPage, setNextPage] = useState(0);
  const [data, setData] = useState<BeatEntry[]>([]);
  const { data: queryData, refetch } = useQuery<{ recentlyAdded: BeatEntry[] }>(
    RECENTLY_ADDED,
    {
      variables: { page: nextPage },
    }
  );

  useEffect(() => {
    if (queryData) {
      setData((d) => d.concat(queryData.recentlyAdded));
      setNextPage((p) => p + 1);
    }
  }, [queryData, setData, setNextPage]);

  return (
    <FlatList
      ListHeaderComponent={ListHeader}
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <BeatListEntry {...item} />}
      onEndReached={() => refetch()}
    />
  );
}

function ListHeader() {
  return <Text className="pb-4">Recently Added</Text>;
}

function BeatListEntry(p: BeatEntry) {
  const entry = new Entry(p as EntryPayload); // TODO: ask how to make it better
  return (
    <View className="w-full flex flex-row py-2">
      <Image
        style={{ width: 40, height: 40 }}
        source={{
          uri: entry.imageUrlSmall,
        }}
      />
      <View className="ml-2 flex justify-center">
        <Text className="text-sm font-bold leading-6">{p.title}</Text>
        <Text className="text-xs text-neutral-400 leading-6">{p.artist}</Text>
      </View>
      <View className="ml-auto flex flex-row items-center">
        <Price code={entry.code} issuer={entry.issuer} className="mr-3" />
        <FavoriteButton size={20} />
        <Icon name="dots-vertical" size={30} color="white" />
      </View>
    </View>
  );
}

function FavoriteButton({
  size,
  className,
}: {
  size: number;
  className?: string;
}) {
  const [active, setActive] = useState(false);
  return (
    <Pressable className={className} onPress={() => setActive(!active)}>
      {active ? (
        <Icon name="heart" size={size} color={tw.color("blue")} />
      ) : (
        <Icon name="heart-outline" size={size} color="white" />
      )}
    </Pressable>
  );
}

function Price({
  className,
  code,
  issuer,
}: {
  code?: string;
  issuer?: string;
  className?: string;
}) {
  const price = useBeatHorizonPrice(code, issuer);

  return (
    <View className={`flex flex-row items-center ${className}`}>
      <Dollar size={10} color={"white"} className="mr-1" />
      {price > 0 && <Text className="mr-1 text-sm">{price}</Text>}
    </View>
  );
}
