import { useRecoilValue } from "recoil";
import { userAtom } from "app/state/user";
import { tw } from "app/design-system/tailwind";
import { SafeAreaView } from "app/design-system/safe-area-view";
import { FormInputWithIcon } from "app/ui/inputs/FormInputWithIcon";
import InfoIcon from "app/ui/icons/info-circle";
import { Formik, FormikProps } from "formik";
import { MintForm } from "app/models/MintForm";

export function MintScreen() {
  const user = useRecoilValue(userAtom)!;

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
          isValid,
          handleSubmit,
          errors,
        }: FormikProps<MintForm>) => (
          <FormInputWithIcon
            icon={<InfoIcon size={24} color={tw.color("white")} />}
            value={values.artist}
            onChangeText={handleChange("artist")}
            placeholder="Artist"
          />
        )}
      </Formik>
    </SafeAreaView>
  );
}
