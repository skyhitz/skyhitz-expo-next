import { useCallback } from "react";
import { Linking } from "react-native";
import { useRouter } from "solito/router";
import { Config } from "app/config";

type Result = {
  onAuthRedirect: (auth: boolean) => Promise<void>;
};

export function useOnAuthRedirect(): Result {
  const { push } = useRouter();

  const onAuthRedirect = useCallback(
    async (auth: boolean) => {
      const link = await Linking.getInitialURL();
      let initialPath = auth ? "/dashboard/search" : "/";
      if (link && link.startsWith(Config.APP_URL)) {
        const path = link.replace(Config.APP_URL, "");
        initialPath = path;
      }
      push(initialPath);
    },
    [push]
  );

  return { onAuthRedirect };
}
