import { Text, View } from "app/design-system";
import { StellarExpertLink } from "app/ui/links/StellarExpertLink";

type LinkWithLabelProps = {
  type: "account" | "asset" | "tx" | "offer";
  id: string;
  className?: string;
};

export function LinkWithLabel({
  type,
  id,
  className = "w-20",
}: LinkWithLabelProps) {
  const label =
    type === "tx"
      ? "Transaction"
      : type.charAt(0).toUpperCase() + type.slice(1);
  return (
    <View className="flex-row md:ml-1 items-center">
      <Text className="text-grey text-sm">{label}: </Text>
      <StellarExpertLink id={id} path={type} className={className} />
    </View>
  );
}
