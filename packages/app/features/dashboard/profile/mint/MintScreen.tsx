import { tw } from "app/design-system/tailwind";
import { FormInputWithIcon } from "app/ui/inputs/FormInputWithIcon";
import InfoIcon from "app/ui/icons/info-circle";
import { Formik, FormikProps } from "formik";
import { MintForm } from "app/types";
import { Button, Text, View } from "app/design-system";
import { Alert, Platform, Switch } from "react-native";
import DollarIcon from "app/ui/icons/dollar";
import PieChartIcon from "app/ui/icons/pie";
import Slider from "@react-native-community/slider";
import { UploadInputWithIcon } from "app/ui/inputs/UploadInputWithIcon";
import { ImageInfo } from "expo-image-picker";
import { mintFormSchema } from "app/validation";
import { useEffect, useState } from "react";
import { requestMediaLibraryPermissionsAsync } from "expo-image-picker";
import { useRouter } from "solito/router";
import { ScrollView } from "app/design-system/ScrollView";
import { useMintNFT } from "app/hooks/useMintNFT";
import { any, equals, not } from "ramda";

export function MintScreen() {
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
  const { back } = useRouter();
  const { mint, progress, status, error } = useMintNFT();

  useEffect(() => {
    const getPermissionAsync = async () => {
      const permissions = await requestMediaLibraryPermissionsAsync();
      if (!permissions.granted) {
        Alert.alert(
          "Media Library Permission",
          "We need madia library permissions so you can upload beats!",
          [{ text: "OK", onPress: () => back() }]
        );
      }
    };
    if (Platform.OS !== "web") {
      getPermissionAsync();
    }
  }, [back]);

  const validateArtwork = (image: ImageInfo): string | null => {
    const isPng = image.uri.startsWith("data:image/png");
    if (!isPng) {
      return "Only png files supported!";
    }
    if (image.height !== image.width) {
      return "Only square images supported!";
    }
    if (image.width < 3000) {
      return "Image should be at least 3000px wide!";
    }
    return null;
  };

  const validateVideo = (video: ImageInfo): string | null => {
    const isMp4 = video.uri.startsWith("data:video/mp4");
    if (!isMp4) {
      return "Only mp4 files supported!";
    }
    return null;
  };

  const buttonTitle = () => {
    switch (status) {
      case "Uploading files":
      case "Uploading metadata":
        return `${status} ${progress}%`;
      case "Indexing":
      case "Submitting":
        return status;
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
    equityForSale: 0,
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
          if (imageBlob && videoBlob) {
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
            />
            <UploadInputWithIcon
              containerClassNames="border-b border-white"
              icon={InfoIcon}
              label="Media File"
              type="video"
              onUploadFinished={setVideoBlob}
              validateFile={validateVideo}
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
                  not(any(equals(status), ["Uninitialized", "Error"])) ||
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
