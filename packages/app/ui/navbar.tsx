import SkyhitzLogo from './logo'
import { userAtom } from 'app/state/atoms'
import { useRecoilValue } from 'recoil'
import { Text, TextLink, View } from 'app/design-system'

const Navbar = () => {
  const user = useRecoilValue(userAtom)

  return (
    <View className="flex-row justify-center sm:justify-between items-center p-3 w-full flex-wrap">
      <TextLink href="/" tw="flex flex-row justify-start items-center">
        <View className="flex flex-row items-center">
          <SkyhitzLogo />
          <Text className="pl-4 text-lg font-raleway tracking-[12px]">
            SKYHITZ
          </Text>
        </View>
      </TextLink>
      {user ? null : (
        <View className="hidden sm:flex flex-row justify-end items-center">
          <TextLink
            tw="font-raleway text-sm font-bold tracking-0.5 mr-4"
            href="/sign-in"
          >
            Log in
          </TextLink>

          <View className="bg-white rounded-full px-3">
            <TextLink
              tw="p-2 font-raleway text-sm text-black font-bold tracking-0.5"
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
