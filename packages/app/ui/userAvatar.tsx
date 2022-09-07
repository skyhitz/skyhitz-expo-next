import { User } from "app/api/graphql";
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

  small: {
    size: "h-8 w-8",
    border: "",
    textSize: "text-xs",
  },
};

type Props = {
  user: User;
  size?: "default" | "large" | "small";
};

export function UserAvatar({ user, size = "default" }: Props) {
  const classes = classNames[size];

  if (user.avatarUrl) {
    return (
      <Image
        source={{ uri: user.avatarUrl }}
        className={`${classes.size} rounded-full`}
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
