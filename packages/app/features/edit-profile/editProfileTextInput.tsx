import React, { ForwardedRef, ReactElement } from "react";
import { TextInput, View } from "app/design-system";
import { TextInput as rTextInput } from "react-native";
import { TextProps } from "app/design-system/textInput";
import { tw } from "app/design-system/tailwind";
import { IconProps } from "app/types";

type Props = TextProps & {
  icon: (_props: IconProps) => ReactElement;
  iconProps?: IconProps;
  className?: string;
};

const defaultIconProps = {
  color: tw.color("white"),
  size: 22,
};

export const EditProfileTextInput = React.forwardRef(
  function EditProfileTextInput(
    {
      placeholderTextColor,
      style,
      icon,
      iconProps,
      className = "",
      ...rest
    }: Props,
    ref: ForwardedRef<rTextInput>
  ) {
    return (
      <View className={`flex flex-row py-3 ${className}`}>
        {icon(iconProps ?? defaultIconProps)}
        <TextInput
          style={[tw.style("ml-4 text-white w-full"), style]}
          placeholderTextColor={placeholderTextColor ?? tw.color("white")}
          {...rest}
          ref={ref}
        />
      </View>
    );
  }
);
