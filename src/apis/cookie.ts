import AsyncStorage from "@react-native-async-storage/async-storage";

// 토큰 저장(첫 로그인)
export const setUserToken = async (key: string, value: any) => {
  return await AsyncStorage.setItem(key, JSON.stringify(value));
};

// 불러오기(자동 로그인)
export const getUserToken = async (key: string) => {
  const res = await AsyncStorage.getItem(key);
  return res ? JSON.parse(res) : "";
};

// 토큰 제거(로그아웃)
export const removeUserToken = async (key: string) => {
  return await AsyncStorage.removeItem(key);
};
