import { useRouter } from "solito/router";
import { ActivityIndicator, Pressable, Text, View } from "app/design-system";
import React from "react";

type Props = {
  disableDoneBtn: boolean;
  onDoneBtnClick: () => void;
  setDoneBtnLoading?: boolean;
};

export function EditProfileHeader({
  disableDoneBtn,
  onDoneBtnClick,
  setDoneBtnLoading,
}: Props) {
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
        {setDoneBtnLoading ? (
          <ActivityIndicator tw="mx-7" />
        ) : (
          <Text className={`text-sm mx-4 my-0 ${doneBtnTextColor}`}>Done</Text>
        )}
      </Pressable>
    </View>
  );
}
