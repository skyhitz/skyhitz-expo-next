import React, { ForwardedRef, ReactElement } from "react";
import { TextInput, View } from "app/design-system";
import { TextInput as rTextInput } from "react-native";
import { TextProps } from "app/design-system/textInput";
import { tw } from "app/design-system/tailwind";

export const EditProfileTextInput = React.forwardRef(
  function EditProfileTextInput(
    { children, style, ...rest }: TextProps & { children: ReactElement },
    ref: ForwardedRef<rTextInput>
  ) {
    return (
      <View className="flex flex-row py-3">
        {children}
        <TextInput
          style={[tw.style("ml-4 text-white"), style]}
          {...rest}
          ref={ref}
        />
      </View>
    );
  }
);
