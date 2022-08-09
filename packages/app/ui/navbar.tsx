import SkyhitzLogo from './logo'
import { userAtom } from 'app/state/atoms'
import { useRecoilValue } from 'recoil'
import { Text, TextLink, View } from 'app/design-system'

const Navbar = () => {
  const user = useRecoilValue(userAtom)

  return (
    <View tw="flex-row justify-between items-center p-3 w-full flex-wrap">
      <TextLink href="/" tw="flex-row justify-start items-center">
        <View tw="flex-row items-center">
          <SkyhitzLogo />
          <Text tw="pl-5 text-lg font-raleway" sx={{ letterSpacing: 12 }}>
            SKYHITZ
          </Text>
        </View>
      </TextLink>
      {user ? null : (
        <View tw="flex-row justify-end items-center">
          <TextLink
            tw="font-raleway text-sm font-bold tracking-0.5 mr-4"
            href="/sign-in"
          >
            Log in
          </TextLink>

          <View tw="bg-white rounded-full px-3">
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
