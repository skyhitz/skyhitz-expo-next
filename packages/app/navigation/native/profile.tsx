import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProfileScreen } from "app/features/dashboard/profile";
import { MintScreen } from "app/features/dashboard/profile/mint/MintScreen";
import { tw } from "app/design-system/tailwind";
import EditProfileScreen from "app/features/dashboard/profile/edit";
import LikesScreen from "app/features/dashboard/profile/likes";
import CollectionScreen from "app/features/dashboard/profile/collection";
import { BidsScreen } from "app/features/dashboard/profile/bids/index";

const ProfileStack = createNativeStackNavigator<{
  "user-details": undefined;
  mint: undefined;
  edit: undefined;
  likes: undefined;
  collection: undefined;
  bids: undefined;
}>();

export function ProfileNavigation() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        component={ProfileScreen}
        name="user-details"
        options={{
          title: "Profile",
          headerShown: false,
        }}
      />
      <ProfileStack.Screen
        component={MintScreen}
        name="mint"
        options={{
          title: "Mint new NFT",
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: tw.color("blue-dark"),
          },
          headerTintColor: tw.color("white"),
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <ProfileStack.Screen
        name="edit"
        component={EditProfileScreen}
        options={{
          title: "Edit Profile",
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: tw.color("blue-dark"),
          },
          headerTintColor: tw.color("white"),
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <ProfileStack.Screen
        name="likes"
        component={LikesScreen}
        options={{
          title: "Likes",
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: tw.color("blue-dark"),
          },
          headerTintColor: tw.color("white"),
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <ProfileStack.Screen
        name="collection"
        component={CollectionScreen}
        options={{
          title: "Collection",
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: tw.color("blue-dark"),
          },
          headerTintColor: tw.color("white"),
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <ProfileStack.Screen
        name="bids"
        component={BidsScreen}
        options={{
          title: "Bids",
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: tw.color("blue-dark"),
          },
          headerTintColor: tw.color("white"),
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </ProfileStack.Navigator>
  );
}
