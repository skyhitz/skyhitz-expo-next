import { Dripsy } from "./dripsy"
import { NavigationProvider } from "./navigation"
import { RecoilRoot } from "recoil"
import { FontProvider } from "./font"

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <NavigationProvider>
      <RecoilRoot>
        <FontProvider>
          <Dripsy>{children}</Dripsy>
        </FontProvider>
      </RecoilRoot>
    </NavigationProvider>
  )
}
