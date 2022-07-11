import { ComponentProps } from 'react'
import { View as DripsyView } from 'dripsy'
import { tw as tailwind } from 'app/design-system/tailwind'

type ViewProps = { tw?: string } & ComponentProps<typeof DripsyView>

function View({ tw, sx, ...props }: ViewProps) {
  return (
    <DripsyView
      sx={{ ...sx, ...tailwind.style(tw) }}
      {...props}
      
    />
  )
}

export { View }