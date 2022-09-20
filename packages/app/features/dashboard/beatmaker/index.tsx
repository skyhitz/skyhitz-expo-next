import { isSome } from "app/utils";
import { Text, View } from "app/design-system";
import ProfileBeatsList from "app/features/dashboard/profile/profileBeatsList";
import { useBeatmakerParam } from "app/hooks/param/useBeatmakerParam";
import { useRouter } from "solito/router";
import { UserAvatar } from "app/ui/userAvatar";
import { useUserCollectionQuery } from "app/api/graphql";

export default function BeatmakerScreen() {
  const params = useBeatmakerParam(); // TODO: fetch missing params
  const { data, loading } = useUserCollectionQuery({
    skip: !params?.id,
    variables: {
      userId: params!.id,
    },
  });
  const { back } = useRouter();
  const entries = data?.entries?.filter(isSome) ?? [];

  if (!params) {
    back();
    return null;
  }

  return (
    <View className="flex-1 w-full bg-blue-dark">
      <Text className="text-lg ml-8 font-bold hidden web:flex">Beatmaker</Text>
      <View className="w-full bg-beatmakerAvatarBackground flex flex-row items-center py-4 px-8 web:mt-4">
        <UserAvatar
          size="large"
          avatarUrl={params.avatarUrl}
          displayName={params.displayName}
        />
        <Text className="ml-4 font-bold text-lg">{params.displayName}</Text>
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
