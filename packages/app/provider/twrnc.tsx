import { useDeviceContext } from 'twrnc'
import { tw } from 'app/design-system/tailwind'

export default function TwrncProvider({
  children,
}: {
  children: React.ReactNode
}) {
  useDeviceContext(tw)
  return <>{children}</>
}
