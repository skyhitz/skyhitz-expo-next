import SkyhitzLogo from './logo'
import { userAtom } from 'app/state/atoms'
import { useRecoilValue } from 'recoil'
import { Text, TextLink, View } from 'app/design-system'

const Navbar = () => {
  // const user = useRecoilValue(userAtom)
  const user = {}

  return (
    <View tw="border-black h-14 flex-row justify-between">
      <TextLink href="/" tw="h-14 flex-row justify-start">
        <View tw="flex-row items-center pl-3">
          <SkyhitzLogo />
          <Text>SKYHITZ</Text>
        </View>
      </TextLink>
      <View tw="h-14 flex-row justify-end items-center pr-5">
        {user ? null : (
          <>
            <TextLink href="/accounts/sign-in">Log in</TextLink>
            <TextLink href="/accounts/sign-up">Sign Up</TextLink>
          </>
        )}
      </View>
    </View>
  )
}

export default Navbar
