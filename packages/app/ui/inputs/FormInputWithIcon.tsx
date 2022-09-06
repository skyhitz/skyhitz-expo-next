import React, { ReactElement } from "react";
import { TextInput, View } from "app/design-system";
import { TextProps } from "app/design-system/textInput";
import { tw } from "app/design-system/tailwind";

type Props = {
  icon: ReactElement;
};

export function FormInputWithIcon({
  style,
  placeholderTextColor,
  icon,
  ...rest
}: TextProps & Props) {
  return (
    <View className="flex flex-row py-3">
      {icon}
      <TextInput
        style={[tw.style("ml-4 text-white"), style]}
        placeholderTextColor={placeholderTextColor ?? tw.color("white")}
        {...rest}
      />
    </View>
  );
}
