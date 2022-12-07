import {
  Entry,
  EntryHolder,
  UpdatePricingMutation,
  useUpdatePricingMutation,
} from "app/api/graphql";
import { Button, Modal, Pressable, View, Text, Image } from "app/design-system";
import { tw } from "app/design-system/tailwind";
import { CreateOfferForm } from "app/types";
import X from "app/ui/icons/x";
import DollarIcon from "app/ui/icons/dollar";
import PieChartIcon from "app/ui/icons/pie";
import { ComponentAuthGuard } from "app/utils/authGuard";
import { imageUrlSmall, imageSrc } from "app/utils/entry";
import { createOfferSchema } from "app/validation";
import { Formik, FormikProps } from "formik";
import React, { useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { FormInputWithIcon } from "../inputs/FormInputWithIcon";
import { SkyhitzSlider } from "../SkyhitzSlider";
import { useToast } from "react-native-toast-notifications";
import { useErrorReport } from "app/hooks/useErrorReport";
import { useWalletConnectClient } from "app/provider/WalletConnect";
import { WalletConnectModal } from "app/ui/modal/WalletConnectModal";
import { useRecoilValue } from "recoil";
import { userAtom } from "app/state/user";
import { compose, map, prop, sum, filter } from "ramda";

type Props = {
  entry: Entry;
  holders?: EntryHolder[] | null;
};

type ModalProps = {
  visible: boolean;
  entry: Entry;
  maxEquityForSale: number;
  hideModal: () => void;
};

export function CreateOfferBtn({ entry, holders }: Props) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const user = useRecoilValue(userAtom);

  const totalBalance = holders
    ? sum(map(compose(parseInt, prop("balance")), holders))
    : 1;

  const currentUserHolder = holders
    ? filter((holder) => holder.account === user?.publicKey, holders)
    : [];
  const currentUserBalance = sum(
    map(compose(parseInt, prop("balance")), currentUserHolder)
  );

  const maxEquityForSale = (currentUserBalance / totalBalance) * 100;
  const CreateOfferModal = ({
    visible,
    hideModal,
    entry,
    maxEquityForSale,
  }: ModalProps) => {
    const [equityForSale, setEquityForSale] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string | undefined>();
    const [updatePricing] = useUpdatePricingMutation();
    const toast = useToast();
    const reportError = useErrorReport();
    const { signAndSubmitXdr, session, connect } = useWalletConnectClient();
    const [uri, setUri] = useState<string>("");
    const [walletConnectModalVisible, setWalletConnectModalVisible] =
      useState<boolean>(false);

    const onMutationCompleted = async (data: UpdatePricingMutation) => {
      if (data?.updatePricing?.success) {
        if (data.updatePricing.submitted) {
          setLoading(false);
          hideModal();
          toast.show("You have successfully created an offer", {
            type: "success",
          });
        } else if (data.updatePricing.xdr) {
          setMessage("Sign and submit transaction in your wallet");
          const xdr = data.updatePricing.xdr;

          try {
            let currentSession = session;
            if (!currentSession) {
              currentSession = await connect((newUri) => {
                setUri(newUri);
                setWalletConnectModalVisible(true);
              });
            }
            const response = await signAndSubmitXdr(xdr, currentSession);
            setMessage(undefined);
            setLoading(false);

            const { status } = response as { status: string };
            if (status === "success") {
              hideModal();
              toast.show("You have successfully created an offer", {
                type: "success",
              });
            } else {
              hideModal();
              reportError(
                Error(
                  "Something went wrong during signing and submitting transaction in your wallet."
                )
              );
            }
          } catch (ex) {
            hideModal();
            reportError(ex);
          }
        }
      }
    };

    const initialValues: CreateOfferForm = {
      price: "",
      equityForSale: 1,
    };
    return (
      <>
        <Modal visible={visible} transparent>
          <Pressable
            onPress={() => {
              hideModal();
              setEquityForSale(1);
            }}
            className="flex-1 flex items-center justify-center bg-blue-field/70 w-full p-4"
          >
            <Pressable
              onPress={() => {}}
              className="flex items-center w-full max-w-lg bg-blue-field p-4"
            >
              <Pressable
                className="absolute right-2 top-2 "
                onPress={() => {
                  hideModal();
                  setEquityForSale(1);
                }}
              >
                <X color={tw.color("white")} />
              </Pressable>
              <Text className="text-lg font-bold">Create an offer</Text>
              <View className="flex-row my-4 items-center">
                <Image
                  className="w-10 h-10"
                  uri={entry.imageUrl ? imageUrlSmall(entry.imageUrl) : ""}
                  fallbackUri={entry.imageUrl ? imageSrc(entry.imageUrl) : ""}
                />
                <Text className="ml-2">
                  {entry.title}-{entry.artist}
                </Text>
              </View>
              <Formik
                initialValues={initialValues}
                validationSchema={createOfferSchema}
                validateOnMount={false}
                onSubmit={async (values) => {
                  setLoading(true);
                  try {
                    await updatePricing({
                      variables: {
                        id: entry.id!,
                        equityForSale: (values.equityForSale ?? 0) / 100,
                        price: parseInt(values.price ?? "0", 10) || 0,
                        forSale: true,
                      },
                      onCompleted: onMutationCompleted,
                    });
                  } catch (ex) {
                    setLoading(false);
                    hideModal();
                    reportError(ex);
                  }
                }}
              >
                {({
                  values,
                  setFieldValue,
                  isValid,
                  handleSubmit,
                  errors,
                }: FormikProps<CreateOfferForm>) => (
                  <View>
                    <FormInputWithIcon
                      containerClassNames="flex flex-row py-5 items-center border-b border-white"
                      icon={DollarIcon}
                      value={values.price}
                      onChangeText={(text) =>
                        setFieldValue("price", text.replace(/[^0-9]/g, ""))
                      }
                      placeholder="Price (XLM)"
                      keyboardType="numeric"
                      maxLength={10}
                      error={errors.price}
                    />
                    <View className="flex flex-row py-5 items-center border-b border-white">
                      <PieChartIcon size={24} color={tw.color("white")} />
                      <Text className="mx-4 text-sm w-40">
                        Equity for Sale: {equityForSale}%
                      </Text>
                      <GestureHandlerRootView style={{ flex: 1 }}>
                        <SkyhitzSlider
                          minimumValue={1}
                          maximumValue={maxEquityForSale}
                          value={values.equityForSale ?? 1}
                          onValueChange={(value: number) => {
                            setEquityForSale(
                              Math.max(parseInt(value.toFixed(), 10), 1)
                            );
                          }}
                          onSlidingComplete={(value: number) => {
                            setFieldValue(
                              "equityForSale",
                              Math.max(parseInt(value.toFixed(), 10), 1)
                            );
                            setEquityForSale(
                              Math.max(parseInt(value.toFixed(), 10), 1)
                            );
                          }}
                          key={entry.id}
                        />
                      </GestureHandlerRootView>
                    </View>
                    {message && (
                      <Text className="w-full text-center text-sm my-4 min-h-5">
                        {message}
                      </Text>
                    )}
                    <View className="mt-5">
                      <Button
                        text="Confirm"
                        size="large"
                        onPress={handleSubmit}
                        className="mb-5 md:mb-0 md:mr-5"
                        disabled={!isValid || loading}
                        loading={loading}
                      />
                    </View>
                  </View>
                )}
              </Formik>
            </Pressable>
          </Pressable>
        </Modal>
        <WalletConnectModal
          visible={walletConnectModalVisible}
          close={() => setWalletConnectModalVisible(false)}
          uri={uri}
        />
      </>
    );
  };

  console.log(maxEquityForSale);
  if (!maxEquityForSale) return null;

  return (
    <ComponentAuthGuard>
      <Button
        text="Create/Modify an offer"
        className="flex-row-reverse mt-3 mr-1"
        onPress={() => {
          setModalVisible(true);
        }}
        useTouchable
      />
      <CreateOfferModal
        visible={modalVisible}
        entry={entry}
        maxEquityForSale={maxEquityForSale}
        hideModal={() => {
          setModalVisible(false);
        }}
      />
    </ComponentAuthGuard>
  );
}