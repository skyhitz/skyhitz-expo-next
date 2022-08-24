// on Web, we don't use React Navigation, so we avoid the provider altogether
// instead, we just have a no-op here
// for more, see: https://solito.dev/recipes/tree-shaking

import { tw } from 'app/design-system/tailwind'
import { View } from 'app/design-system'
import Navbar from 'app/ui/navbar'
import DashboardTabBar from 'app/ui/dashboard-tab-bar'

export const NavigationProvider = ({
  children,
}: {
  children: React.ReactElement
}) => {
  return (
    <View className="flex flex-1 max-h-[100vh] bg-blue-dark">
      <Navbar />
      <View className="flex flex-row flex-1">
        {tw.prefixMatch('sm') && <DashboardTabBar column />}
        {children}
      </View>
      {!tw.prefixMatch('sm') && <DashboardTabBar />}
    </View>
  )
}
