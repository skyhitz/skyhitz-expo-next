import { View } from 'app/design-system'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import { Image, StyleProp, ViewStyle } from 'react-native'
import { Link } from 'solito/link'
import { tw } from 'app/design-system/tailwind'

export default function DashboardTabBar({ column }: { column?: boolean }) {
  const rootViewStyle = column
    ? 'flex-col h-64'
    : 'flex-row border-t-2 border-white'

  const LinkStyle: StyleProp<ViewStyle> = {
    flex: 1,
    flexBasis: 0,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  }
  return (
    <View className={`h-16 flex bg-blue-dark  ${rootViewStyle}`}>
      <Link viewProps={{ style: LinkStyle }} href={'/dashboard/search'}>
        <Icon name="magnify" size={32} color="white" />
      </Link>
      <Link viewProps={{ style: LinkStyle }} href={'/dashboard/chart'}>
        <Image
          style={tw`w-8 h-8 rounded-full border border-white`}
          source={require('app/assets/images/icon.png')}
        />
      </Link>
      <Link viewProps={{ style: LinkStyle }} href={'/dashboard/profile'}>
        <Icon name="account-outline" size={32} color="white" />
      </Link>
    </View>
  )
}
