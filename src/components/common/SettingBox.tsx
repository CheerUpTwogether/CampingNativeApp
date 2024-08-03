import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface SettingBoxProps {
  title: string;
  children: React.ReactNode;
}

const SettingBox: React.FC<SettingBoxProps> = ({ title, children }) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>{title}</Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    marginHorizontal: "4%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  text: {
    color: "#573353",
    fontWeight: "500",
  },
});

export default SettingBox;
