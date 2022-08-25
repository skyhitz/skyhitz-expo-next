import { Platform } from "react-native";
import * as Linking from "expo-linking";
import * as IntentLauncher from "expo-intent-launcher";

function openInboxAndroid() {
  const activityAction = "android.intent.action.MAIN";
  const intentParams: IntentLauncher.IntentLauncherParams = {
    flags: 268435456, // Intent.FLAG_ACTIVITY_NEW_TASK
    category: "android.intent.category.APP_EMAIL",
  };

  IntentLauncher.startActivityAsync(activityAction, intentParams);
}

export function openEmail() {
  if (Platform.OS === "web") {
    Linking.openURL("https://mail.google.com/mail/u/0/#inbox");
  } else if (Platform.OS === "android") {
    openInboxAndroid();
  } else if (Platform.OS === "ios") {
    Linking.openURL("message://");
  }
}
