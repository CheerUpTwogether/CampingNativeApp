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
      const userData = await AsyncStorage.getItem("userData");
      console.log(userData);
      if (userData !== null) {
        const { email, password } = JSON.parse(userData);
        const data = await addLoginApi({
          email,
          password,
        });
        console.log(data);
        if (data.success) {
          const userInfo = await getUserApi();
          console.log(userInfo);
          setUserData(userInfo);

          Toast.show({
            type: "success",
            text1: `${userInfo.result.nickName} 님 환영합니다 🎉`, // userInfo에서 직접 가져오기
          });

          navigation.replace("BottomTab");
        }
      } else {
        navigation.replace("Login");
      }
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
