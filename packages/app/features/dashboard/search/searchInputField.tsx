import React, { ForwardedRef } from "react";
import { TextInput, TextProps } from "app/design-system/textInput";
import { TextInput as rTextInput } from "react-native";
import { Pressable, View } from "app/design-system";
import { tw } from "app/design-system/tailwind";
import Search from "app/ui/icons/search";
import X from "app/ui/icons/x";

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
      <Search color={tw.color("black")} size={24} />
      <TextInput
        placeholder="Search"
        placeholderTextColor="black"
        className="grow ml-1"
        {...rest}
        ref={ref}
      />
      {showX && (
        <Pressable onPress={() => onXClick?.call(null)}>
          <X color={tw.color("black")} size={24} />
        </Pressable>
      )}
    </View>
  );
});
