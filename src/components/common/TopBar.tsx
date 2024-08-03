import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

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
              style={[styles.icon, { width: 40, height: 40 }]}
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
              style={[styles.icon, { width: 40, height: 40 }]}
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
    marginVertical: 24,
    marginHorizontal: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
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
