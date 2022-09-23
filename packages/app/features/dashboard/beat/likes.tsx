import { CollapsableView } from "app/features/dashboard/beat/collapsableView";
import { LikesList } from "app/features/player/components/likesList";
import { Entry } from "app/api/graphql";
import Like from "app/ui/icons/like";
import { IconProps } from "app/types";

const FilledLike = (iconProps: IconProps) => Like({ ...iconProps, fill: true });

export function Likes(props: Entry) {
  return (
    <CollapsableView icon={FilledLike} headerText="Likes">
      <LikesList classname="px-5 my-5" entry={props} />
    </CollapsableView>
  );
}
