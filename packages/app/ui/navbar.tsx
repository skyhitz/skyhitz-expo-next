import SkyhitzLogo from './logo'
import { userAtom } from 'app/state/atoms'
import { useRecoilValue } from 'recoil'
import { Text, TextLink, View } from 'app/design-system'

const Navbar = () => {
  const user = useRecoilValue(userAtom)

  return (
    <View tw="border-black h-14 flex-row grow justify-between items-center w-full">
      <TextLink href="/" tw="flex-row justify-start items-center">
        <View tw="flex-row items-center pl-3">
          <SkyhitzLogo />
          <Text>SKYHITZ</Text>
        </View>
      </TextLink>
      {user ? null : (
        <View tw="flex-row justify-end items-center pr-5">
          <TextLink tw="p-2" href="/sign-in">
            Log in
          </TextLink>
          <TextLink tw="p-2" href="/sign-up">
            Sign Up
          </TextLink>
        </View>
      )}
    </View>
  )
}

export default Navbar
