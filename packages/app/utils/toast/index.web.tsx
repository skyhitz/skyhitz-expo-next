import {
  Id,
  toast as toastWeb,
  ToastContent,
  ToastOptions,
} from "react-toastify";
import { Toast, ToastType } from "app/utils/toast/types";

const toastTypes: Record<
  ToastType,
  (content: ToastContent, options?: ToastOptions | undefined) => Id
> = {
  error: toastWeb.error,
  success: toastWeb.success,
};

export const toast: Toast = (msg, type = "error") => {
  toastTypes[type](msg);
};
