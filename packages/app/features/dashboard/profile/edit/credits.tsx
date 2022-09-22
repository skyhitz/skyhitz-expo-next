import { Modal, Pressable, Text, View } from "app/design-system";
import React, { useState } from "react";
import { SafeAreaView } from "app/design-system/safe-area-view";
import X from "app/ui/icons/x";
import Wallet from "app/ui/icons/wallet";
import Dollar from "app/ui/icons/dollar";
import { tw } from "app/design-system/tailwind";
import { Formik } from "formik";
import { Line } from "app/ui/orSeparator";
import KeyboardAvoidingView from "app/design-system/keyboardAvoidingView";
import { FormInputWithIcon } from "app/ui/inputs/FormInputWithIcon";

type Props = { className?: string };

export function Credits({ className }: Props) {
  const [modalVisible, setModalVisible] = useState(false);

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
                <Text className="w-full mt-16">Current Balance: 0.00</Text>
                <Formik initialValues={{}} onSubmit={console.log}>
                  {({ handleSubmit }) => (
                    <View className="flex w-full">
                      <FormInputWithIcon
                        placeholder="Stellar Address (Without Memo)"
                        icon={Wallet}
                        containerClassNames="py-1 mt-12"
                      />
                      <Line />
                      <FormInputWithIcon
                        placeholder="XML to withdraw"
                        icon={Dollar}
                        containerClassNames="py-1 mt-8"
                      />
                      <Line />
                      <Text className="text-xs leading-none mt-4">
                        Withdraw to Stellar Public Network address only. Don't
                        send if a memo is required, funds will be lost if you
                        send to a wallet that requires a Memo
                      </Text>
                      <Pressable
                        className="btn mx-4 h-10 mt-16"
                        onPress={() => handleSubmit()}
                      >
                        <Text>Withdraw</Text>
                      </Pressable>
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
