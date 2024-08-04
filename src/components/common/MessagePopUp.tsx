// @author : SeongMin
// @date : 2024-08-02
// @state : undo
// @ description
//  - Example)
//    ...
//    const {showMessagePopUp, MessagePopUpComponent} = useMessagePopUp()
//    ...
//    <Button onPress={showMessagePopUp("SOME TEXT" , duration=2000[option, default=3000])} />
//    <MessagePopUpComponent messageType="Toast"|[else]/>
//    ...

// TODO: (MessagePopUp) type 정의
// TODO: (MessagePopUp) Toast 일 때 , 어떻게 보일지 디자인 다시 하기
// TODO: (MessagePopUp) Toast가 아닌 일반 popUp 상황에서, 그림이 왜 안보이지?
// TODO: (MessagePopUp)(optional) - component와 customHook을 다시 분리?

import React, { useState, useEffect, useCallback } from "react";
import { Animated, View, Text, Image, StyleSheet } from "react-native";

const MessagePopUp = ({
  textMessage,
  messageType = "Toast",
  profileImage = "http://via.placeholder.com/640x480",
  arrowIcon = "http://via.placeholder.com/640x480",
  duration = 3000,
}) => {
  const [fadeAnimation] = useState(new Animated.Value(0));
  const [currentMessageType, setCurrentMessageType] = useState(messageType);
  const [toastVisible, setToastVisible] = useState(true);

  useEffect(() => {
    // Fade In
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Fade Out
    const timer = setTimeout(() => {
      Animated.timing(fadeAnimation, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        setToastVisible(false);
      });
    }, duration);

    return () => clearTimeout(timer);
  }, [fadeAnimation, duration]);

  if (!toastVisible) {
    return null;
  }

  return currentMessageType === "Toast" ? (
    <View>
      <Text> {textMessage} </Text>
    </View>
  ) : (
    <Animated.View style={{ opacity: fadeAnimation }}>
      <View style={styles.container}>
        <View style={styles.profileImageConatiner}>
          <Image style={styles.profileImage} source={{ uri: profileImage }} />
        </View>
        <Text style={styles.textMessage}> {textMessage} </Text>
        <View style={styles.arrowIconContainer}>
          <Image style={styles.arrowIcon} source={{ uri: arrowIcon }} />
        </View>
      </View>
    </Animated.View>
  );
};

const useMessagePopUp = () => {
  // messagePopUp 컴포넌트 기본 state
  const [messagePopUp, setMessagePopUp] = useState({
    visible: false,
    textMessage: "",
    duration: 3000,
  });

  const showMessagePopUp = useCallback((textMessage, duration = 3000) => {
    setMessagePopUp({
      visible: true,
      textMessage: textMessage,
      duration: duration,
    });
    setTimeout(() => {
      setMessagePopUp({ visible: false, textMessage: "", duration: duration });
    }, duration);
  }, []);

  const MessagePopUpComponent = ({ profileImage, arrowIcon, messageType }) => {
    return (
      messagePopUp.visible && (
        <MessagePopUp
          textMessage={messagePopUp.textMessage}
          duration={messagePopUp.duration}
          messageType={messageType}
          profileImage={profileImage}
          arrowIcon={arrowIcon}
        />
      )
    );
  };

  return { showMessagePopUp, MessagePopUpComponent };
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 2,
  },

  profileImageConatiner: {
    marginBottom: 10,
  },

  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },

  textMessage: {
    textAlign: "center",
    fontSize: 16,
    color: "#7d7d7d",
    marginBottom: 20,
  },
  arrowIconContainer: {
    marginTop: 10,
  },
  arrowIcon: {
    width: 30,
    height: 30,
  },
});

export default useMessagePopUp;
