import { Dripsy } from "./dripsy";
import { NavigationProvider } from "./navigation";
import { RecoilRoot } from "recoil";
import { FontProvider } from "./font";
import { SkyhitzApolloProvider } from "./apollo";
import { useDeviceContext } from "twrnc";
import { tw } from "app/design-system/tailwind";
import { SafeArea } from "app/provider/safe-area";
import { PlaybackProvider } from "./playback";
import { ClientContextProvider } from "./WalletConnect";
import SkyhitzToastProvider from "app/provider/toast";

export function Provider({ children }: { children: React.ReactNode }) {
  useDeviceContext(tw);
  return (
    <SkyhitzApolloProvider>
      <SafeArea>
        <RecoilRoot>
          <FontProvider>
            <Dripsy>
              <SkyhitzToastProvider>
                <ClientContextProvider>
                  <PlaybackProvider>
                    <NavigationProvider>{children}</NavigationProvider>
                  </PlaybackProvider>
                </ClientContextProvider>
              </SkyhitzToastProvider>
            </Dripsy>
          </FontProvider>
        </RecoilRoot>
      </SafeArea>
    </SkyhitzApolloProvider>
  );
}
