export const SecureStorage = {
  save: async (key, value) => {
    await localStorage.setItem(key, value)
  },
  get: async (key) => {
    return await localStorage.getItem(key)
  },
}
