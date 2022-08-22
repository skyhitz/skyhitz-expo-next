import { View, Text } from "dripsy"
import { userAtom } from "app/state/atoms"
import { useRecoilValue } from "recoil"
import useLogOut from "app/hooks/useLogOut"
import { Pressable } from "app/design-system/pressable"

export function SearchScreen() {
  const user = useRecoilValue(userAtom)
  const logOut = useLogOut()

  return (
    <View sx={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text
        sx={{ textAlign: "center", mb: 16, fontWeight: "bold", color: "black" }}
      >{`User ID: ${user?.id}`}</Text>

      <Pressable onPress={logOut}>
        <Text
          sx={{
            textAlign: "center",
            mb: 16,
            fontWeight: "bold",
            color: "black",
          }}
        >
          LogOut
        </Text>
      </Pressable>
    </View>
  )
}
