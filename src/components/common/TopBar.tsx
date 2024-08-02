import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

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
  bgColor = "#e5ddff",
}) => {
  return (
    <View style={styles.wrapper}>
      {leftIcon ? (
        <TouchableOpacity
          style={[styles.iconWrapper, { backgroundColor: bgColor }]}
          onPress={() => {
            if (leftClick) {
              leftClick();
            }
          }}
        >
          {leftIsProfile ? (
            <Image
              source={leftIcon}
              style={[styles.icon, { width: 54, height: 54 }]}
            />
          ) : (
            <Image source={leftIcon} style={styles.icon} />
          )}
        </TouchableOpacity>
      ) : (
        <View style={styles.iconWrapper}></View>
      )}

      <View style={styles.titleWrapper}>
        <Text style={styles.titleStyle} numberOfLines={1}>
          {title}
        </Text>
      </View>

      {rightIcon ? (
        <TouchableOpacity
          style={[styles.iconWrapper, { backgroundColor: bgColor }]}
          onPress={() => {
            if (rightClick) {
              rightClick();
            }
          }}
        >
          {rightIsProfile ? (
            <Image
              source={rightIcon}
              style={[styles.icon, { width: 54, height: 54 }]}
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
    marginVertical: 28,
    marginHorizontal: 27,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  iconWrapper: {
    width: 54,
    height: 55,
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
