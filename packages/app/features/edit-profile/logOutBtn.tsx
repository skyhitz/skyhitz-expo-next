import useLogOut from "app/hooks/useLogOut";
import { Pressable, Text } from "app/design-system";
import Logout from "app/ui/icons/logout";
import { tw } from "app/design-system/tailwind";
import React from "react";

export function LogOutBtn() {
  const logOut = useLogOut();

  return (
    <Pressable
      className="flex flex-row items-center px-4 py-3"
      onPress={logOut}
    >
      <Logout color={tw.color("white")} size={20} />
      <Text className="ml-4 text-sm">Log Out</Text>
    </Pressable>
  );
}
