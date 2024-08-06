import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { ImageBackground, SafeAreaView, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { RootStackParamList } from "../components/router/Router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useStore from "@/store/store";
import Toast from "react-native-toast-message";
import { autoSignInSpb } from "@/supaBase/api/auth";
import { getUserSpb } from "@/supaBase/api/myPage";

const splashScreen = require("@/assets/images/SplashScreen.png");
type SettingsScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const Splash = () => {
  const setUserData = useStore((state) => state.setUserData);
  const navigation = useNavigation<SettingsScreenNavigationProp>();

  const getUserData = async () => {
    try {
      const hasLaunched = await AsyncStorage.getItem("hasLaunched");
      if (hasLaunched === null) {
        await AsyncStorage.setItem("hasLaunched", "true");
        navigation.replace("Intro");
        return;
      }

      // 저장된 정보가 없을 경우
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        navigation.replace("Login");
        return;
      }

      // 자동로그인
      const isSignIn = await autoSignInSpb();

      if (!isSignIn) return;

      // 로그인한 유저 프로필 정보
      const data = await getUserSpb();

      // zustand 전역 상태 관리
      setUserData(data);

      Toast.show({
        type: "success",
        text1: `${data?.nickname} 님 환영합니다 🎉`, // userInfo에서 직접 가져오기
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
