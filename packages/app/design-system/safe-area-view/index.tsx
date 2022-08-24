import { View } from 'app/design-system'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import React, { ForwardedRef } from 'react'
import { ViewProps } from 'app/design-system/view'
import { View as rView } from 'react-native'

export const SafeAreaView = React.forwardRef(function SafeAreaView(
  { className, ...rest }: ViewProps,
  ref: ForwardedRef<rView>
) {
  const insets = useSafeArea()
  return (
    <View
      ref={ref}
      className={`pt-[${insets.top}px] pb-[${insets.bottom}px] ${
        className ?? ''
      }`}
      {...rest}
    />
  )
})
