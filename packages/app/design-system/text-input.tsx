import { ComponentProps } from 'react'
import { TextInput as DripsyTextInput } from 'dripsy'

import { tw as tailwind } from 'app/design-system/tailwind'

export type TextProps = {
  className?: string
} & ComponentProps<typeof DripsyTextInput>

function TextInput({ className, sx, style ,...props }: TextProps) {
  const hideOutline = tailwind.prefixMatch("web") ? {outlineStyle: 'none'} : {}
  return (
    <DripsyTextInput
      sx={{ ...sx, ...tailwind.style(className), ...hideOutline}}
      {...props}
    />
  )
}

export { TextInput }
