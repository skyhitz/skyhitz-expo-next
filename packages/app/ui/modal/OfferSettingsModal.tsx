import { Entry } from "app/api/graphql";
import { Button, Modal, Pressable, View, Text, Image } from "app/design-system";
import X from "app/ui/icons/x";
import DollarIcon from "app/ui/icons/dollar";
import PieChartIcon from "app/ui/icons/pie";
import { tw } from "app/design-system/tailwind";
import { Formik, FormikProps } from "formik";
import { FormInputWithIcon } from "app/ui/inputs/FormInputWithIcon";
import { createOfferSchema } from "app/validation";
import { CreateOfferForm } from "app/types";
import { SkyhitzSlider } from "app/ui/SkyhitzSlider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { imageSrc, imageUrlSmall } from "app/utils/entry";
import { useState } from "react";

type Props = {
  visible: boolean;
  entry: Entry;
  hideModal: (success: boolean) => void;
};

export function OfferSettingsModal({ visible, hideModal, entry }: Props) {
  const [equityForSale, setEquityForSale] = useState<string>("1");

  const initialValues: CreateOfferForm = {
    price: "",
    equityForSale: 1,
  };

  return (
    <>
      <Modal visible={visible} transparent>
        <Pressable
          onPress={() => hideModal(false)}
          className="flex-1 flex items-center justify-center bg-blue-field/70 w-full p-4"
        >
          <Pressable
            onPress={() => {}}
            className="flex items-center w-full max-w-lg bg-blue-field p-4"
          >
            <Pressable
              className="absolute right-2 top-2 "
              onPress={() => hideModal(false)}
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
              onSubmit={(_) => {}}
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
                        maximumValue={100}
                        value={values.equityForSale ?? 1}
                        onValueChange={(value: number) => {
                          setEquityForSale(value.toFixed());
                        }}
                        onSlidingComplete={(value: number) => {
                          setFieldValue(
                            "equityForSale",
                            parseInt(value.toFixed(), 10)
                          );
                          setEquityForSale(value.toFixed());
                        }}
                        key={entry.id}
                      />
                    </GestureHandlerRootView>
                  </View>
                  <View className="mt-5">
                    <Button
                      text="Confirm"
                      size="large"
                      onPress={handleSubmit}
                      className="mb-5 md:mb-0 md:mr-5"
                      disabled={!isValid}
                    />
                  </View>
                </View>
              )}
            </Formik>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}
