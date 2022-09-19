import { Pressable } from "app/design-system";
import { tw } from "app/design-system/tailwind";
import Like from "app/ui/icons/like";
import {
  Entry,
  useLikeEntryMutation,
  useUserLikesQuery,
} from "app/api/graphql";
import useLikeCache from "app/hooks/useLikeCache";
import { ErrorType } from "app/types";
import { any } from "ramda";
import { isSome } from "app/utils";
import { useToast } from "react-native-toast-notifications";
import { ComponentAuthGuard } from "app/utils/authGuard";

type Props = {
  size: number;
  className?: string;
  entry: Entry;
};

function LikeButton({ size, className, entry }: Props) {
  const [likeEntry] = useLikeEntryMutation();
  const toast = useToast();
  const { data: userLikesData } = useUserLikesQuery();
  const { addLikeToCache, removeLikeFromCache } = useLikeCache();
  const active = any(
    (item) => isSome(item) && item.id === entry.id,
    userLikesData?.userLikes ?? []
  );

  const update = async () => {
    if (!entry.id) return;
    active ? removeLikeFromCache(entry) : addLikeToCache(entry);
    try {
      await likeEntry({ variables: { id: entry.id, like: !active } });
    } catch (e) {
      active ? addLikeToCache(entry) : removeLikeFromCache(entry);

      const err = e as Partial<ErrorType>;
      toast.show(err?.message ?? "Unknown error", { type: "danger" });
    }
  };

  const likeColor = active ? tw.color("blue") : tw.color("white");
  return (
    <Pressable className={className} onPress={update}>
      <Like size={size} color={likeColor} fill={active} />
    </Pressable>
  );
}

export default function LikeBtn(props: Props) {
  return (
    <ComponentAuthGuard>
      <LikeButton {...props} />
    </ComponentAuthGuard>
  );
}
