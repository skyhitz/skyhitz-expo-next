export const SecureStorage = {
  save: async (key: string, value: string) => {
    await localStorage.setItem(key, value);
  },
  clear: async (key: string) => {
    await localStorage.removeItem(key);
  },
  get: async (key: string) => {
    return await localStorage.getItem(key);
  },
};
