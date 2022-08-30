import { User } from "app/api/graphql";
import { Image, Text, View } from "app/design-system";
import { compose, head, join, map, split, take, toUpper } from "ramda";

type Props = {
  user: User;
  big?: boolean;
};
export function UserAvatar({ user, big }: Props) {
  const sizeClassNames = big ? "h-20 w-20" : "h-10 w-10";

  if (user.avatarUrl) {
    return (
      <Image
        source={{ uri: user.avatarUrl }}
        className={`${sizeClassNames} rounded-full`}
        resizeMode="cover"
      />
    );
  }

  let initials = "";
  if (user.displayName) {
    initials = compose(
      join(""),
      take(2),
      map((part) => toUpper(head(part))),
      split(" ")
    )(user.displayName);
  }

  const borderClassName = big ? "border border-white" : "";
  const textSizeClassName = big ? "text-lg" : "text-sm";

  return (
    <View
      className={`${sizeClassNames} ${borderClassName} rounded-full bg-blue-light items-center justify-center flex`}
    >
      <Text className={`${textSizeClassName} text-center text-black`}>
        {initials}
      </Text>
    </View>
  );
}
