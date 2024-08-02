import React, { useRef } from "react";
import { Animated, TouchableOpacity, View } from "react-native";

/*
interface TopBarProps {
  leftIcon : 좌측 아이콘 이미지 전달
  leftClick : 좌측 아이콘 핸들러 전달
  leftIsProfile : 좌측 아이콘 프로필 인지 여부 
  title : 제목 ( 필수 )
  rightIcon : 우측 아이콘 이미지 전달
  rightClick : 우측 아이콘 핸들러 전달
  rightIsProfile : 우측 아이콘 프로필 인지 여부 
  bgColor 아이콘 배경 색상 지정
}
*/

interface CheckBoxProps {
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
  bgColor?: string;
  iconColor?: string;
}

const CheckBox: React.FC<CheckBoxProps> = ({
  isChecked,
  setIsChecked,
  bgColor = "#FDA758",
  iconColor = "#573353",
}) => {
  const isCheckedRef = useRef(isChecked);
  const checkAnimatedValue = useRef(new Animated.Value(0)).current;

  const checkAnimated = (
    value: number,
    animatedValue: Animated.Value
  ): Animated.CompositeAnimation => {
    return Animated.timing(animatedValue, {
      useNativeDriver: true,
      toValue: value,
      duration: 100,
    });
  };

  const onCheck = () => {
    setIsChecked(!isChecked);
    checkAnimated(Number(!isChecked), checkAnimatedValue).start();
    isCheckedRef.current = !isChecked;
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onCheck}
      style={{
        width: 30,
        height: 30,
      }}
    >
      <View
        style={{
          width: 20,
          height: 20,
          borderRadius: 6,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: bgColor,
        }}
      >
        <Animated.Text
          style={{
            color: iconColor,
            fontWeight: "bold",
            opacity: checkAnimatedValue,
          }}
        >
          ✓
        </Animated.Text>
      </View>
    </TouchableOpacity>
  );
};

export default CheckBox;
