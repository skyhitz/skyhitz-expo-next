import { ComponentProps } from "react"
import { TextInput as DripsyTextInput } from "dripsy"

import { tw as tailwind } from "app/design-system/tailwind"

type TextProps = {
  tw?: string
} & ComponentProps<typeof DripsyTextInput>

function TextInput({ tw, sx, ...props }: TextProps) {
  return (
    <DripsyTextInput
      sx={{ ...sx, ...tailwind.style(tw) }}
      style={{ outlineStyle: "none" } as any}
      {...props}
    />
  )
}

export { TextInput }
