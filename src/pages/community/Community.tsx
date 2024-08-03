import { RootStackParamList } from "@/components/router/Router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";

type SettingsScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const Community = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.wrapper}>
      <View>
        <Text>Community</Text>
        <TouchableOpacity
          style={{
            width: 130,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#573353",
          }}
          onPress={() => {
            AsyncStorage.removeItem("userData");
            navigation.replace("Login");
          }}
        >
          <Text style={{ color: "white" }}>임시 로그아웃 버튼</Text>
        </TouchableOpacity>
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

export default Community;
