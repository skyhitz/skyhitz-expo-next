import { ComponentProps } from 'react'
import { Text as DripsyText, Theme, useSx } from 'dripsy'

import { tw as tailwind } from 'app/design-system/tailwind'

type Variant = keyof Theme['text']

type TextProps = { className?: string; variant?: Variant } & Omit<
  ComponentProps<typeof DripsyText>,
  'variant'
>

function Text({ className, sx, variant, ...props }: TextProps) {
  useSx()
  return (
    <DripsyText
      sx={{ ...sx, ...tailwind.style(className) }}
      variant={variant}
      {...props}
    />
  )
}

export { Text }
