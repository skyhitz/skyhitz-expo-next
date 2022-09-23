import { useBeatParam } from "app/hooks/param/useBeatParam";
import { tw } from "app/design-system/tailwind";
import DesktopView from "app/features/dashboard/beat/desktopView";
import MobileView from "app/features/dashboard/beat/mobileView";
import { useSx } from "dripsy";
import { useEntryQuery } from "app/api/graphql";

export default function BeatScreen() {
  const id = useBeatParam();
  useSx();
  const { data } = useEntryQuery({ variables: { id: id! }, skip: !id });
  const [entry] = data?.entries ?? [{}];

  return tw.prefixMatch("md") ? (
    <DesktopView {...entry} />
  ) : (
    <MobileView {...entry} />
  );
}
