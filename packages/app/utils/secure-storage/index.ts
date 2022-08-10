import * as SecureStore from 'expo-secure-store'

export const SecureStorage = {
  save: async (key: string, value: string) => {
    await SecureStore.setItemAsync(key, value)
  },
  get: async (key: string) => {
    const value = await SecureStore.getItemAsync(key)
    return value
  },
}
