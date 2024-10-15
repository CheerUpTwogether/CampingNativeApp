import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React, { useRef } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const CustomBottomTab: React.FC<BottomTabBarProps> = ({
  state,
  navigation,
  insets,
  descriptors,
}) => {
  // 탭 관련 애니메이션 Value
  const tab1Value = useRef(new Animated.Value(0)).current;
  const tab2Value = useRef(new Animated.Value(0)).current;
  const tab3Value = useRef(new Animated.Value(0)).current;
  const tab4Value = useRef(new Animated.Value(0)).current;

  // 게시글 생성 관련 애니메이션 Value
  const addAnimation = useRef(new Animated.Value(0)).current;

  // 인덱스 매칭 애니메이션 Value 값
  const animatedValues: Record<number, Animated.Value> = {
    0: tab1Value,
    1: tab2Value,
    2: tab3Value,
    3: tab4Value,
  };

  // 게시글 생성 버튼 바운스 애니메이션
  const bounceAnimated = (
    value: number,
    animatedValue: Animated.Value
  ): Animated.CompositeAnimation => {
    return Animated.timing(animatedValue, {
      useNativeDriver: true,
      toValue: value,
      duration: 500,
    });
  };

  // 바운스 애니메이션 동작 함수
  const onBounce = () => {
    bounceAnimated(1, addAnimation).start(({ finished }) => {
      if (finished) {
        bounceAnimated(0, addAnimation).start();
      }
    });
  };

  // 바텀 바 아이콘 버튼 애니메이션
  const scaleAnimated = (
    value: number,
    animatedValue: Animated.Value
  ): Animated.CompositeAnimation => {
    return Animated.timing(animatedValue, {
      useNativeDriver: true,
      toValue: value,
      duration: 100,
    });
  };

  return (
    <View
      style={[styles.bottomTabBarWrapper, { paddingBottom: insets.bottom }]}
    >
      {/* 게시글 생성 버튼  */}
      <TouchableOpacity
        style={styles.addButtonWrapper}
        onPress={() => navigation.navigate("Add")}
      >
        <Animated.View
          style={{
            width: 60,
            height: 60,
            backgroundColor: '#a7c957',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100,
            transform: [
              {
                translateY: addAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -20],
                }),
              },
            ],
          }}
        >
          <Icon name="plus" size={40} color="#fff" />
        </Animated.View>
      </TouchableOpacity>
      {/* 곡선의 UI 컴포넌트 */}
      {/* <CustomCurveUi /> */}
      {/* 각 아이콘 설정  */}
      {state.routes.map((route, index) => {
        const label = route.name;
        const isFocused = state.index === index;
        const animatedValue = animatedValues[index];
        const iconFlag = (bool: Boolean) => {
          switch (label) {
            case "Home":
              return (
                <Icon name={bool? 'home-variant': "home-variant-outline"} size={32} color={bool ? "#6a994e" : "#999"} />
              );
            case "Articles":
              return (
                <Icon name={bool? 'clipboard': "clipboard-outline"} size={32} color={bool ? "#6a994e" : "#999"} />
              );
            case "Community":
              return (
                <Icon name={bool? 'text-box': "text-box-outline"} size={32} color={bool ? "#6a994e" : "#999"} />
              );
            default:
              return (
                <Icon name={bool? 'cog': "cog-outline"} size={32} color={bool ? "#6a994e" : "#999"} />
              );
          }
        };
        {
          /* 기본 동작 방지 및 애니메이션 제어 */
        }
        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            if (route.name === "Community") {
              onBounce();
            }
            navigation.navigate(route.name);
          }
          scaleAnimated(1, animatedValue).start(({ finished }) => {
            if (finished) {
              scaleAnimated(0, animatedValue).start();
            }
          });
        };
        return (
          <TouchableOpacity
            style={{
              flex: 1,
              marginRight: route.name === "Articles" ? 40 : 0,
              marginLeft: route.name === "Community" ? 40 : 0,
              alignItems: "center",
              paddingBottom: 16,
              paddingTop: 12,
              zIndex: 2,
              justifyContent: 'center'
            }}
            key={index}
            activeOpacity={0.7}
            onPress={onPress}
          >
            {iconFlag(isFocused)}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  bottomTabBarWrapper: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    zIndex: 1,
    backgroundColor: "#fff",
    borderTopColor: "#ddd",
    borderTopWidth: 0.5,
  },
  addButtonWrapper: {
    width: 80,
    height: 44,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 24,
    left: (width - 80) / 2 + 1,
    zIndex: 2,
  },
});

export default CustomBottomTab;
