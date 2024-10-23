import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useStore from "@/store/store";
import Toast from "react-native-toast-message";
import { autoSignInSpb } from "@/supaBase/api/auth";
import { getUserSpb } from "@/supaBase/api/myPage";
import { SettingsScreenNavigationProp } from "@/types/route";
import Icon from "@/assets/icons/logo.svg";

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
      const token = await AsyncStorage.getItem("session_token");
      if (!token) {
        navigation.replace("Login");
        return;
      }

      // 자동로그인
      const isSignIn = await autoSignInSpb();

      if (!isSignIn) {
        navigation.replace("Login");
        return;
      }

      // 로그인한 유저 프로필 정보
      const data = await getUserSpb();

      // zustand 전역 상태 관리
      setUserData(data);

      if (!data?.nickname) {
        navigation.replace("Login");
        return;
      }

      Toast.show({
        type: "success",
        text1: `${data?.nickname} 님 환영합니다 🎉`, // userInfo에서 직접 가져오기
      });

      navigation.replace("BottomTab", { screen: "Home" });
    } catch (e) {}
  };

  useEffect(() => {
    setTimeout(() => {
      getUserData();
    }, 500);
  }, []);

  return (
    <SafeAreaView style={styles.wrapper}>
      <Icon width={250} height={250} />
      <Text style={styles.text}>Camping Go</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 36,
    fontWeight: "700",
    color: "#386641",
    fontStyle: "italic",
  },
});

export default Splash;
