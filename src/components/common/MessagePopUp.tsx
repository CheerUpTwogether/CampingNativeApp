// @author : SeongMin
// @date : 2024-08-02
// @state : undo

import React, { useCallback, useEffect, useRef } from "react";
import { Animated, View, Text, Image, StyleSheet } from "react-native";

// TODO: type 정의

const MessagePopUp = ({ textMessage, messageType = 'ToastMessage', duration = 3000, onClose }) => {
  const [fadeAnimation] = useState(new Animated.Value(0));

  const profileImage = "http://via.placeholder.com/640x480";
  const arrowIcon = "http://via.placeholder.com/640x480"

  useEffect(()=>{
    // Fade In Animation Effect
    Animated.timing(fadeAnimation,{
      toValue:1,
      duration:500,
      useNativeDriver:true
    }).strat()

    // Fade out after specified duration
    const timer = setTimeout(() => {
     Animated.timing(fadeAnimation,{
        toValue:0,
        duration:500,
        useNativeDriver:true,
      }).start(()=> onClose()) 
    }, duration);

    return () => clearTimeout(timer)
  },[fadeAnimation,duration,onClose])

  // TODO: callBack 돌려줘야 하는지 확인 후 수정
  const messagePopUpAnimated = useCallback(() => {});


  return (
    {messageType === 'ToastMessage'
    ?
    (<Animated.View style={styles.container}>
      <View style={styles.profileImage}>
        <Image source={profileImage} />
      </View>
      <Text style={styles.textMessage}>{textMessage}</Text>
      <View style>
        <Image source={arrowIcon} />
      </View>
    </Animated.View>)
    : <View><Text>{'hello'}</Text></View>}
  );
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

  parfileImageConatiner: {
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
