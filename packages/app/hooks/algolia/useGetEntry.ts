import { entriesIndex } from "app/api/algolia";
import { Entry } from "app/api/graphql";
import { isEmpty } from "ramda";
import { useEffect, useState } from "react";

type Props = {
  id: string;
  skip?: boolean;
};

type Result = {
  entry?: Entry;
};

export function useGetEntry({ id, skip }: Props): Result {
  const [entry, setEntry] = useState<Entry | undefined>();

  useEffect(() => {
    const getEntry = async () => {
      const res = await entriesIndex.search("", {
        filters: `id:${id}`,
      });

      if (!isEmpty(res.hits)) {
        const first = res.hits[0] as unknown as Entry;
        setEntry(first);
      }
    };
    if (!skip) {
      getEntry();
    }
  }, [skip]);

  return { entry };
}
