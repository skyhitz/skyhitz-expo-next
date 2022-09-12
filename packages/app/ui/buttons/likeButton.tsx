import { Pressable } from "app/design-system";
import { tw } from "app/design-system/tailwind";
import Like from "app/ui/icons/like";
import {
  Entry,
  useLikeEntryMutation,
  useUserLikesQuery,
} from "app/api/graphql";
import useLikeCache from "app/hooks/useLikeCache";

type Props = {
  size: number;
  className?: string;
  entry: Entry;
};

export function LikeButton({ size, className, entry }: Props) {
  const [likeEntry] = useLikeEntryMutation({});
  const { data: userLikesData } = useUserLikesQuery({
    nextFetchPolicy: "cache-first",
  });
  const { addLikeToCache, removeLikeFromCache } = useLikeCache();
  const active = !!userLikesData?.userLikes?.find((e) => e?.id === entry.id);

  const update = async () => {
    if (!entry.id) return;
    active ? removeLikeFromCache(entry) : addLikeToCache(entry);
    try {
      await likeEntry({ variables: { id: entry.id, like: !active } });
    } catch (e) {
      active ? addLikeToCache(entry) : removeLikeFromCache(entry);
    }
  };

  const likeColor = active ? tw.color("blue") : tw.color("white");
  return (
    <Pressable className={className} onPress={update}>
      <Like size={size} color={likeColor} fill={active} />
    </Pressable>
  );
}
