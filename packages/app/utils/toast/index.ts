import T from "react-native-root-toast";
import { tw } from "app/design-system/tailwind";
import { Toast, ToastType } from "app/utils/toast/types";

const toastContainerStyle: Record<ToastType, string> = {
  error: "border-red",
  success: "border-valid",
};

export const toast: Toast = (msg, type = "error") => {
  T.show(msg, {
    containerStyle: tw`bg-blue-dark border ${toastContainerStyle[type]}`,
    opacity: 100,
    position: T.positions.BOTTOM,
  });
};
