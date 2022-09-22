import { Image } from "app/design-system";

export function Artwork() {
  return (
    <Image
      source={{
        uri: "https://skyhitz.io/cdn-cgi/image/width=200/https://cloudflare-ipfs.com/ipfs/bafkreiasainuvfiyc7v2nclpewx2gzr65dq5etwwdvuo7pcxswhvwl6cea",
      }}
      className="aspect-square"
    />
  );
}
