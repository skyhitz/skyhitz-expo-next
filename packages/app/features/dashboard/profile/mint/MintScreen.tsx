import { tw } from "app/design-system/tailwind";
import { FormInputWithIcon } from "app/ui/inputs/FormInputWithIcon";
import InfoIcon from "app/ui/icons/info-circle";
import { Formik, FormikProps } from "formik";
import { MintForm } from "app/types";
import { Button, Text, View } from "app/design-system";
import { Switch } from "react-native";
import DollarIcon from "app/ui/icons/dollar";
import PieChartIcon from "app/ui/icons/pie";
import Slider from "@react-native-community/slider";
import { UploadInputWithIcon } from "app/ui/inputs/UploadInputWithIcon";
import { mintFormSchema, validateArtwork, validateVideo } from "app/validation";
import { useState } from "react";
import { ScrollView } from "app/design-system/ScrollView";
import { useMintNFT } from "app/hooks/useMintNFT";
import { any, equals, not } from "ramda";
import useMediaLibraryPermission from "app/hooks/useMediaLibraryPermission";
import { useRouter } from "solito/router";

export function MintScreen() {
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
  const { back } = useRouter();
  const { mint, retryIndex, progress, status, error } = useMintNFT();
  useMediaLibraryPermission();

  const buttonTitle = () => {
    switch (status) {
      case "Uploading files":
      case "Uploading metadata":
        return `${status} ${progress}%`;
      case "Indexing":
      case "Submitting":
        return status;
      case "IndexError":
        return "Retry Indexing";
      default:
        return "Mint";
    }
  };

  const initialValues: MintForm = {
    artist: "",
    title: "",
    description: "",
    availableForSale: false,
    price: "",
    equityForSale: 1,
  };

  if (status === "Success") {
    return (
      <View className="flex-1 bg-blue-dark p-5 w-full items-center">
        <Text className="text-lightGreen text-lg mb-5">
          New NFT Minted Successfully!
        </Text>
        <Button text="Back" size="large" variant="secondary" onPress={back} />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-blue-dark px-5 w-full max-w-6xl mx-auto">
      <Formik
        initialValues={initialValues}
        validationSchema={mintFormSchema}
        validateOnMount={false}
        onSubmit={(values) => {
          if (status === "IndexError") {
            retryIndex();
          } else if (imageBlob && videoBlob) {
            mint(values, imageBlob, videoBlob);
          }
        }}
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
              icon={InfoIcon}
              value={values.artist}
              onChangeText={handleChange("artist")}
              placeholder="Artist"
              error={errors.artist}
            />
            <FormInputWithIcon
              containerClassNames="border-b border-white"
              icon={InfoIcon}
              value={values.title}
              onChangeText={handleChange("title")}
              placeholder="Title"
              error={errors.title}
            />
            <FormInputWithIcon
              containerClassNames="border-b border-white"
              icon={InfoIcon}
              value={values.description}
              onChangeText={handleChange("description")}
              placeholder="Description"
              error={errors.description}
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
                    Equity for Sale: {values.equityForSale}%
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
            <UploadInputWithIcon
              containerClassNames="border-b border-white"
              icon={InfoIcon}
              label="Artwork"
              type="image"
              onUploadFinished={setImageBlob}
              validateFile={validateArtwork}
              onClear={() => setImageBlob(null)}
              success={imageBlob !== null}
            />
            <UploadInputWithIcon
              containerClassNames="border-b border-white"
              icon={InfoIcon}
              label="Media File"
              type="video"
              onUploadFinished={setVideoBlob}
              validateFile={validateVideo}
              onClear={() => setVideoBlob(null)}
              success={videoBlob !== null}
            />
            <View className="flex flex-row py-5 items-center border-b border-white">
              <Text className="mx-4 text-sm">
                Only original video music related material will be uploaded. We
                take copyright law very seriously. Maximum file size allowed:
                100MB
              </Text>
            </View>
            <View className="flex md:flex-row justify-center items-center mt-5">
              <Button
                text={buttonTitle()}
                size="large"
                onPress={handleSubmit}
                className="mb-5 md:mb-0 md:mr-5"
                disabled={
                  !isValid ||
                  not(
                    any(equals(status), [
                      "Uninitialized",
                      "Error",
                      "IndexError",
                    ])
                  ) ||
                  !videoBlob ||
                  !imageBlob
                }
              />
              <Button
                text="Cancel"
                size="large"
                variant="secondary"
                onPress={back}
              />
            </View>
            {error !== null && (
              <Text className="mt-5 text-red text-center">{error}</Text>
            )}
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}
