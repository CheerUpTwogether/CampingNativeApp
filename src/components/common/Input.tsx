import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

interface Input {
  value: string;
  setValue: (text: string) => void;
  placeholder?: string;
  multiline?: boolean;
  numberOfLines?: number;
  secureTextEntry?: boolean;
  isBgWhite?: boolean;
}
const Input = ({
  value,
  setValue,
  placeholder,
  multiline = false,
  numberOfLines = 1,
  secureTextEntry = false,
  isBgWhite = true,
}: Input) => {
  return (
    <View>
      <TextInput
        onChangeText={setValue}
        value={value}
        style={[
          styles.textInput,
          multiline && styles.textarea,
          isBgWhite && styles.bgWhite,
        ]}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        multiline={multiline}
        numberOfLines={numberOfLines}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: "100%",
    padding: 12,
    borderRadius: 5,
    fontSize: 16,
    color: "#FDA758",
  },
  textarea: {
    height: 150,
    color: "#FDA758",
  },
  bgWhite: {
    backgroundColor: "#fff",
  },
});

export default Input;
