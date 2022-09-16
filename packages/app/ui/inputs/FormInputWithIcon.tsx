import React, { ReactElement } from "react";
import { Text, TextInput, View } from "app/design-system";
import { TextProps } from "app/design-system/textInput";
import { tw } from "app/design-system/tailwind";
import { IconProps } from "app/types";

type Props = {
  icon: (_props: IconProps) => ReactElement;
  iconProps?: IconProps;
  containerClassNames?: string;
  error?: string;
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
  error,
  ...rest
}: TextProps & Props) {
  return (
    <View className={`flex py-5 ${containerClassNames}`}>
      <View className={`flex flex-row items-center `}>
        {icon(iconProps ?? defaultIconProps)}
        <TextInput
          style={[tw.style("ml-4 text-white grow"), style]}
          placeholderTextColor={placeholderTextColor ?? tw.color("white")}
          {...rest}
        />
      </View>
      {error !== undefined && <Text className="text-red mt-3">{error}</Text>}
    </View>
  );
}
