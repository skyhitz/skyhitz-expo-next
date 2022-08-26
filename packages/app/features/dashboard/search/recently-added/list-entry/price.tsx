import { Text, View } from "app/design-system";
import Dollar from "app/ui/icons/dollar";

export function Price({
  className,
}: {
  code?: string | null;
  issuer?: string | null;
  className?: string;
}) {
  const price = 25;

  return (
    <View className={`flex flex-row items-center ${className}`}>
      <Dollar size={10} color={"white"} />
      {price > 0 && <Text className="mr-1 text-sm">{price}</Text>}
    </View>
  );
}
