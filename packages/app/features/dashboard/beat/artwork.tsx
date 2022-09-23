import { Image } from "app/design-system";
import { Maybe } from "app/types";
import { imageSrc } from "app/utils/entry";

export function Artwork({ uri }: { uri: Maybe<string> }) {
  if (!uri) return null;
  return (
    <Image
      source={{
        uri: imageSrc(uri),
      }}
      className="aspect-square"
    />
  );
}
