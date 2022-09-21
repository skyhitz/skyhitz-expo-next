import { useToast } from "react-native-toast-notifications";
import { ErrorType } from "app/types";
import { useCallback } from "react";

export default function useErrorReport() {
  const toast = useToast();
  const reportError = useCallback(
    (e: any) => {
      console.error(e);
      const err = e as ErrorType;
      toast.show(err ? err.message : "UnknownError", { type: "danger" });
    },
    [toast]
  );

  return reportError;
}
