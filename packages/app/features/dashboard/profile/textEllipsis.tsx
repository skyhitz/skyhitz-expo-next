import { useEffect, useState } from "react";
import { insert, join, pipe, remove, split } from "ramda";
import { Text, View } from "app/design-system";

const textEllipsisLength = 2;

export function TextEllipsis({ text }: { text: string }) {
  const [wrapperWidth, setWrapperWidth] = useState(0);
  const [displayedText, setDisplayedText] = useState(text);
  const [charLength, setCharLength] = useState(0);

  useEffect(() => {
    if (!charLength || !wrapperWidth) return;
    const availableTextLength = wrapperWidth / charLength;
    if (availableTextLength >= text.length) {
      setDisplayedText(text);
      return;
    }

    const lengthToCut = text.length - availableTextLength + textEllipsisLength;
    const cutStart = Math.round(text.length / 2 - lengthToCut / 2);
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
      className="flex-1 mx-2.5 flex-row h-3"
      onLayout={(e) => {
        setWrapperWidth(e.nativeEvent.layout.width);
      }}
    >
      <Text
        className="text-xs font-bold absolute leading-5"
        onLayout={(e) => {
          if (charLength) return;
          setCharLength(e.nativeEvent.layout.width / displayedText.length);
        }}
      >
        {displayedText}
      </Text>
    </View>
  );
}
