import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

const Add = () => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <View>
        <Text>Add</Text>
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

export default Add;
