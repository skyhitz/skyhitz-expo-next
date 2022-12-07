import { Entry, EntryHolder } from "app/api/graphql";
import { Button } from "app/design-system";
import { useState, useMemo } from "react";
import { useRecoilValue } from "recoil";
import { userAtom } from "app/state/user";
import { compose, map, prop, sum, filter } from "ramda";
import { CreateOfferModal } from "./CreateOfferModal";
import { ComponentAuthGuard } from "app/utils/authGuard";

type Props = {
  offerId: string;
  entry: Entry;
  holders?: EntryHolder[] | null;
};

export function CreateOfferBtn({ offerId, entry, holders }: Props) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const user = useRecoilValue(userAtom);

  const totalBalance = useMemo(() => {
    return holders ? sum(map(compose(parseInt, prop("balance")), holders)) : 1;
  }, [holders]);

  const currentUserHolder = useMemo(() => {
    return holders
      ? filter((holder) => holder.account === user?.publicKey, holders)
      : [];
  }, [holders, user]);

  const currentUserBalance = useMemo(() => {
    return sum(map(compose(parseInt, prop("balance")), currentUserHolder));
  }, [currentUserHolder]);

  const maxEquityForSale = (currentUserBalance / totalBalance) * 100;
  const modalText = offerId === "0" ? "Create an offer" : "Modify an offer";

  return (
    <ComponentAuthGuard>
      <Button
        text={modalText}
        className="flex-row-reverse mt-3 mr-1"
        onPress={() => {
          setModalVisible(true);
        }}
        useTouchable
      />
      <CreateOfferModal
        visible={modalVisible}
        entry={entry}
        offerId={offerId}
        maxEquityForSale={maxEquityForSale}
        hideModal={() => {
          setModalVisible(false);
        }}
      />
    </ComponentAuthGuard>
  );
}
