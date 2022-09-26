import { Button, Modal, Pressable, Text, View } from "app/design-system";
import React, { useState } from "react";
import { SafeAreaView } from "app/design-system/safe-area-view";
import X from "app/ui/icons/x";
import Wallet from "app/ui/icons/wallet";
import Dollar from "app/ui/icons/dollar";
import { tw } from "app/design-system/tailwind";
import { Formik, FormikProps } from "formik";
import { Line } from "app/ui/orSeparator";
import KeyboardAvoidingView from "app/design-system/keyboardAvoidingView";
import { FormInputWithIcon } from "app/ui/inputs/FormInputWithIcon";
import { usePaymentsInfoQuery } from "app/api/graphql";
import { WithdrawForm } from "app/types";
import { withdrawFormSchema } from "app/validation";

type Props = { className?: string };

export function WithdrawCredits({ className }: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const { data: paymentInfoData } = usePaymentsInfoQuery();

  const initialValues: WithdrawForm = {
    address: "",
    amount: 0,
  };

  return (
    <View className={className}>
      <Text className="font-bold text-sm">Credits</Text>
      <Pressable
        onPress={() => setModalVisible(true)}
        className="btn w-52 h-10 mt-4"
      >
        <Text>Withdraw</Text>
      </Pressable>
      <Modal visible={modalVisible} transparent>
        <KeyboardAvoidingView behavior="padding" className="flex-1">
          <SafeAreaView className="flex-1 flex items-center justify-center bg-blue-field/70 px-2">
            <View className="flex items-center w-full max-w-lg bg-blue-field p-4">
              <Pressable
                className="absolute right-2 top-2 "
                onPress={() => setModalVisible(false)}
              >
                <X color={tw.color("white")} />
              </Pressable>
              <View className="w-72 flex items-center">
                <Text>Withdraw credits</Text>
                <Text className="w-full mt-16">
                  Current Balance:{" "}
                  {paymentInfoData?.paymentsInfo?.credits ?? "0.00"}
                </Text>
                <Formik
                  initialValues={initialValues}
                  onSubmit={console.log}
                  validationSchema={withdrawFormSchema(
                    paymentInfoData?.paymentsInfo?.credits ?? 1
                  )}
                >
                  {({
                    handleSubmit,
                    values,
                    handleChange,
                    isValid,
                    errors,
                    setFieldValue,
                  }: FormikProps<WithdrawForm>) => (
                    <View className="flex w-full items-center">
                      <FormInputWithIcon
                        value={values.address}
                        placeholder="Stellar Address (Without Memo)"
                        icon={Wallet}
                        containerClassNames="py-1 mt-12 w-full"
                        onChangeText={handleChange("address")}
                      />
                      <Line />
                      <FormInputWithIcon
                        value={
                          values.amount > 0 ? values.amount.toString() : ""
                        }
                        placeholder="XML to withdraw"
                        icon={Dollar}
                        containerClassNames="py-1 mt-8 w-full"
                        onChangeText={(text) => {
                          if (text === "") {
                            setFieldValue("amount", 0);
                          }
                          const num = parseInt(text.replace(/[^0-9]/g, ""), 10);
                          if (!isNaN(num)) {
                            setFieldValue("amount", num);
                          }
                        }}
                      />
                      {errors.address || errors.amount ? (
                        <Text className="w-full text-center text-sm text-[#d9544f] my-4 min-h-5">
                          {errors.address || errors.amount || " "}
                        </Text>
                      ) : null}

                      <Line />
                      <Text className="text-xs leading-none my-4">
                        Withdraw to Stellar Public Network address only. Don't
                        send if a memo is required, funds will be lost if you
                        send to a wallet that requires a Memo
                      </Text>
                      <Line />
                      <Text className="text-xs leading-none my-4">
                        We collect a transaction fee that equals 6% of the
                        withdrawal amount.
                      </Text>
                      <Line />
                      <Text className="text-sm leading-none my-4">
                        Withdrawal fee:{" "}
                        {(values.amount * 0.06).toFixed(6).toString()} XLM
                      </Text>

                      <Button
                        text="Withdraw"
                        onPress={handleSubmit}
                        disabled={!isValid}
                      />
                    </View>
                  )}
                </Formik>
              </View>
            </View>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}
