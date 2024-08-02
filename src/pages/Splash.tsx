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

const splashScreen = require("@/assets/images/SplashScreen.png");
type SettingsScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

// 2초 후 바텀 네비게이터로 이동
const Splash = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("BottomTab");
    }, 2000);
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
