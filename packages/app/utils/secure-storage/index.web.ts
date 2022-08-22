export const SecureStorage = {
  save: async (key, value) => {
    await localStorage.setItem(key, value);
  },
  clear: async (key: string) => {
    await localStorage.removeItem(key)
  },
  get: async (key) => {
    return await localStorage.getItem(key);
  },
};
