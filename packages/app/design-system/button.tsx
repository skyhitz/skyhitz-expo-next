import { Text } from "app/design-system/text";
import { Pressable } from "app/design-system/pressable";
import { ActivityIndicator } from "app/design-system/activityIndicator";
import { tw } from "./tailwind";
import { IconProps } from "app/types";
import { ReactElement } from "react";
import { TouchableWithoutFeedback } from "./TouchableWithoutFeedback";

type Props = {
  loading?: boolean;
  text: string;
  onPress: () => void;
  size?: "default" | "large";
  variant?: "primary" | "secondary" | "white" | "text";
  icon?: (_props: IconProps) => ReactElement;
  iconProps?: IconProps;
  disabled?: boolean;
  className?: string;
  onDisabledPress?: () => void;
  useTouchable?: boolean;
};

const textStyle = {
  default: "text-sm",
  large: "text-base font-bold",
  primary: "text-white",
  secondary: "text-white",
  white: "text-black",
  text: "text-sm",
};

const containerStyle = {
  default: "px-5 py-3 w-40",
  large: "px-10 py-3 w-72",
  primary: "bg-blue",
  secondary: "bg-grey",
  white: "bg-white",
  text: "flex mx-auto mt-8",
};

const disabledStyle = {
  default: "bg-grey-dark",
  large: "bg-grey-dark",
  primary: "bg-grey-dark",
  secondary: "bg-grey-dark",
  white: "bg-grey-dark",
  text: "text-grey",
};

const Button = ({
  loading = false,
  text,
  onPress,
  size = "default",
  variant = "primary",
  icon,
  iconProps,
  disabled = false,
  className,
  onDisabledPress,
  useTouchable = false,
}: Props) => {
  const defaultIconProps = {
    color: disabled ? tw.color("grey") : tw.color("white"),
    size: 22,
  };

  const PressableComponent = useTouchable
    ? TouchableWithoutFeedback
    : Pressable;

  return (
    <PressableComponent
      className={`flex-row items-center justify-center rounded-full ${
        containerStyle[size]
      } ${disabled ? disabledStyle[variant] : containerStyle[variant]} ${
        className ?? ""
      }`}
      onPress={() => {
        if (disabled && onDisabledPress) {
          onDisabledPress();
        } else if (!disabled) {
          onPress();
        }
      }}
    >
      {loading ? (
        <ActivityIndicator size="small" color={tw.color("white")} />
      ) : (
        <>
          <Text
            className={`text-center ${textStyle[size]} ${
              disabled ? "text-grey" : textStyle[variant]
            } ${icon ? "mr-2" : ""}`}
          >
            {text}
          </Text>
          {icon !== undefined && icon(iconProps ?? defaultIconProps)}
        </>
      )}
    </PressableComponent>
  );
};

export { Button };
