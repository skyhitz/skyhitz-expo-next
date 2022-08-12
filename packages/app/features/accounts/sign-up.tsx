import { View } from 'app/design-system'
import BackgroundImage from 'app/ui/background-image'
import WalletconnectBtn from 'app/ui/walletconnect-btn'

export function SignUp() {
  return (
    <View className="w-full h-full flex items-center justify-center">
      <BackgroundImage />
      <View>
        <WalletconnectBtn />
      </View>
    </View>
  )
}
