import { ComponentProps } from 'react'
import { TextInput as DripsyTextInput } from 'dripsy'

import { tw as tailwind } from 'app/design-system/tailwind'

export type TextProps = {
  className?: string
} & ComponentProps<typeof DripsyTextInput>

function TextInput({ className, sx, ...props }: TextProps) {
  return (
    <DripsyTextInput
      sx={{ ...sx, ...tailwind.style(className, 'web:outline-none') }}
      {...props}
    />
  )
}

export { TextInput }
