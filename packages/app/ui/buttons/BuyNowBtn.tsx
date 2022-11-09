import { Entry, UserCollectionDocument } from "app/api/graphql";
import { Button } from "app/design-system";

import { ComponentAuthGuard } from "app/utils/authGuard";
import { useEntryOffer, getEntryOfferUrl } from "app/hooks/useEntryOffer";
import { useState } from "react";
import { PaymentConfirmationModal } from "app/ui/modal/PaymentConfirmationModal";
import { useApolloClient } from "@apollo/client";
import { prepend } from "ramda";
import { useRecoilValue } from "recoil";
import { userAtom } from "app/state/user";
import { useSWRConfig } from "swr";
import { Platform } from "react-native";

type Props = {
  entry: Entry;
};

export function BuyNowBtn({ entry }: Props) {
  const price = useEntryOffer(entry.code!, entry.issuer!);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { cache } = useApolloClient();
  const user = useRecoilValue(userAtom);
  const { mutate } = useSWRConfig();

  if (!price || Platform.OS === "ios") {
    return null;
  }

  return (
    <ComponentAuthGuard>
      <Button
        text="Buy Now"
        className="flex-row-reverse"
        onPress={() => {
          setModalVisible(true);
        }}
        useTouchable
      />
      <PaymentConfirmationModal
        visible={modalVisible}
        entry={entry}
        price={price.price}
        equityForSale={price.amount}
        hideModal={(success: boolean) => {
          setModalVisible(false);
          if (success) {
            mutate(getEntryOfferUrl(entry.code!, entry.issuer!));

            cache.updateQuery(
              {
                query: UserCollectionDocument,
                variables: { userId: user?.id },
                overwrite: true,
              },
              (cachedData) => ({
                userEntries: prepend(entry, cachedData?.userEntries ?? []),
              })
            );
          }
        }}
      />
    </ComponentAuthGuard>
  );
}
