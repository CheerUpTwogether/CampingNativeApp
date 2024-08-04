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
}

const Button = ({ label, onPress, isPrimary = true }: Button) => {
  return (
    <TouchableOpacity
      style={[styles.btn, !isPrimary && styles.btnPastel]}
      onPress={onPress}
    >
      <Text style={styles.btnText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#FDA758",
    alignItems: "center",
    borderRadius: 5,
    padding: 16,
    marginTop: 20,
  },
  btnPastel: {
    backgroundColor: "#FFF3E9",
  },
  btnText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#573353",
  },
});
export default Button;
