import { ComponentProps } from 'react'
import { Text as DripsyText, Theme } from 'dripsy'

import { tw as tailwind } from 'app/design-system/tailwind'

type Variant = keyof Theme['text']

type TextProps = { tw?: string; variant?: Variant } & Omit<
  ComponentProps<typeof DripsyText>,
  'variant'
>

function Text({ tw, sx, variant, ...props }: TextProps) {
  return (
    <DripsyText
      sx={{ ...sx, ...tailwind.style(tw) }}
      variant={variant}
      {...props}
    />
  )
}

export { Text }
