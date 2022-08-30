import { View } from "app/design-system";
import { useRecoilValue } from "recoil";
import { userAtom } from "app/state/atoms";
import { UserAvatar } from "app/ui/userAvatar";

export function ProfileScreen() {
  const user = useRecoilValue(userAtom);

  return (
    <View className="flex-1">
      <View>
        <UserAvatar user={user!} big />
      </View>
    </View>
  );
}
