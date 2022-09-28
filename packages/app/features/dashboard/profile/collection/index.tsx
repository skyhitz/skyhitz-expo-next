import { Text, View } from "app/design-system";
import { useUserCollectionQuery } from "app/api/graphql";
import { isSome } from "app/utils";
import { useRecoilValue } from "recoil";
import { userAtom } from "app/state/user";
import * as assert from "assert";
import ProfileBeatsList from "app/features/dashboard/profile/profileBeatsList";

export default function CollectionScreen() {
  const user = useRecoilValue(userAtom);
  assert.ok(user);
  assert.ok(user.id);
  const { data, loading } = useUserCollectionQuery({
    variables: {
      userId: user.id,
    },
  });
  const entries = data?.userEntries?.filter(isSome) ?? [];

  return (
    <View className="flex-1 w-full">
      <Text className="text-lg ml-8 font-bold hidden web:flex">Collection</Text>
      <ProfileBeatsList
        beats={entries}
        loading={loading}
        emptyStateText="You don't have beats in your collection yet"
      />
    </View>
  );
}
