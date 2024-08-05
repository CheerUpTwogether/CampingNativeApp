import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import LottieView from "lottie-react-native";

const WelcomeModal = ({ isVisible, onClose }) => {
  const animationRef = useRef(null);

  useEffect(() => {
    if (isVisible && animationRef.current) {
      animationRef.current.play();
    }
    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    return () => clearTimeout(timer);
  }, [isVisible]);

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={styles.modalContent}>
        <LottieView
          ref={animationRef}
          source={require("../../assets/animation/welcomeAnimation.json")}
          autoPlay={false}
          loop={false}
          style={styles.animation}
        />
        <Text style={styles.welcomText}>가입을 환영합니다!</Text>
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
