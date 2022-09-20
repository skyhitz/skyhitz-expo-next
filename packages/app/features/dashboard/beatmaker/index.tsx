import { isSome } from "app/utils";
import { Text, View } from "app/design-system";
import ProfileBeatsList from "app/features/dashboard/profile/profileBeatsList";
import { useBeatmakerParam } from "app/hooks/param/useBeatmakerParam";
import { UserAvatar } from "app/ui/userAvatar";
import { PublicUser, useUserCollectionQuery } from "app/api/graphql";
import { useEffect, useMemo, useState } from "react";
import { getUser } from "app/api/algolia";
import useErrorReport from "app/hooks/useErrorReport";

export default function BeatmakerScreen() {
  const id = useBeatmakerParam();
  const reportError = useErrorReport();
  const [displayName, setDisplayName] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string | null | undefined>(null);
  const { data, loading } = useUserCollectionQuery({
    skip: !id,
    variables: {
      userId: id!,
    },
  });
  const entries = data?.entries?.filter(isSome) ?? [];

  const fetchUser = useMemo(
    () => async () => {
      if (!id) return;

      let user: PublicUser;
      try {
        user = await getUser(id);
      } catch (e) {
        reportError(e);
        return;
      }

      setAvatarUrl(user.avatarUrl);
      setDisplayName(user.displayName ?? "");
    },
    [id, reportError]
  );

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <View className="flex-1 w-full bg-blue-dark">
      <Text className="text-lg ml-8 font-bold hidden web:flex">Beatmaker</Text>
      <View className="w-full bg-beatmakerAvatarBackground flex flex-row items-center py-4 px-8 web:mt-4">
        <UserAvatar
          size="large"
          avatarUrl={avatarUrl}
          displayName={displayName}
        />
        <Text className="ml-4 font-bold text-lg">{displayName}</Text>
      </View>
      <Text className="w-full max-w-6xl mx-auto pl-4 mt-6 mb-4 text-lg">
        Beatmaker collection
      </Text>
      <ProfileBeatsList
        beats={entries}
        loading={loading}
        emptyStateText="They don't have any beats in their collection yet"
      />
    </View>
  );
}
