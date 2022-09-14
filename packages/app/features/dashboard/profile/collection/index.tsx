import { Text, View } from "app/design-system";
import { FlatList } from "react-native";
import { BeatListEntry } from "app/ui/beat-list-entry";
import { useUserCollectionQuery } from "app/api/graphql";
import { isSome } from "app/utils";
import { usePlayback } from "app/hooks/usePlayback";
import { useRecoilValue } from "recoil";
import { userAtom } from "app/state/user";
import * as assert from "assert";

export default function CollectionScreen() {
  const user = useRecoilValue(userAtom);
  assert.ok(user);
  assert.ok(user.id);
  const { data } = useUserCollectionQuery({
    variables: {
      userId: user.id,
    },
  });
  const entries = data?.entries?.filter(isSome) ?? [];
  const { playEntry } = usePlayback();

  return (
    <View className="flex-1 w-full">
      <Text className="text-lg ml-8 font-bold hidden web:flex">Collection</Text>
      <View className="flex-1 bg-blue-dark px-5 w-full max-w-6xl mx-auto">
        <FlatList
          data={entries}
          renderItem={({ item }) => (
            <BeatListEntry
              entry={item}
              onPress={() => playEntry(item, entries)}
            />
          )}
        />
      </View>
    </View>
  );
}
