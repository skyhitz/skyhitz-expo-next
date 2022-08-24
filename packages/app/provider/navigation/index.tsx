import { NavigationContainer } from '@react-navigation/native'
import * as Linking from 'expo-linking'
import { useMemo } from 'react'

export function NavigationProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <NavigationContainer
      // TODO: find how to do it right
      // @ts-ignore
      linking={useMemo(
        () => ({
          prefixes: [Linking.createURL('/')],
          config: {
            initialRouteName: 'home',
            screens: {
              home: 'home',
              'user-detail': 'user/:id',
              'sign-in': 'sign-in',
              'sign-up': 'sign-up',
              dashboard: {
                screens: {
                  search: 'dashboard/search',
                  chart: 'dashboard/chart',
                  profile: 'dashboard/profile',
                },
              },
            },
          },
        }),
        []
      )}
    >
      {children}
    </NavigationContainer>
  )
}
