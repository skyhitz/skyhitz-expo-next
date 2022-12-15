import { Text, View } from "app/design-system";
import { useRecoilValue } from "recoil";
import { userAtom } from "app/state/user";
import * as assert from "assert";
import { useUserBids } from "app/hooks/useUserBids";
import { FlatList } from "react-native";
import { BidListEntry } from "./BidListEntry";
import { CollectionSkeleton } from "app/ui/skeletons/CollectionSkeleton";

export function BidsScreen() {
  const user = useRecoilValue(userAtom);
  assert.ok(user);
  const { bids, loading, refetch } = useUserBids(user.publicKey);

  return (
    <View className="flex-1 w-full">
      <Text className="text-lg font-bold hidden web:flex mx-auto mb-4">
        Your bids
      </Text>
      <View className="flex-1 bg-blue-dark w-full max-w-6xl mx-auto">
        {loading && <CollectionSkeleton duplicates={3} />}
        {!loading && (
          <FlatList
            keyExtractor={(item) => item.id!}
            data={bids}
            renderItem={({ item }) => (
              <BidListEntry entry={item} refetchBids={refetch} />
            )}
            ListEmptyComponent={
              <View className="flex-1 flex items-center justify-center mt-8">
                <Text>You don't have any active bids</Text>
              </View>
            }
          />
        )}
      </View>
    </View>
  );
}
