import { ComponentProps } from 'react'
import { Pressable as DripsyPressable } from 'dripsy'

import { tw as tailwind } from 'app/design-system/tailwind'

type TextProps = { tw?: string } & ComponentProps<typeof DripsyPressable>

function Pressable({ tw, sx, ...props }: TextProps) {
  return <DripsyPressable sx={{ ...sx, ...tailwind.style(tw) }} {...props} />
}

export { Pressable }
