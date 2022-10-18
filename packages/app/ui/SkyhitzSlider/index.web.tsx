import Slider from "@react-native-community/slider";
import { tw } from "app/design-system/tailwind";

type Props = {
  minimumValue: number;
  maximumValue: number;
  value: number;
  onSlidingStart?: () => void;
  onValueChange?: (newValue: number) => void;
  onSlidingComplete?: (newValue: number) => void;
};

export function SkyhitzSlider(props: Props) {
  return (
    <Slider
      style={{ flex: 1 }}
      minimumTrackTintColor={tw.color("blue")}
      maximumTrackTintColor={tw.color("blue-track")}
      thumbTintColor={tw.color("white")}
      {...props}
    />
  );
}
