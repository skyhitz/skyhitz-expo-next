import { Image, Text, View } from "app/design-system";
import { compose, head, join, map, split, take, toUpper } from "ramda";

const classNames = {
  default: {
    size: "h-10 w-10",
    border: "",
    textSize: "text-sm",
  },

  large: {
    size: "h-20 w-20",
    border: "border border-white",
    textSize: "text-lg",
  },
};

export type UserAvatarProps = {
  avatarUri?: string | null;
  displayName?: string | null;
  size?: "default" | "large";
};

export function UserAvatar({
  avatarUri,
  displayName,
  size = "default",
}: UserAvatarProps) {
  const classes = classNames[size];

  if (avatarUri) {
    return (
      <Image
        source={{ uri: avatarUri }}
        className={`${classes.size} rounded-full`}
        resizeMode="cover"
      />
    );
  }

  let initials = "";
  if (displayName) {
    initials = compose(
      join(""),
      take(2),
      map((part) => toUpper(head(part))),
      split(" ")
    )(displayName);
  }

  return (
    <View
      className={`${classes.size} ${classes.border} rounded-full bg-blue-light items-center justify-center flex`}
    >
      <Text className={`${classes.textSize} text-center text-black`}>
        {initials}
      </Text>
    </View>
  );
}
