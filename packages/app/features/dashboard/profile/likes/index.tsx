import { Text, View } from "app/design-system";
import { useUserLikesQuery } from "app/api/graphql";
import { isSome } from "app/utils";
import ProfileBeatsList from "app/features/dashboard/profile/profileBeatsList";
import { CollectionSkeleton } from "app/ui/skeletons/CollectionSkeleton";

export default function LikesScreen() {
  const { data, loading } = useUserLikesQuery();
  const entries = data?.userLikes?.filter(isSome) ?? [];

  return (
    <View className="flex-1 w-full">
      <Text className="text-lg ml-8 font-bold hidden web:flex">Likes</Text>
      {loading && <CollectionSkeleton duplicates={3} />}
      {!loading && (
        <ProfileBeatsList
          beats={entries}
          emptyStateText="You don't have beats in your favorites list yet"
        />
      )}
    </View>
  );
}
