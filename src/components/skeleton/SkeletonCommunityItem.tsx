import React, { useRef, useEffect } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { Dimensions } from "react-native";

const width = Dimensions.get("screen").width;

const SkeletonCommunityItem = () => {
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
      {/* 프로필 이미지 & 닉네임 */}
      <View style={styles.profileContainer}>
        <Animated.View style={[styles.profileImageSkeleton, animatedStyle]} />
        <Animated.View style={[styles.nicknameSkeleton, animatedStyle]} />
      </View>

      {/* 이미지 */}
      <Animated.View style={[styles.thumbImage, animatedStyle]} />

      {/* 제목 */}
      <Animated.View style={[styles.titleSkeleton, animatedStyle]} />

      {/* 내용 */}
      <Animated.View style={[styles.contentsSkeleton, animatedStyle]} />
      <Animated.View style={[styles.contentsSkeleton, animatedStyle]} />

      {/* 더보기 버튼 */}
      <View style={styles.moreButtonSkeleton} />

      {/* 좋아요 & 댓글 및 날짜 */}
      <View style={styles.etc}>
        <Animated.View style={[styles.iconSkeleton, animatedStyle]} />
        <Animated.View style={[styles.iconSkeleton, animatedStyle]} />
        <Animated.View style={[styles.dateSkeleton, animatedStyle]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 4,
    marginHorizontal: 12,
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 16,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  profileImageSkeleton: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: "#E0E0E0",
    marginRight: 8,
  },
  nicknameSkeleton: {
    width: 100,
    height: 16,
    borderRadius: 4,
    backgroundColor: "#E0E0E0",
  },
  thumbImage: {
    width: width - 56,
    height: width - 56,
    borderRadius: 10,
    backgroundColor: "#E0E0E0",
    marginBottom: 16,
  },
  titleSkeleton: {
    width: "60%",
    height: 20,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    marginBottom: 16,
  },
  contentsSkeleton: {
    width: "100%",
    height: 16,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    marginBottom: 8,
  },
  moreButtonSkeleton: {
    width: 50,
    height: 16,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    marginBottom: 8,
  },
  etc: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  iconSkeleton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#E0E0E0",
    marginRight: 8,
  },
  dateSkeleton: {
    width: 100,
    height: 16,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
  },
});

export default SkeletonCommunityItem;
