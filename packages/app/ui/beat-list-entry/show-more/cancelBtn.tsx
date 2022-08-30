import { Pressable, Text } from "app/design-system";

type Props = { onPress: () => void };

export function CancelBtn({ onPress }: Props) {
  return (
    <Pressable onPress={onPress}>
      <Text>Cancel</Text>
    </Pressable>
  );
}
