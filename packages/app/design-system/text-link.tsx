import { ComponentProps } from 'react'
import { TextLink as Text } from 'solito/link'

import { tw as tailwind } from 'app/design-system/tailwind'
import { theme } from 'app/design-system/theme'

type TextProps = { tw?: string } & Omit<ComponentProps<typeof Text>, 'variant'>

function TextLink({ tw, textProps, ...props }: TextProps) {
  return (
    <Text  textProps={{ ...textProps, style: { color: theme.text.a.color, ...tailwind.style(tw)} }} {...props} />
  )
}

export { TextLink }
