import T, { ToastOptions } from "react-native-root-toast";
import { tw } from "app/design-system/tailwind";
import { Toast, ToastType } from "app/utils/toast/types";

const toastTypes: Record<ToastType, ToastOptions> = {
  error: {
    textColor: tw.color("red"),
  },
  success: {
    textColor: tw.color("valid"),
  },
};

const toast: Toast = (msg, type = "error") => {
  T.show(msg, {
    position: T.positions.BOTTOM,
    ...toastTypes[type],
  });
};

export default toast;
