import { ToastOptions } from "react-native-toast-notifications/lib/typescript/toast";
import { Text, View } from "app/design-system";
import X from "app/ui/icons/x";
import { tw } from "app/design-system/tailwind";
import { ReactElement } from "react";
import Check from "app/ui/icons/check";

type SupportedToastTypes = "danger" | "success";

const containerClassNames: Record<SupportedToastTypes | "default", string> = {
  danger: "border-red bg-red-dark",
  success: "border-valid bg-valid-dark",
  default: "",
};

const icons: Record<SupportedToastTypes | "default", ReactElement> = {
  danger: <X color={tw.color("red")} />,
  success: <Check color={tw.color("valid")} />,
  default: <></>,
};

export const Toast: (_toastOptions: ToastOptions) => JSX.Element = (
  toastOptions
) => {
  const type = (toastOptions.type as SupportedToastTypes) ?? "default";

  return (
    <View
      className={`w-80vw h-12 border-[0.5px] flex-row items-center max-w-sm rounded-xl px-2 m-1.5 ${containerClassNames[type]}`}
    >
      {icons[type]}
      <Text className="flex-1 text-sm ml-2">Hellno</Text>
    </View>
  );
};
