import React from 'react'
import { Raleway_300Light } from '@expo-google-fonts/raleway'
import {
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from '@expo-google-fonts/inter'

export const FontProvider = ({ children }: { children: React.ReactNode }) => {
  const [fontsLoaded] = useFonts({
    Inter: Inter_400Regular,
    'Inter-Semibold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
  })

  const [ralewayLoaded] = useFonts({
    'Raleway-Light': Raleway_300Light,
  })

  if (!fontsLoaded || !ralewayLoaded) {
    return null
  } else {
    return <>{children}</>
  }
}
