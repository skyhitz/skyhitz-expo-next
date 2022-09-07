import React, { ReactElement } from "react";
import { TextInput, View } from "app/design-system";
import { TextProps } from "app/design-system/textInput";
import { tw } from "app/design-system/tailwind";
import { IconProps } from "app/types";

type Props = {
  icon: (_props: IconProps) => ReactElement;
  iconProps?: IconProps;
  containerClassNames?: string;
};

const defaultIconProps = {
  color: tw.color("white"),
  size: 22,
};

export function FormInputWithIcon({
  style,
  containerClassNames = "",
  placeholderTextColor,
  icon,
  iconProps,
  ...rest
}: TextProps & Props) {
  return (
    <View className={`flex flex-row py-5 items-center ${containerClassNames}`}>
      {icon(iconProps ?? defaultIconProps)}
      <TextInput
        style={[tw.style("ml-4 text-white"), style]}
        placeholderTextColor={placeholderTextColor ?? tw.color("white")}
        {...rest}
      />
    </View>
  );
}
