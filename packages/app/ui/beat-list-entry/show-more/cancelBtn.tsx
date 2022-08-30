import { Pressable, Text } from "app/design-system";

export function CancelBtn(props: { onPress: () => void }) {
  return (
    <Pressable onPress={props.onPress}>
      <Text>Cancel</Text>
    </Pressable>
  );
}
