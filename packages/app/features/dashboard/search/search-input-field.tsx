import React, { ForwardedRef } from "react";
import { TextInput, TextProps } from "app/design-system/textInput";
import { TextInput as rTextInput } from "react-native";
import { Pressable, View } from "app/design-system";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { tw } from "app/design-system/tailwind";

export const SearchInputField = React.forwardRef(function SearchInputField(
  {
    showX,
    onXClick,
    ...rest
  }: TextProps & { showX?: boolean; onXClick?: () => void },
  ref: ForwardedRef<rTextInput>
) {
  return (
    <View className="w-full bg-white rounded-lg px-2 py-1 flex flex-row">
      <Icon name="magnify" color={tw.color("black")} size={24} />
      <TextInput
        placeholder="Search"
        placeholderTextColor="black"
        className="grow ml-1"
        {...rest}
        ref={ref}
      />
      {showX && (
        <Pressable onPress={() => onXClick?.call(null)}>
          <Icon
            name="close-circle-outline"
            color={tw.color("black")}
            size={24}
          />
        </Pressable>
      )}
    </View>
  );
});
