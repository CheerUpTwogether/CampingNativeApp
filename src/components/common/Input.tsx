import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

interface Input {
  value: string;
  setValue: (text: string) => void;
  placeholder?: string;
  multiline?: boolean;
  numberOfLines?: number;
  isBgWhite?: boolean;
  style?: any
}
const Input = ({
  value,
  setValue,
  placeholder,
  multiline = false,
  numberOfLines = 1,
  isBgWhite = true,
  style = {},
}: Input) => {
  return (
    <View style={style}>
      <TextInput
        onChangeText={setValue}
        value={value}
        style={[
          styles.textInput,
          multiline && styles.textarea,
          isBgWhite && styles.bgWhite,
        ]}
        placeholder={placeholder}
        multiline={multiline}
        numberOfLines={numberOfLines}
        autoCapitalize="none"
        autoComplete="off"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
    color: "#333",
    backgroundColor: "#efefef",
  },
  textarea: {
    color: "#333",
    textAlignVertical: "top"
  },
  bgWhite: {
    backgroundColor: "#fff",
  },
});

export default Input;
