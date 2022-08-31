import { useEffect, useState } from "react";
import { insert, join, pipe, remove } from "ramda";
import { Text, View } from "app/design-system";
import { tw } from "app/design-system/tailwind";

export function TextEllipsis({ text }: { text: string }) {
  const [wrapperWidth, setWrapperWidth] = useState(0);
  const [displayedText, setDisplayedText] = useState("A");
  const [charLength, setCharLength] = useState(0);

  useEffect(() => {
    if (!charLength || !wrapperWidth) return;
    const availableTextLength = wrapperWidth / charLength;
    if (availableTextLength >= text.length) {
      setDisplayedText(text);
      return;
    }

    const lengthToCut = text.length - availableTextLength + 2;
    const cutStart = Math.round(text.length / 2 - lengthToCut / 2);
    const cutText = pipe(
      remove<string>(cutStart, lengthToCut),
      insert(cutStart, "..."),
      join("")
    );
    setDisplayedText(cutText([...text]));
  }, [charLength, wrapperWidth, setDisplayedText, text]);

  return (
    <View
      className="flex-1 flex-row ml-2.5"
      onLayout={(e) => {
        setWrapperWidth(e.nativeEvent.layout.width);
      }}
    >
      <Text
        style={tw.style("text-xs font-bold")}
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
