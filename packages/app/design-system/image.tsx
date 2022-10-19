import { useState } from "react";
import { useSx, Image as ImageDripsy } from "dripsy";
import { tw as tailwind } from "app/design-system/tailwind";
import { ActivityIndicator } from "./activityIndicator";
import { View } from "./view";
import { ImageResizeMode } from "react-native";

type ImageProps = {
  className?: string;
  uri: string;
  fallbackUri?: string;
  resizeMode?: ImageResizeMode;
};

export function Image({ className, uri, fallbackUri, resizeMode }: ImageProps) {
  const [currentUri, setCurrentUri] = useState<string>(uri);
  const [loaded, setLoaded] = useState<boolean>(false);
  useSx();

  return (
    <>
      {!loaded && (
        <View className={`${className} items-center justify-center`}>
          <ActivityIndicator />
        </View>
      )}
      <ImageDripsy
        sx={{
          ...{ visibility: loaded ? "visible" : "hidden" },
          ...tailwind.style(className),
        }}
        source={{ uri: currentUri }}
        onLoad={() => {
          setLoaded(true);
        }}
        onError={() => {
          if (fallbackUri && currentUri !== fallbackUri) {
            setCurrentUri(fallbackUri);
          }
        }}
        resizeMode={resizeMode}
      />
    </>
  );
}
