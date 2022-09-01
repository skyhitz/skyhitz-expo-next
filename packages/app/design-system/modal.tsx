import { Modal as NativeModal, ModalProps } from "react-native";
import { tw } from "app/design-system/tailwind";

export function Modal({
  className,
  style,
  ...rest
}: ModalProps & { className?: string }) {
  return <NativeModal style={[tw.style(className), style]} {...rest} />;
}
