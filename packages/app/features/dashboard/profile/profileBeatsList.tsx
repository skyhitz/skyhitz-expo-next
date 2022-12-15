import { Text, View } from "app/design-system";
import { FlatList } from "react-native";
import { BeatListEntry } from "app/ui/beat-list-entry";
import { Entry } from "app/api/graphql";

type Props = {
  beats: Entry[];
  emptyStateText: string;
};

export default function ProfileBeatsList({ beats, emptyStateText }: Props) {
  return (
    <View className="flex-1 bg-blue-dark px-5 w-full max-w-6xl mx-auto">
      <FlatList
        keyExtractor={(item) => item.id!}
        data={beats}
        renderItem={({ item }) => (
          <BeatListEntry entry={item} playlist={beats} />
        )}
        ListEmptyComponent={
          <ListEmptyComponent emptyStateText={emptyStateText} />
        }
      />
    </View>
  );
}

function ListEmptyComponent({ emptyStateText }: { emptyStateText: string }) {
  return (
    <View className="flex-1 flex items-center justify-center mt-8">
      <Text>{emptyStateText}</Text>
    </View>
  );
}
