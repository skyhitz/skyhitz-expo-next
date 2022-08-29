import { ComponentProps } from "react";
import { useSx, Image as ImageDripsy } from "dripsy";
import { tw as tailwind } from "app/design-system/tailwind";

type ImageProps = { className?: string } & ComponentProps<typeof ImageDripsy>;

export function Image({ className, sx, ...props }: ImageProps) {
  useSx();

  return (
    <ImageDripsy sx={{ ...sx, ...tailwind.style(className) }} {...props} />
  );
}
