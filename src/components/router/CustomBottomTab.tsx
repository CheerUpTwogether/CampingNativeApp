import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React, { useRef } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import CustomCurveUi from "./CustomCurveUi";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { RootStackParamList } from "./Router";
import { useNavigation } from "@react-navigation/native";

const homeOn = require("../../../assets/icons/bottomTab/home.png");
const articlesOn = require("../../../assets/icons/bottomTab/articles.png");
const addButton = require("../../../assets/icons/bottomTab/add.png");
const communityOn = require("../../../assets/icons/bottomTab/community.png");
const settingsOn = require("../../../assets/icons/bottomTab/settings.png");

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
        <Animated.Image
          source={addButton}
          style={{
            width: 80,
            height: 80,
            transform: [
              {
                translateY: addAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -20],
                }),
              },
            ],
          }}
        />
      </TouchableOpacity>
      {/* 곡선의 UI 컴포넌트 */}
      <CustomCurveUi />
      {/* 각 아이콘 설정  */}
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = route.name;
        const isFocused = state.index === index;
        const animatedValue = animatedValues[index];
        const iconFlag = (bool: Boolean) => {
          switch (label) {
            case "Home":
              return homeOn;
            case "Articles":
              return articlesOn;
            case "Community":
              return communityOn;
            default:
              return settingsOn;

            // case "홈":
            //   return bool ? homeOn : homeOff;
            // case "스토리":
            //   return bool ? communityOn : communityOff;
            // case "내 근처":
            //   return bool ? nearOn : nearOff;
            // case "채팅":
            //   return bool ? chatOn : chatOff;
            // default:
            //   return bool ? mypageOn : mypageOff;
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
              paddingBottom: 20,
              paddingTop: 24,
              zIndex: 2,
            }}
            key={index}
            activeOpacity={0.7}
            onPress={onPress}
          >
            <Animated.Image
              source={iconFlag(isFocused)}
              style={{
                width: 40,
                height: 40,
                transform: [
                  {
                    scale: animatedValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 0.9],
                    }),
                  },
                ],
              }}
            />
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
    backgroundColor: "#FFF3E9",
    zIndex: 1,
  },
  addButtonWrapper: {
    width: 80,
    height: 80,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 46,
    left: (width - 80) / 2 + 1,
    zIndex: 2,
  },
});

export default CustomBottomTab;
