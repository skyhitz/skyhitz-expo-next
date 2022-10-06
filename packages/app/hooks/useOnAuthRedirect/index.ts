import { useCallback, useEffect, useState } from "react";
import { Linking } from "react-native";
import { useRouter } from "solito/router";
import { Config } from "app/config";
import { useRecoilValue } from "recoil";
import { appInitializedAtom } from "app/state/user";

type Result = {
  onAuthRedirect: (auth: boolean) => void;
};

export function useOnAuthRedirect(): Result {
  const { push } = useRouter();
  const initialized = useRecoilValue(appInitializedAtom);
  const [initialPath, setInitialPath] = useState<string | undefined>();
  useEffect(() => {
    Linking.addEventListener("url", (event) => {
      const path = event.url.replace(Config.APP_URL, "");
      if (initialized) {
        push(path);
      }
    });
    const getInitialUrl = async () => {
      const link = await Linking.getInitialURL();
      console.log(link);
      if (link && link.startsWith(Config.APP_URL)) {
        const path = link.replace(Config.APP_URL, "");
        setInitialPath(path);
      }
    };
    getInitialUrl();
  }, [push]);

  const onAuthRedirect = useCallback(
    (auth: boolean) => {
      if (auth) {
        push(initialPath ?? "/dashboard/search");
      } else {
        push(initialPath ?? "/");
      }
    },
    [push, initialPath]
  );

  return { onAuthRedirect };
}
