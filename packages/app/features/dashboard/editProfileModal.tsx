import { Modal, Pressable, Text, View } from "app/design-system";
import { SafeAreaView } from "app/design-system/safe-area-view";
import { UserAvatar } from "app/ui/userAvatar";
import { useRecoilValue } from "recoil";
import { userAtom } from "app/state/atoms";
import { Line } from "app/ui/orSeparator";
import React from "react";
import { EditProfileTextInput } from "app/features/dashboard/editProfileTextInput";
import AccountBox from "app/ui/icons/account-box";
import { tw } from "app/design-system/tailwind";
import InfoCircle from "app/ui/icons/info-circle";
import PersonOutline from "app/ui/icons/person-outline";
import MailOutline from "app/ui/icons/mail-outline";
import Logout from "app/ui/icons/logout";

type Props = {
  visible: boolean;
  setVisible: (_visible: boolean) => void;
};

export default function EditProfileModal(p: Props) {
  const user = useRecoilValue(userAtom)!;

  return (
    <Modal visible={p.visible} className="bg-blue-dark">
      <SafeAreaView className="bg-blue-dark flex-1">
        <View className="flex flex-row justify-between h-16 items-center">
          <View className="flex flex-row">
            <Pressable onPress={() => p.setVisible(false)}>
              <Text className="text-sm mx-4 my-0">Cancel</Text>
            </Pressable>
            <Text className="text-lg font-bold">Edit Profile</Text>
          </View>
          <Pressable disabled={true}>
            <Text className="text-sm mx-4 my-0">Done</Text>
          </Pressable>
        </View>
        <View className="w-full bg-red p-4">
          <Text className="mx-auto text-sm">Upload a profile picture</Text>
        </View>
        <View className="px-4">
          <View className="flex items-center my-4">
            <UserAvatar user={user} />
            <Pressable>
              <Text className="mt-2 font-light text-sm">
                Change Profile Photo
              </Text>
            </Pressable>
          </View>
          <EditProfileTextInput value={user.displayName ?? ""}>
            <AccountBox color={tw.color("white")} size={20} />
          </EditProfileTextInput>
          <Line />
          <EditProfileTextInput value={user.description ?? ""}>
            <InfoCircle color={tw.color("white")} size={20} />
          </EditProfileTextInput>
          <Line />
          <EditProfileTextInput value={user.username ?? ""}>
            <PersonOutline color={tw.color("white")} size={20} />
          </EditProfileTextInput>
          <Text className="font-bold text-sm pt-6 pb-2">Private info</Text>
          <EditProfileTextInput value={user.email ?? ""}>
            <MailOutline color={tw.color("white")} size={20} />
          </EditProfileTextInput>
          <Line />
        </View>

        <Text className="px-4 font-bold text-sm pt-6 pb-2">More</Text>
        <Pressable className="flex flex-row items-center px-4 py-3">
          <Logout color={tw.color("white")} size={20} />
          <Text className="ml-4">Log Out</Text>
        </Pressable>
      </SafeAreaView>
    </Modal>
  );
}
