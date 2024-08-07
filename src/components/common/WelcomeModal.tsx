import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";
import Modal from "react-native-modal";
import LottieView from "lottie-react-native";

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

const WelcomeModal = ({ isVisible, onClose }) => {
  const animationProgress = useRef(new Animated.Value(0));

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      Animated.timing(animationProgress.current, {
        toValue: 1,
        duration: 5000,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={styles.modalWrapper}
    >
      <View style={styles.modalContent}>
        <AnimatedLottieView
          source={require("@/assets/animation/welcomeAnimation.json")}
          progress={animationProgress.current}
          style={{ width: "100%", height: 200 }}
        />
        <Text style={styles.welcomText}>반갑습니다!</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    height: 300,
  },
  animation: {
    width: 150,
    height: 150,
  },
  welcomText: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
});

export default WelcomeModal;
