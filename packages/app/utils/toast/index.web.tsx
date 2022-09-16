import { Id, toast as toastWeb } from "react-toastify";
import { Toast, ToastType } from "app/utils/toast/types";
import X from "app/ui/icons/x";
import { tw } from "app/design-system/tailwind";
import Check from "app/ui/icons/check";

const toastTypes: Record<ToastType, (_msg: string) => Id> = {
  error: (msg: string) =>
    toastWeb.error(msg, { icon: <X size={20} color={tw.color("red")} /> }),
  success: (msg: string) =>
    toastWeb.success(msg, {
      icon: <Check size={20} color={tw.color("valid")} />,
    }),
};

export const toast: Toast = (msg, type = "error") => {
  toastTypes[type](msg);
};
