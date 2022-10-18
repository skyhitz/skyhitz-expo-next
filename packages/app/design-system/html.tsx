import { ComponentProps } from "react";
import {
  H1 as DripsyH1,
  P as DripsyP,
  Text as DripsyText,
  Theme,
  useSx,
} from "dripsy";

import { tw as tailwind } from "app/design-system/tailwind";

type Variant = keyof Theme["text"];

type TextProps = { className?: string; variant?: Variant } & Omit<
  ComponentProps<typeof DripsyText>,
  "variant"
>;

function H1({ className, sx, variant, ...props }: TextProps) {
  useSx();
  return (
    <DripsyH1
      sx={{ ...sx, ...tailwind.style(className) }}
      variant={variant}
      {...props}
    />
  );
}

function P({ className, sx, variant, ...props }: TextProps) {
  useSx();
  return (
    <DripsyP
      sx={{ ...sx, ...tailwind.style(className) }}
      variant={variant}
      {...props}
    />
  );
}

export { H1, P };
