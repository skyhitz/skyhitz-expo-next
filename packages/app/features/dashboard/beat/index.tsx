import { useBeatParam } from "app/hooks/param/useBeatParam";
import { tw } from "app/design-system/tailwind";
import DesktopView from "app/features/dashboard/beat/desktopView";
import MobileView from "app/features/dashboard/beat/mobileView";
import * as assert from "assert";
import { useSx } from "dripsy";

export default function BeatScreen() {
  const id = useBeatParam();
  assert.ok(id);
  useSx();

  return tw.prefixMatch("md") ? (
    <DesktopView id={id} />
  ) : (
    <MobileView id={id} />
  );
}
