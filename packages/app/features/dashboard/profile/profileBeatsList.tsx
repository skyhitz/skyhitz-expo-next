import { ActivityIndicator, Text, View } from "app/design-system";
import { FlatList } from "react-native";
import { BeatListEntry } from "app/ui/beat-list-entry";
import { usePlayback } from "app/hooks/usePlayback";
import { Entry } from "app/api/graphql";

type Props = {
  beats: Entry[];
  loading: boolean;
};

export default function ProfileBeatsList({ beats, loading }: Props) {
  const { playEntry } = usePlayback();

  return (
    <View className="flex-1 bg-blue-dark px-5 w-full max-w-6xl mx-auto">
      <FlatList
        data={beats}
        renderItem={({ item }) => (
          <BeatListEntry entry={item} onPress={() => playEntry(item, beats)} />
        )}
        ListEmptyComponent={<ListEmptyComponent loading={loading} />}
      />
    </View>
  );
}

function ListEmptyComponent({ loading }: { loading: boolean }) {
  return (
    <View className="flex-1 flex items-center justify-center mt-8">
      {loading ? <ActivityIndicator /> : <Text>No beats here</Text>}
    </View>
  );
}
