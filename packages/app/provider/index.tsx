import { NavigationProvider } from './navigation'
import { RecoilRoot } from 'recoil'
import { FontProvider } from './font'
import { SkyhitzApolloProvider } from './apollo'
import TwrncProvider from 'app/provider/twrnc'

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <SkyhitzApolloProvider>
      <TwrncProvider>
        <NavigationProvider>
          <RecoilRoot>
            <FontProvider>{children}</FontProvider>
          </RecoilRoot>
        </NavigationProvider>
      </TwrncProvider>
    </SkyhitzApolloProvider>
  )
}
