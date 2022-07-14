import { ComponentProps } from 'react'
import { Pressable as DripsyPressable } from 'dripsy'

import { tw as tailwind } from 'app/design-system/tailwind'

type TextProps = { tw?: string } & Omit<
  ComponentProps<typeof DripsyPressable>,
  'variant'
>

function Pressable({ tw, sx, ...props }: TextProps) {
  return <Pressable sx={{ ...sx, ...tailwind.style(tw) }} {...props} />
}

export { Pressable }
