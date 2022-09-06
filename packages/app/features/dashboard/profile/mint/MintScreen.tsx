import { tw } from "app/design-system/tailwind";
import { SafeAreaView } from "app/design-system/safe-area-view";
import { FormInputWithIcon } from "app/ui/inputs/FormInputWithIcon";
import InfoIcon from "app/ui/icons/info-circle";
import { Formik, FormikProps } from "formik";
import { MintForm } from "app/models/MintForm";
import { Text, View } from "app/design-system";
import { Switch } from "react-native";
import DollarIcon from "app/ui/icons/dollar";
import PieChartIcon from "app/ui/icons/pie";
import Slider from "@react-native-community/slider";

export function MintScreen() {
  const initialValues: MintForm = {
    artist: "",
    title: "",
    description: "",
    availableForSale: false,
  };

  return (
    <SafeAreaView
      edges={["top"]}
      className="flex-1 bg-blue-dark px-5 w-full max-w-6xl mx-auto"
    >
      <Formik
        initialValues={initialValues}
        //   validationSchema={editProfileFormSchema}
        validateOnMount={true}
        onSubmit={() => {}}
      >
        {({
          values,
          handleChange,
          setFieldValue,
          isValid,
          handleSubmit,
          errors,
        }: FormikProps<MintForm>) => (
          <View>
            <FormInputWithIcon
              containerClassNames="border-b border-white"
              icon={<InfoIcon size={24} color={tw.color("white")} />}
              value={values.artist}
              onChangeText={handleChange("artist")}
              placeholder="Artist"
            />
            <FormInputWithIcon
              containerClassNames="border-b border-white"
              icon={<InfoIcon size={24} color={tw.color("white")} />}
              value={values.title}
              onChangeText={handleChange("title")}
              placeholder="Title"
            />
            <FormInputWithIcon
              containerClassNames="border-b border-white"
              icon={<InfoIcon size={24} color={tw.color("white")} />}
              value={values.description}
              onChangeText={handleChange("description")}
              placeholder="Description"
            />
            <View className="flex flex-row py-5 items-center border-b border-white">
              <InfoIcon size={24} color={tw.color("white")} />
              <Text className="mx-4 text-sm">Available for Sale:</Text>
              <Switch
                onValueChange={(newValue) =>
                  setFieldValue("availableForSale", newValue)
                }
                value={values.availableForSale}
                trackColor={{
                  false: tw.color("blue-track"),
                  true: tw.color("blue-brand"),
                }}
                thumbColor={tw.color("white")}
                //@ts-ignore
                activeThumbColor={tw.color("white")}
              />
            </View>
            {values.availableForSale && (
              <>
                <FormInputWithIcon
                  containerClassNames="border-b border-white"
                  icon={<DollarIcon size={24} color={tw.color("white")} />}
                  value={values.price?.toString()}
                  onChangeText={(text) =>
                    setFieldValue("price", text.replace(/[^0-9]/g, ""))
                  }
                  placeholder="Price (XLM)"
                  keyboardType="numeric"
                  maxLength={10}
                />
                <View className="flex flex-row py-5 items-center border-b border-white">
                  <PieChartIcon size={24} color={tw.color("white")} />
                  <Text className="mx-4 text-sm w-40">
                    Equity for Sale: {values.equityForSale ?? 0}%
                  </Text>
                  <Slider
                    style={{ flex: 1 }}
                    minimumValue={1}
                    maximumValue={100}
                    value={values.equityForSale}
                    onValueChange={(value: number) => {
                      setFieldValue("equityForSale", value);
                    }}
                    step={1}
                    minimumTrackTintColor={tw.color("blue")}
                    maximumTrackTintColor={tw.color("blue-track")}
                    thumbTintColor={tw.color("white")}
                  />
                </View>
              </>
            )}
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
}
