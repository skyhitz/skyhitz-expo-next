import { ComponentProps } from "react";
import { useSx, View as DripsyView } from "dripsy";
import { tw as tailwind } from "app/design-system/tailwind";

type ViewProps = { className?: string } & ComponentProps<typeof DripsyView>;

function View({ className, sx, ...props }: ViewProps) {
  useSx();

  return <DripsyView sx={{ ...sx, ...tailwind.style(className) }} {...props} />;
}

export { View };
