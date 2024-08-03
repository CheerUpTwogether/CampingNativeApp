import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { RootStackParamList } from "../components/router/Router";

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
    <SafeAreaView>
      <View>
        <Text>Splash</Text>
      </View>
    </SafeAreaView>
  );
};

export default Splash;
