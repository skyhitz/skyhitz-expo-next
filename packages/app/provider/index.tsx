import { Dripsy } from "./dripsy";
import { NavigationProvider } from "./navigation";
import { RecoilRoot } from "recoil";
import { FontProvider } from "./font";
import { SkyhitzApolloProvider } from "./apollo";
import { useDeviceContext } from "twrnc";
import { tw } from "app/design-system/tailwind";
import { SafeArea } from "app/provider/safe-area";
import { PlaybackProvider } from "./playback";

export function Provider({ children }: { children: React.ReactNode }) {
  useDeviceContext(tw);
  return (
    <SkyhitzApolloProvider>
      <SafeArea>
        <RecoilRoot>
          <FontProvider>
            <Dripsy>
              <PlaybackProvider>
                <NavigationProvider>{children}</NavigationProvider>
              </PlaybackProvider>
            </Dripsy>
          </FontProvider>
        </RecoilRoot>
      </SafeArea>
    </SkyhitzApolloProvider>
  );
}
