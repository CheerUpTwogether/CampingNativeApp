import { RootStackParamList } from "@/components/router/Router";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";

type SettingsScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const Community = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.wrapper}>
      <View>
        <Text>Community</Text>
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
