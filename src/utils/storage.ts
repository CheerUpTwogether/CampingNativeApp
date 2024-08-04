import AsyncStorage from "@react-native-async-storage/async-storage";

export const setStorage = async (key: string, value: any) => {
  return await AsyncStorage.setItem(key, JSON.stringify(value));
};

export const getStorage = async (key: string) => {
  const res = await AsyncStorage.getItem(key);
  return res ? JSON.parse(res) : "";
};

export const removeStorage = async (key: string) => {
  return await AsyncStorage.removeItem(key);
};
