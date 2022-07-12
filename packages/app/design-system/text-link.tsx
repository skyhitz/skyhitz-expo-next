import { ComponentProps } from 'react'
import { TextLink as Text } from 'solito/link'

import { tw as tailwind } from 'app/design-system/tailwind'

type TextProps = { tw?: string } & Omit<ComponentProps<typeof Text>, 'variant'>

function TextLink({ tw, textProps, ...props }: TextProps) {
  return <Text textProps={{ ...textProps, ...tailwind.style(tw) }} {...props} />
}

export { TextLink }
