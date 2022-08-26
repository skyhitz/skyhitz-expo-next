import { Text } from "app/design-system/text";
import { Pressable } from "app/design-system/pressable";
import { ActivityIndicator } from "app/design-system/activityIndicator";

const Button = ({
  loading,
  text,
  onPress,
  className,
  rightIcon,
  disabled,
}: {
  loading?: boolean;
  text: string;
  onPress: () => void;
  className?: string;
  rightIcon?: JSX.Element;
  disabled?: boolean;
}) => {
  return (
    <Pressable className={className} onPress={onPress} disabled={disabled}>
      {loading ? <ActivityIndicator size="small" /> : <Text>{text}</Text>}
      {rightIcon && rightIcon}
    </Pressable>
  );
};

export { Button };
