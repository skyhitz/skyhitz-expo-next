import { ToastProvider } from "react-native-toast-notifications";
import { ReactElement } from "react";
import { Toast } from "app/ui/toast";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SkyhitzToastProvider({
  children,
}: {
  children: ReactElement;
}) {
  const { top } = useSafeAreaInsets();
  return (
    <ToastProvider placement="top" renderToast={Toast} offsetTop={top}>
      {children}
    </ToastProvider>
  );
}
