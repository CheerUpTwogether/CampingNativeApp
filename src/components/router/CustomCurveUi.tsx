import React from "react";
import { Dimensions, SafeAreaView, StyleSheet, View } from "react-native";
import { Path, Svg } from "react-native-svg";

// svg를 활용한 커스텀 도형 만들기
const CustomCurveUi = () => {
  const { width } = Dimensions.get("window");
  const WIDTH = width + 2;
  const HEIGHT = 84;
  const CORNER_RADIUS = 16;
  const CUTOUT_RADIUS = 50;
  const CUTOUT_LEFT_X = WIDTH / 2 - CUTOUT_RADIUS;
  const CUTOUT_RIGHT_X = WIDTH / 2 + CUTOUT_RADIUS;

  const d = `
    M0,${HEIGHT}
    L0,${CORNER_RADIUS} Q0,0 ${CORNER_RADIUS},0
    L${CUTOUT_LEFT_X},0
    A${CUTOUT_RADIUS},${CUTOUT_RADIUS} 0 0 0 ${CUTOUT_RIGHT_X},0
    L${WIDTH - CORNER_RADIUS},0 Q${WIDTH},0 ${WIDTH},${CORNER_RADIUS}
    L${WIDTH},${HEIGHT}
    Z
  `;
  // fill - 커스텀 UI 색상 지정
  return (
    <View style={styles.bottomSvgWrapper}>
      <Svg width={WIDTH} height={HEIGHT}>
        <Path d={d} fill="#FFF" />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomSvgWrapper: {
    flex: 1,
    zIndex: 1,
    position: "absolute",
    // 바텀바 안에서 커스텀 UI를 제외한 나머지 부분 색상
    backgroundColor: "#FFF3E9",
  },
});

export default CustomCurveUi;
