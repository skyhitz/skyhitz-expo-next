import { ComponentProps } from 'react'
import { ActivityIndicator as DripsyActivityIndicator } from 'dripsy'

import { tw as tailwind } from 'app/design-system/tailwind'

type TextProps = { tw?: string } & ComponentProps<
  typeof DripsyActivityIndicator
>

function ActivityIndicator({ tw, sx, ...props }: TextProps) {
  return (
    <DripsyActivityIndicator sx={{ ...sx, ...tailwind.style(tw) }} {...props} />
  )
}

export { ActivityIndicator }
