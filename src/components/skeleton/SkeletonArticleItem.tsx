import React, { useRef, useEffect } from "react";
import { View, StyleSheet, Animated } from "react-native";

const SkeletonArticleItem = () => {
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
      {/* 이미지 */}
      <Animated.View style={[styles.thumbImage, animatedStyle]} />

      {/* 제목 */}
      <Animated.View style={[styles.titleSkeleton, animatedStyle]} />

      {/* 내용 */}
      <Animated.View style={[styles.contentSkeleton, animatedStyle]} />
      <Animated.View style={[styles.contentSkeleton, animatedStyle]} />

      {/* 날짜&좋아요 아이콘 */}
      <View style={styles.etc}>
        <Animated.View style={[styles.dateSkeleton, animatedStyle]} />
        <Animated.View style={[styles.likeIconSkeleton, animatedStyle]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    marginBottom: 8,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  thumbImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
    backgroundColor: "#E0E0E0",
  },
  titleSkeleton: {
    height: 20,
    width: "60%",
    borderRadius: 4,
    marginBottom: 16,
    backgroundColor: "#E0E0E0",
  },
  contentSkeleton: {
    height: 16,
    width: "100%",
    borderRadius: 4,
    marginBottom: 8,
    backgroundColor: "#E0E0E0",
  },
  etc: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  dateSkeleton: {
    height: 16,
    width: "30%",
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
  },
  likeIconSkeleton: {
    height: 24,
    width: 24,
    borderRadius: 12,
    backgroundColor: "#E0E0E0",
  },
});

export default SkeletonArticleItem;
