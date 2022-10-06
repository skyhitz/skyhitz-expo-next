import { useToast } from "react-native-toast-notifications";
import { ErrorType } from "app/types";
import { useCallback } from "react";

export function useErrorReport() {
  const toast = useToast();
  const reportError = useCallback(
    (e: any, defaultMessage: string = "UnknownError") => {
      console.error(e);
      let message: string = defaultMessage;
      const err = e as ErrorType;
      if (err.message) {
        message = err.message;
      }
      toast.show(message, { type: "danger" });
    },
    [toast]
  );

  return reportError;
}
