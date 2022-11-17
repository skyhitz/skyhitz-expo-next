import { tw } from "app/design-system/tailwind";
import { FormInputWithIcon } from "app/ui/inputs/FormInputWithIcon";
import InfoIcon from "app/ui/icons/info-circle";
import { Formik, FormikProps } from "formik";
import { MediaFileInfo, MintForm } from "app/types";
import { Button, Text, View } from "app/design-system";
import { Switch } from "react-native";
import DollarIcon from "app/ui/icons/dollar";
import PieChartIcon from "app/ui/icons/pie";
import { UploadInputWithIcon } from "app/ui/inputs/UploadInputWithIcon";
import { mintFormSchema, validateArtwork, validateVideo } from "app/validation";
import { useEffect, useState } from "react";
import { ScrollView } from "app/design-system/ScrollView";
import { useMintNFT } from "app/hooks/useMintNFT";
import { any, equals, not } from "ramda";
import useMediaLibraryPermission from "app/hooks/useMediaLibraryPermission";
import { useRouter } from "solito/router";
import { useErrorReport } from "app/hooks/useErrorReport";
import { SkyhitzSlider } from "app/ui/SkyhitzSlider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { WalletConnectModal } from "app/ui/modal/WalletConnectModal";

export function MintScreen() {
  const [equityForSale, setEquityForSale] = useState<string>("1");
  const [image, setImage] = useState<MediaFileInfo | null>(null);
  const [video, setVideo] = useState<MediaFileInfo | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [uri, setUri] = useState<string>("");
  const { back } = useRouter();
  const { mint, retryIndex, progress, status, error } = useMintNFT();
  const reportError = useErrorReport();
  useMediaLibraryPermission();

  const buttonTitle = () => {
    switch (status) {
      case "Uploading files":
      case "Uploading metadata":
        return `${status} ${progress}%`;
      case "Indexing":
      case "Submitting":
      case "Sign transaction in your wallet":
      case "Checking for copyrights":
        return status;
      case "IndexError":
        return "Retry Indexing";
      default:
        return "Mint";
    }
  };

  useEffect(() => {
    if (error) {
      reportError(Error(error));
    }
  }, [error]);

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
    <>
      <ScrollView className="flex-1 bg-blue-dark px-5 w-full max-w-6xl mx-auto">
        <Formik
          initialValues={initialValues}
          validationSchema={mintFormSchema}
          validateOnMount={false}
          onSubmit={(values) => {
            if (status === "IndexError") {
              retryIndex();
            } else if (image && video) {
              mint(values, image, video, (newUri) => {
                setUri(newUri);
                setModalVisible(true);
              });
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
                      />
                    </GestureHandlerRootView>
                  </View>
                </>
              )}
              <UploadInputWithIcon
                containerClassNames="border-b border-white"
                icon={InfoIcon}
                label="Artwork"
                type="image"
                onUploadFinished={setImage}
                validateFile={validateArtwork}
                onClear={() => setImage(null)}
                success={image !== null}
              />
              <UploadInputWithIcon
                containerClassNames="border-b border-white"
                icon={InfoIcon}
                label="Media File"
                type="other"
                onUploadFinished={setVideo}
                validateFile={validateVideo}
                onClear={() => setVideo(null)}
                success={video !== null}
              />
              <View className="flex flex-row py-5 items-center border-b border-white">
                <Text className="mx-4 text-sm">
                  Only original video music related material will be uploaded.
                  We take copyright law very seriously. Maximum file size
                  allowed: 100MB
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
                    !image ||
                    !video
                  }
                />
                <Button
                  text="Cancel"
                  size="large"
                  variant="secondary"
                  onPress={back}
                />
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
      <WalletConnectModal
        visible={modalVisible}
        close={() => setModalVisible(false)}
        uri={uri}
      />
    </>
  );
}
