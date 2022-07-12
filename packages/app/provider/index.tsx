import { Dripsy } from './dripsy'
import { NavigationProvider } from './navigation'
import { RecoilRoot } from 'recoil'

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <NavigationProvider>
      <RecoilRoot>
        <Dripsy>{children}</Dripsy>
      </RecoilRoot>
    </NavigationProvider>
  )
}
