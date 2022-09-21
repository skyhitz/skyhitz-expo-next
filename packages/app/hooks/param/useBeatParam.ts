import { createParam } from "solito";

export type BeatParam = {
  id: string;
};

const { useParam } = createParam<BeatParam>();

export const useBeatParam = (): string | undefined => {
  const [id] = useParam("id");
  return id;
};
