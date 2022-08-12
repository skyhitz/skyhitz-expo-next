import { ComponentProps } from 'react'
import { TextInput as DripsyTextInput } from 'dripsy'
import { Platform } from 'react-native'

import { tw as tailwind } from 'app/design-system/tailwind'

type TextProps = {
  className?: string
} & ComponentProps<typeof DripsyTextInput>

function TextInput({ className, sx, ...props }: TextProps) {
  return (
    <DripsyTextInput
      sx={{ ...sx, ...tailwind.style(className) }}
      style={Platform.OS === 'web' ? ({ outlineStyle: 'none' } as any) : {}}
      {...props}
    />
  )
}

export { TextInput }
