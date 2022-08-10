import SkyhitzLogo from './logo'
import { userAtom } from 'app/state/atoms'
import { useRecoilValue } from 'recoil'
import { Text, View } from 'react-native'
import { TextLink } from 'solito/link'
import { tw } from 'app/design-system/tailwind'

const Navbar = () => {
  const user = useRecoilValue(userAtom)

  return (
    <View
      style={tw`flex flex-row justify-center md:justify-between items-center p-3 w-full flex-wrap`}
    >
      <TextLink
        href="/"
        textProps={tw`flex flex-row justify-start items-center`}
      >
        <View style={tw`flex flex-row items-center`}>
          <SkyhitzLogo />
          <Text
            style={tw`pl-5 text-lg font-raleway text-white tracking-[12px]`}
          >
            SKYHITZ
          </Text>
        </View>
      </TextLink>
      {user ? null : (
        <View style={tw`flex-row justify-end items-center hidden md:flex`}>
          <TextLink
            textProps={tw`font-raleway text-sm font-bold tracking-0.5 mr-4`}
            href="/sign-in"
          >
            Log in
          </TextLink>

          <View style={tw`bg-white rounded-full px-3`}>
            <TextLink
              textProps={tw`p-2 font-raleway text-sm text-black font-bold tracking-0.5`}
              href="/sign-up"
            >
              Sign Up
            </TextLink>
          </View>
        </View>
      )}
    </View>
  )
}

export default Navbar
