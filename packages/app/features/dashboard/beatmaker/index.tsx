import { ActivityIndicator, Text, View } from "app/design-system";
import ProfileBeatsList from "app/features/dashboard/profile/profileBeatsList";
import { useBeatmakerParam } from "app/hooks/param/useBeatmakerParam";
import { useUserCollectionQuery } from "app/api/graphql";
import { useErrorReport } from "app/hooks/useErrorReport";
import { useEffect } from "react";
import { Config } from "app/config";
import { useUserWithId } from "app/hooks/algolia/useUserWithId";
import { ProfileHeader } from "app/features/dashboard/profile/ProfileHeader";
import { tw } from "app/design-system/tailwind";

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
      <View className="w-full flex flex-row items-center web:mt-4">
        {user.isValidating ? (
          <ActivityIndicator size="large" />
        ) : (
          <>
            <ProfileHeader
              avatar={user.data?.avatarUrl!}
              background={user.data?.backgroundUrl!}
              displayName={user!.data?.displayName!}
              twitter={user!.data?.twitter!}
              instagram={user!.data?.instagram!}
              profileUrl={`${Config.APP_URL}/dashboard/beatmaker/${id}`}
            />
          </>
        )}
      </View>
      <Text
        className={
          tw.prefixMatch("md")
            ? "text-lg ml-20 mt-1 font-bold hidden web:flex"
            : "ml-4 mt-1 font-bold text-lg"
        }
      >
        {user!.data?.displayName!}
      </Text>
      {user!.data?.description && (
        <>
          <Text className="w-full max-w-6xl mx-auto pl-4 mt-6 text-lg font-bold">
            Bio
          </Text>
          <Text className="w-full max-w-6xl mx-auto pl-4 mt-3 text-lg">
            {user!.data?.description}
          </Text>
        </>
      )}
      <Text className="w-full max-w-6xl mx-auto pl-4 mt-6 mb-4 text-lg font-bold">
        Beatmaker collection
      </Text>
      <ProfileBeatsList
        beats={entries}
        loading={collection.loading}
        emptyStateText="They don't have any beats in their collection yet"
      />
    </View>
  );
}
