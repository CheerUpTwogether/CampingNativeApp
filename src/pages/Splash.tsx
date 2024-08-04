import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { RootStackParamList } from "../components/router/Router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addLoginApi } from "@/apis/account";
import { getUserApi } from "@/apis/myPage";
import useStore from "@/store/store";
import Toast from "react-native-toast-message";

const splashScreen = require("@/assets/images/SplashScreen.png");
type SettingsScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const Splash = () => {
  const setUserData = useStore((state) => state.setUserData);
  const navigation = useNavigation<SettingsScreenNavigationProp>();

  const getUserData = async () => {
    try {
      // 저장된 정보가 없을 경우
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        navigation.replace("Login");
        return;
      }

      // 로그인 재시도...?
      // password 저장을 암호화 없이 하면 위험하지 않을까용...?
      const { email, password } = JSON.parse(userData);
      const data = await addLoginApi({ email, password });
      if (!data.success) return;

      // 로그인 api 성공 시 수행 로직
      const userInfo = await getUserApi();
      setUserData(userInfo);
      Toast.show({
        type: "success",
        text1: `${userInfo?.result?.nickName} 님 환영합니다 🎉`, // userInfo에서 직접 가져오기
      });

      navigation.replace("BottomTab");
    } catch (e) {}
  };

  useEffect(() => {
    setTimeout(() => {
      getUserData();
    }, 500);
  }, []);

  return (
    <SafeAreaView style={styles.wrapper}>
      <ImageBackground style={styles.backgroundImage} source={splashScreen} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Splash;
