import React from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";

interface Button {
  label: string;
  onPress: (e: GestureResponderEvent) => void;
  isPrimary?: boolean;
  isSmall?: boolean;
}

const Button = ({
  label,
  onPress,
  isPrimary = true,
  isSmall = false,
}: Button) => {
  return (
    <TouchableOpacity
      style={[
        styles.btn,
        !isPrimary && styles.btnPastel,
        isSmall && { padding: 8 },
      ]}
      onPress={onPress}
    >
      <Text style={styles.btnText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#6a994e",
    alignItems: "center",
    borderRadius: 5,
    padding: 16,
    marginTop: 20,
  },
  btnPastel: {
    backgroundColor: "#FFF",
  },
  btnText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});
export default Button;
