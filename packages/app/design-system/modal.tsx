import {
  Modal as NativeModal,
  ModalProps as NativeModalProps,
} from "react-native";
import { tw } from "app/design-system/tailwind";
import { useSx } from "dripsy";

export type ModalProps = NativeModalProps & { className?: string };

export function Modal({ className, style, ...rest }: ModalProps) {
  useSx();
  return <NativeModal style={[tw.style(className), style]} {...rest} />;
}
