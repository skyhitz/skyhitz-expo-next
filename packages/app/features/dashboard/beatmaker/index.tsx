import { ActivityIndicator, Text, View } from "app/design-system";
import ProfileBeatsList from "app/features/dashboard/profile/profileBeatsList";
import { useBeatmakerParam } from "app/hooks/param/useBeatmakerParam";
import { UserAvatar } from "app/ui/userAvatar";
import { useUserCollectionQuery } from "app/api/graphql";
import { useErrorReport } from "app/hooks/useErrorReport";
import { useEffect } from "react";
import { ShareButton } from "app/ui/buttons/ShareButton";
import { Config } from "app/config";
import { useUserWithId } from "app/hooks/algolia/useUserWithId";
import { CollectionSkeleton } from "app/ui/skeletons/CollectionSkeleton";

export default function BeatmakerScreen() {
  const id = useBeatmakerParam();
  const reportError = useErrorReport();
  const user = useUserWithId(id);
  const collection = useUserCollectionQuery({
    skip: !id,
    variables: {
      userId: id!,
    },
  });
  const entries = collection.data?.userEntries ?? [];

  useEffect(() => {
    if (collection.error) {
      reportError(collection.error);
    }
  }, [collection.error, reportError]);

  useEffect(() => {
    if (user.error) {
      reportError(user.error);
    }
  }, [user.error, reportError]);

  return (
    <View className="flex-1 w-full bg-blue-dark">
      <Text className="text-lg ml-8 font-bold hidden web:flex">Beatmaker</Text>
      <View className="w-full bg-beatmakerAvatarBackground flex flex-row items-center py-4 px-8 web:mt-4">
        {user.isValidating ? (
          <ActivityIndicator size="large" />
        ) : (
          <>
            <UserAvatar
              size="large"
              avatarUrl={user.data?.avatarUrl}
              displayName={user.data?.displayName}
            />
            <Text className="ml-4 font-bold text-lg">
              {user.data?.displayName}
            </Text>
            <View className="w-0.25 h-6 bg-grey-light mx-3" />
            <ShareButton
              url={`${Config.APP_URL}/dashboard/beatmaker/${id}`}
              title="Share beatmaker!"
            />
          </>
        )}
      </View>
      <Text className="w-full max-w-6xl mx-auto pl-4 mt-6 mb-4 text-lg">
        Beatmaker collection
      </Text>
      {collection.loading && <CollectionSkeleton duplicates={3} />}
      {!collection.loading && (
        <ProfileBeatsList
          beats={entries}
          emptyStateText="They don't have any beats in their collection yet"
        />
      )}
    </View>
  );
}
