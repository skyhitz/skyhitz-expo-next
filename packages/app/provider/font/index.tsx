import React from 'react'
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter'

export const FontProvider = ({ children }: { children: React.ReactNode }) => {
  const [fontsLoaded] = useFonts({
    Inter: Inter_400Regular,
    'Inter-Semibold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
  })

  if (!fontsLoaded) {
    return null
  } else {
    return <>{children}</>
  }
}
