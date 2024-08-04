import React from "react";
import { View, TextInput, StyleSheet, Dimensions } from "react-native";

interface InputWithIconProps {
  value: string;
  setValue: (text: string) => void;
  placeholder: string;
  icon: React.ReactNode;
  isBgWhite?: boolean;
  secureTextEntry?: boolean;
}

const InputWithIcon = ({
  value,
  setValue,
  placeholder,
  isBgWhite = true,
  secureTextEntry = false,
  icon,
}: InputWithIconProps) => {
  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, isBgWhite && styles.bgWhite]}>
        {icon}
      </View>
      <TextInput
        onChangeText={setValue}
        value={value}
        style={[styles.textInput, isBgWhite && styles.bgWhite]}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
        autoComplete="off"
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
    marginRight: 2,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF6ED",
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
