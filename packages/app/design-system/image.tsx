"use client";

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
        <View
          className={`${className} items-center justify-center absolute z-10`}
        >
          <ActivityIndicator />
        </View>
      )}
      <ImageDripsy
        sx={{
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
