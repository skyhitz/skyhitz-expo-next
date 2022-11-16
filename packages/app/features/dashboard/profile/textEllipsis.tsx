import { useEffect, useState } from "react";
import { insert, join, max, pipe, remove, split } from "ramda";
import { Text, View } from "app/design-system";

const textEllipsisLength = 3;

type Props = {
  text: string;
  className?: string;
  containerClassName?: string;
  minCharLength?: number;
};

export function TextEllipsis({
  text,
  className = "",
  containerClassName = "",
  minCharLength = 8,
}: Props) {
  const [wrapperWidth, setWrapperWidth] = useState(0);
  const [displayedText, setDisplayedText] = useState(text);
  const [charLength, setCharLength] = useState(0);

  useEffect(() => {
    if (!charLength || !wrapperWidth) return;
    const availableTextLength = Math.floor(wrapperWidth / charLength);
    if (availableTextLength >= text.length) {
      setDisplayedText(text);
      return;
    }

    const lengthToCut = text.length - availableTextLength + textEllipsisLength;
    const cutStart = Math.round(
      Math.floor(text.length / 2) - Math.ceil(lengthToCut / 2)
    );
    const cutText = pipe(
      split(""),
      remove(cutStart, lengthToCut),
      insert(cutStart, "..."),
      join("")
    );
    setDisplayedText(cutText(text));
  }, [charLength, wrapperWidth, setDisplayedText, text]);

  return (
    <View
      className={`flex-1 flex-row h-3 ${containerClassName}`}
      onLayout={(e) => {
        if (!wrapperWidth && e.nativeEvent.layout.width) {
          setWrapperWidth(e.nativeEvent.layout.width);
        }
      }}
    >
      <Text
        className={`text-xs font-bold absolute leading-5 ${className}`}
        onLayout={(e) => {
          if (charLength) return;
          setCharLength(
            max(
              e.nativeEvent.layout.width / displayedText.length,
              minCharLength
            )
          );
        }}
      >
        {displayedText}
      </Text>
    </View>
  );
}
