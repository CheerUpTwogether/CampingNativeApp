import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import DetailBox from "../../components/common/DetailBox";

const alram = require("../../assets/icons/Alram.png");
const question = require("../../assets/icons/Question.png");

const Settings = () => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <View>
        <Text>Settings</Text>
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

export default Settings;
