import { Text, View } from "app/design-system";
import { FlatList } from "react-native";
import { BeatListEntry } from "app/ui/beat-list-entry";
import { Entry } from "app/api/graphql";
import { CollectionSkeleton } from "app/ui/skeletons/CollectionSkeleton";

type Props = {
  beats: Entry[];
  emptyStateText: string;
  loading: boolean;
};

export default function ProfileBeatsList({
  beats,
  emptyStateText,
  loading,
}: Props) {
  return (
    <View className="flex-1 bg-blue-dark px-5 w-full max-w-6xl mx-auto">
      <FlatList
        keyExtractor={(item) => item.id!}
        data={beats}
        renderItem={({ item }) => (
          <BeatListEntry entry={item} playlist={beats} />
        )}
        ListEmptyComponent={
          <ListEmptyComponent
            emptyStateText={emptyStateText}
            loading={loading}
          />
        }
      />
    </View>
  );
}

function ListEmptyComponent({
  emptyStateText,
  loading,
}: {
  emptyStateText: string;
  loading: boolean;
}) {
  if (loading) return <CollectionSkeleton duplicates={3} />;

  return (
    <View className="flex-1 flex items-center justify-center mt-8">
      <Text>{emptyStateText}</Text>
    </View>
  );
}
