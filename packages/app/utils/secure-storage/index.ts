import * as SecureStore from 'expo-secure-store'

export const SecureStorage = {
  save: async (key, value) => {
    await SecureStore.setItemAsync(key, value)
  },
  get: async (key) => {
    const value = await SecureStore.getItemAsync(key)
    return value
  },
}
