import { CollapsableView } from "app/features/dashboard/beat/collapsableView";
import { LikesList } from "app/features/player/components/likesList";

export function Likes(props: { id: string }) {
  return (
    <CollapsableView headerText="Likes">
      <LikesList entry={{ id: props.id }} />
    </CollapsableView>
  );
}
