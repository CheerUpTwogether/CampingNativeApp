import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import TopBar from "../../components/common/TopBar";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import {
  RootBottomParamList,
  RootStackParamList,
} from "../../components/router/Router";

const menu = require("../../assets/icons/menu.png");

const profile = { uri: "https://picsum.photos/200/300" };

type SettingsScreenNavigationProp =
  NativeStackNavigationProp<RootBottomParamList>;

const Home = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const handleLeft = () => {
    navigation.navigate("Settings");
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <TopBar
        leftIcon={menu}
        leftClick={handleLeft}
        title="캠핑투게더"
        rightIsProfile={true}
        rightIcon={profile}
      />
      <View>
        <Text>Home</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#FFF3E9",
  },
});

export default Home;
