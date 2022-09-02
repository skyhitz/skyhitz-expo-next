import { useRouter } from "solito/router";
import { Pressable, Text, View } from "app/design-system";
import React from "react";

type Props = {
  disableDoneBtn: boolean;
  onDoneBtnClick: () => void;
};

export function EditProfileHeader({ disableDoneBtn, onDoneBtnClick }: Props) {
  const { back } = useRouter();

  const doneBtnTextColor = disableDoneBtn ? "text-neutral-500" : "text-white";
  return (
    <View className="flex flex-row justify-between h-16 items-center">
      <View className="flex flex-row">
        <Pressable onPress={back}>
          <Text className="text-sm mx-4 my-0">Cancel</Text>
        </Pressable>
        <Text className="text-lg font-bold">Edit Profile</Text>
      </View>
      <Pressable disabled={disableDoneBtn} onPress={onDoneBtnClick}>
        <Text className={`text-sm mx-4 my-0 ${doneBtnTextColor}`}>Done</Text>
      </Pressable>
    </View>
  );
}
