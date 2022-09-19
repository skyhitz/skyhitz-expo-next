import { createParam } from "solito";
import { useMemo } from "react";

export type BeatmakerParam = {
  id: string;
  displayName: string;
  avatarUrl?: string;
};

const { useParam } = createParam<BeatmakerParam>();

export const useBeatmakerParam = (): BeatmakerParam | undefined => {
  const [id] = useParam("id");
  const [displayName] = useParam("displayName");
  const [avatarUrl] = useParam("avatarUrl");

  const params = useMemo(() => {
    if (id && displayName) {
      return { id, displayName, avatarUrl };
    }
  }, [id, displayName, avatarUrl]);

  return params;
};
