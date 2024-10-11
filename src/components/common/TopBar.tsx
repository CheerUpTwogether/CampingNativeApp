import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/FontAwesome5';

interface TopBarProps {
  leftIcon?: { uri: string } | undefined;
  leftClick?: () => void;
  leftIsProfile?: boolean;
  title: string;
  rightIcon?: { uri: string } | undefined;
  rightClick?: () => void;
  rightIsProfile?: boolean;
  bgColor?: string;
}

const TopBar: React.FC<TopBarProps> = ({
  leftIcon,
  leftClick,
  leftIsProfile = false,
  title,
  rightIcon,
  rightClick,
  rightIsProfile = false,
  bgColor = "rgba(87, 51, 83, 0.2)",
}) => {
  return (
    <View style={styles.wrapper}>
      {leftIcon ? (
        <TouchableOpacity
          onPress={() => {
            if (leftClick) {
              leftClick();
            }
          }}
        >
          {leftIsProfile ? (
            <Image
              source={leftIcon}
              style={[styles.icon, { width: 40, height: 40 }]}
            />
          ) : (
            <Image source={leftIcon} style={styles.icon} />
          )}
        </TouchableOpacity>
      ) : (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon name="campground" size={28} color="#386641" style={{marginRight: 8}} />
          <Text style={{ fontSize: 18, color: "#386641" }}>캠핑투게더</Text>
        </View>
      )}

      {rightIcon ? (
        <TouchableOpacity
          onPress={() => {
            if (rightClick) {
              rightClick();
            }
          }}
        >
          {rightIsProfile ? (
            <Image
              source={rightIcon}
              style={[styles.icon, { width: 36, height: 36 }]}
            />
          ) : (
            <Image source={rightIcon} style={styles.icon} />
          )}
        </TouchableOpacity>
      ) : (
        <View style={styles.iconWrapper}></View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    // 그림자 스타일
    shadowColor: "#000", // 그림자 색상
    shadowOffset: { width: 0, height: 4 }, // 그림자의 위치
    shadowOpacity: 0.3, // 그림자의 투명도
    shadowRadius: 8, // 그림자의 반경
    elevation: 8, // Android에서 그림자 깊이
    zIndex: 1,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 34,
    height: 34,
    borderRadius: 100,
  },
  titleWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  titleStyle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#573353",
  },
});

export default TopBar;
