import { View } from 'app/design-system'
import Navbar from 'app/ui/navbar'
import { tw } from 'app/design-system/tailwind'
import DashboardTabBar from 'app/ui/dashboard-tab-bar'

export function DashboardNavigation({
  children,
}: {
  children: React.ReactElement
}) {
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
