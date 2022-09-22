import { createParam } from "solito";

export type BeatmakerParam = {
  id: string;
};

const { useParam } = createParam<BeatmakerParam>();

export const useBeatmakerParam = (): string | undefined => {
  const [id] = useParam("id");
  return id;
};
