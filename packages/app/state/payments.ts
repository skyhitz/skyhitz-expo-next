import { paymentsBackend } from '../api/payments';
import { entriesBackend } from '../api/entries';
import { Config } from '../config';
import { atom, useRecoilState } from 'recoil';

const subscribedAtom = atom<boolean>({
  key: 'subscribed',
  default: false,
});
const subscriptionLoadedAtom = atom<boolean>({
  key: 'subscriptionLoaded',
  default: false,
});
const creditsAtom = atom<number>({
  key: 'credits',
  default: 0,
});
const submittingSubscriptionAtom = atom<boolean>({
  key: 'submittingSubscription',
  default: false,
});
const submittingWithdrawAtom = atom<boolean>({
  key: 'submittingWithdraw',
  default: false,
});
const loadingBalanceAtom = atom<boolean>({
  key: 'loadingBalance',
  default: false,
});
const xlmPriceAtom = atom<number>({
  key: 'xlmPrice',
  default: 0,
});
const entryPricesAtom = atom<Map<string, { price: number; amount: number }>>({
  key: 'entryPrices',
  default: new Map(),
});

export const PaymentsStore = () => {
  const [submittingSubscription, setSubmittingSubscription] = useRecoilState(
    submittingSubscriptionAtom
  );
  const [subscribed, setSubscribed] = useRecoilState(subscribedAtom);
  const [loadingBalance, setLoadingBalance] = useRecoilState(
    loadingBalanceAtom
  );
  const [credits, setCredits] = useRecoilState(creditsAtom);
  const [subscriptionLoaded, setSubscriptionLoaded] = useRecoilState(
    subscriptionLoadedAtom
  );
  const [submittingWithdraw, setSubmittingWithdraw] = useRecoilState(
    submittingWithdrawAtom
  );
  const [xlmPrice, setXlmPrice] = useRecoilState(xlmPriceAtom);
  const [entryPrices, setEntryPrices] = useRecoilState(entryPricesAtom);

  const subscribeUser = async (cardToken: string) => {
    setSubmittingSubscription(true);
    await paymentsBackend.subscribe(cardToken);
    setSubmittingSubscription(false);
    setSubscribed(true);
    return true;
  };

  const buyCredits = async (cardToken: string, amount: number) => {
    setSubmittingSubscription(true);
    await paymentsBackend.buyCredits(cardToken, amount);
    setSubmittingSubscription(false);
    setSubscribed(true);
    return true;
  };

  const refreshSubscription = async () => {
    setLoadingBalance(true);
    let { subscribed, credits } = await paymentsBackend.refreshSubscription();
    setSubscribed(subscribed);
    setCredits(credits);
    setSubscriptionLoaded(true);
    setLoadingBalance(false);
  };

  const withdrawToExternalWallet = async (
    withdrawAddress: string,
    creditsToWithdraw: number
  ) => {
    setSubmittingWithdraw(true);
    await paymentsBackend.withdrawToExternalWallet(
      withdrawAddress,
      creditsToWithdraw
    );
    await refreshSubscription();
    setSubmittingWithdraw(false);
  };

  const buyEntry = async (id: string, amount: number, price: number) => {
    return await entriesBackend.buyEntry(id, amount, price);
  };

  const getPriceInfo = (id: string) => {
    return entriesBackend.getPriceInfo(id);
  };

  const xlmPriceWithFees = () => {
    return xlmPrice * 1.06;
  };

  const refreshXLMPrice = async () => {
    const price = await paymentsBackend.getXLMPrice();

    setXlmPrice(parseFloat(price));
  };

  const fetchPriceFromHorizon = async (code: string, issuer: string) => {
    let { asks } = await fetch(
      `${Config.HORIZON_URL}/order_book?selling_asset_type=credit_alphanum12&selling_asset_code=${code}&selling_asset_issuer=${issuer}&buying_asset_type=native`
    ).then((res: any) => res.json());

    if (asks && asks[0]) {
      let { price, amount }: { price: string; amount: string } = asks[0];
      return { price: parseFloat(price), amount: parseFloat(amount) };
    }

    return null;
  };

  const fetchAndCachePrice = async (code: string, issuer: string) => {
    const identifier = `${code}-${issuer}`;
    const val = entryPrices.get(identifier);
    if (val) {
      return val;
    }
    const newval = await fetchPriceFromHorizon(code, issuer);
    if (newval) {
      setEntryPrices((oldValue) => oldValue.set(identifier, newval));
      return newval;
    }
    return { price: 0, amount: 0 };
  };

  return {
    fetchAndCachePrice,
    fetchPriceFromHorizon,
    refreshXLMPrice,
    xlmPriceWithFees,
    getPriceInfo,
    buyEntry,
    withdrawToExternalWallet,
    refreshSubscription,
    buyCredits,
    subscribeUser,
    entryPrices,
    xlmPrice,
    submittingSubscription,
    submittingWithdraw,
    subscriptionLoaded,
    credits,
    loadingBalance,
    subscribed,
    setLoadingBalance,
    setSubmittingSubscription,
  };
};
