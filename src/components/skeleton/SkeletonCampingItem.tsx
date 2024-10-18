import React, { useRef, useEffect } from "react";
import { View, StyleSheet, Animated } from "react-native";

const SkeletonCampingItem = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [animatedValue]);

  const interpolateBackground = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["#E0E0E0", "#BBB"],
  });

  const animatedStyle = {
    backgroundColor: interpolateBackground,
  };

  return (
    <View style={styles.container}>
      {/* 사진 스켈레톤 */}
      <Animated.View style={[styles.thumbImage, animatedStyle]} />

      {/* 업종 스켈레톤 */}
      <View style={styles.induty}>
        <Animated.View style={[styles.indutyText, animatedStyle]} />
      </View>

      {/* 컨텐츠 영역 스켈레톤 */}
      <View style={styles.faclContainer}>
        <Animated.View style={[styles.addr, animatedStyle]} />
        <Animated.View style={[styles.facltNm, animatedStyle]} />
      </View>

      {/* 상세 정보 스켈레톤 */}
      <View style={styles.faclDetailContainer}>
        <View style={styles.divNmContainer}>
          <Animated.View style={[styles.mangeDivNm, animatedStyle]} />
          <Animated.View style={[styles.mangeDivNm, animatedStyle]} />
        </View>
        <Animated.View style={[styles.resveCl, animatedStyle]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
    padding: 16,
    marginHorizontal: 12,
    backgroundColor: "#FFF",
    borderRadius: 10,
  },
  thumbImage: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    backgroundColor: "#E0E0E0",
  },
  induty: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "#E0E0E0",
    borderRadius: 100,
    padding: 8,
    width: 80,
    height: 20,
  },
  indutyText: {
    width: "100%",
    height: "100%",
  },
  facltNm: {
    height: 24,
    width: "60%",
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    marginBottom: 8,
  },
  divNmContainer: {
    flexDirection: "row",
  },
  faclContainer: {
    padding: 8,
  },
  mangeDivNm: {
    width: 60,
    height: 24,
    backgroundColor: "#E0E0E0",
    borderRadius: 100,
    marginRight: 8,
  },
  faclDetailContainer: {
    paddingHorizontal: 8,
    paddingBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  addr: {
    height: 16,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    marginBottom: 8,
    width: "80%",
  },
  resveCl: {
    width: 100,
    height: 16,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
  },
});

export default SkeletonCampingItem;
