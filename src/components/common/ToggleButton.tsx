import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
  View,
} from "react-native";

const ToggleButton = () => {
  const [isOn, setIsOn] = useState(true);
  const animatedValue = useRef(new Animated.Value(isOn ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isOn ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isOn]);

  const handleToggle = () => {
    setIsOn(!isOn);
  };

  const iconTranslateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 20], // 아이콘의 이동 범위
  });

  const textTranslateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 0], // 텍스트의 이동 범위
  });

  const bgColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(87, 51, 83, 0.2)", "rgba(87, 51, 83, 0.5)"],
  });

  return (
    <Animated.View style={[styles.toggleWrapper, { backgroundColor: bgColor }]}>
      <TouchableOpacity
        style={styles.innerWrapper}
        activeOpacity={0.9}
        onPress={handleToggle}
      >
        <View style={styles.innerWrapper}>
          <Animated.View
            style={[
              styles.icon,
              { transform: [{ translateX: iconTranslateX }] },
            ]}
          />
          <Animated.Text
            style={[
              styles.text,
              {
                transform: [{ translateX: textTranslateX }],
                position: "absolute",
                left: isOn ? 2 : 1, // 텍스트 위치 조정
              },
            ]}
          >
            {isOn ? "On" : "Off"}
          </Animated.Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toggleWrapper: {
    borderRadius: 20,
    padding: 5,
    width: 50,
    height: 30,
    justifyContent: "center",
  },
  innerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon: {
    width: 20,
    height: 20,
    backgroundColor: "#573353",
    borderRadius: 30,
  },
  text: {
    color: "#573353",
    fontSize: 12,
    fontWeight: "600",
  },
});

export default ToggleButton;
