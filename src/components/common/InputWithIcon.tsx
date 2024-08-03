import React from "react";
import { View, TextInput, StyleSheet, Dimensions } from "react-native";

interface InputWithIconProps {
  value: string;
  setValue: (text: string) => void;
  placeholder: string;
  icon: React.ReactNode;
  isBgWhite?: boolean;
}

const InputWithIcon = ({
  value,
  setValue,
  placeholder,
  isBgWhite = true,
  icon,
}: InputWithIconProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>{icon}</View>
      <TextInput
        onChangeText={setValue}
        value={value}
        style={[styles.textInput, isBgWhite && styles.bgWhite]}
        placeholder={placeholder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
  },
  iconContainer: {
    backgroundColor: "white",
    marginRight: 2,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    padding: 12,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    fontSize: 16,
    color: "#FDA758",
    backgroundColor: "#FFF6ED",
    width: "auto",
    flex: 1,
  },
  bgWhite: {
    backgroundColor: "#fff",
  },
});

export default InputWithIcon;
