import { useNavigation } from "@react-navigation/native";

export function useMaybeChangeIcon(changeCopiedFunc: (arg1: boolean) => void) {
  const navigation = useNavigation();

  navigation.addListener("blur", () => {
    changeCopiedFunc(false);
  });
}
