import { Text, View } from "app/design-system";
import Upload from "app/ui/icons/upload";
import { tw } from "app/design-system/tailwind";
import { Link } from "solito/link";

export function MintNewNftBtn() {
  return (
    <Link href="/dashboard/profile/mint">
      <View className="btn w-72 mx-auto mt-16">
        <Text className="text-sm font-semibold mr-2">Mint new NFT</Text>
        <Upload size={24} color={tw.color("white")} />
      </View>
    </Link>
  );
}
