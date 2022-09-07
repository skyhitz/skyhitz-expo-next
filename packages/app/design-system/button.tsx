import { Text } from "app/design-system/text";
import { Pressable } from "app/design-system/pressable";
import { ActivityIndicator } from "app/design-system/activityIndicator";
import { tw } from "./tailwind";
import { IconProps } from "app/types";
import { ReactElement } from "react";

type Props = {
  loading?: boolean;
  text: string;
  onPress: () => void;
  size?: "default" | "large";
  variant?: "primary" | "secondary";
  icon?: (_props: IconProps) => ReactElement;
  iconProps?: IconProps;
  disabled?: boolean;
  className?: string;
};

const textStyle = {
  default: "text-sm",
  large: "text-base font-bold",
  primary: "text-white",
  secondary: "text-white",
};

const containerStyle = {
  default: "px-5 py-3 w-40",
  large: "px-10 py-5 w-72",
  primary: "bg-blue",
  secondary: "bg-grey",
};

const disabledStyle = "bg-grey-dark";

const defaultIconProps = {
  color: tw.color("white"),
  size: 22,
};
const Button = ({
  loading,
  text,
  onPress,
  size = "default",
  variant = "primary",
  icon,
  iconProps,
  disabled,
  className,
}: Props) => {
  return (
    <Pressable
      className={`flex-row items-center justify-center rounded-full ${
        containerStyle[size]
      } ${disabled ? disabledStyle : containerStyle[variant]} ${className}`}
      onPress={onPress}
      disabled={disabled}
    >
      {loading ? (
        <ActivityIndicator size="small" color={tw.color("white")} />
      ) : (
        <Text
          className={`${textStyle[size]} ${
            disabled ? "text-grey" : textStyle[variant]
          } ${icon ? "mr-2" : ""}`}
        >
          {text}
        </Text>
      )}
      {icon && icon(iconProps ?? defaultIconProps)}
    </Pressable>
  );
};

export { Button };
