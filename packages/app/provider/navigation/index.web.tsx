import { useRouter } from 'next/router'
import { DashboardNavigation } from 'app/ui/dashboardNavigation'

export function NavigationProvider({
  children,
}: {
  children: React.ReactElement
}) {
  const router = useRouter()
  const route = router.route
  if (route.includes('dashboard')) {
    return <DashboardNavigation>{children}</DashboardNavigation>
  }
  return <>{children}</>
}
