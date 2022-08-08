import { Dripsy } from './dripsy'
import { NavigationProvider } from './navigation'
import { RecoilRoot } from 'recoil'
import { FontProvider } from './font'
import { SkyhitzApolloProvider } from './apollo'

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <SkyhitzApolloProvider>
      <NavigationProvider>
        <RecoilRoot>
          <FontProvider>
            <Dripsy>{children}</Dripsy>
          </FontProvider>
        </RecoilRoot>
      </NavigationProvider>
    </SkyhitzApolloProvider>
  )
}
