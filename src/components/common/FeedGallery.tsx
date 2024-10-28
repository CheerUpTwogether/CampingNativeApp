import React, { useState, useEffect } from "react";
import { Image, StyleSheet, View, Dimensions, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { FeedItem } from "@/types/myPage";

const numColumns = 3;
const screenWidth = Dimensions.get("window").width;
const imageSize = screenWidth / numColumns;

// 피드 정렬을 위한 row 세팅
const renderRow = (
  rowData: FeedItem[],
  rowIndex: number,
  navigation?: NavigationProp<any>
) => (
  <View key={rowIndex} style={styles.row}>
    {rowData.map((item: FeedItem) => (
      <View key={item.id} style={styles.item}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => console.log("TODO: 피드로 이동?")}
        >
          {item?.images?.[0] ? (
            <Image source={{ uri: item.images[0] }} style={styles.image} />
          ) : (
            <View style={[styles.image, styles.icon]}>
              <Icon name="image-off" size={60} color="#aaa" />
            </View>
          )}
        </TouchableOpacity>
      </View>
    ))}
  </View>
);

const renderTextRow = (rowData: FeedItem[], rowIndex: number) => (
  <View key={rowIndex} style={styles.textRow}>
    {rowData.map((item) => (
      <TouchableOpacity
        key={item.id}
        style={styles.textItem}
        activeOpacity={0.5}
        onPress={() => console.log("TODO: 피드로 이동?")}
      >
        <Text style={styles.title}>
          {item.title.length > 20
            ? item.title.slice(0, 20) + "..."
            : item.title}
        </Text>
        <Text style={styles.contents}>
          {item.contents.length > 32
            ? item.contents.slice(0, 32) + "..."
            : item.contents}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);

const FeedGallery = ({ feedList }: { feedList: FeedItem[] }) => {
  const [activeTab, setActiveTab] = useState("withImages");
  const navigation = useNavigation();

  // 탭에 따라 필터링된 리스트 생성
  const filteredFeedList = feedList.filter((item) =>
    activeTab === "withImages"
      ? item.images.length > 0
      : item.images.length === 0
  );

  // 스타일에 사용될 피드 갯수
  const withImagesCount = feedList.filter(
    (item) => item.images.length > 0
  ).length;
  const withoutImagesCount = feedList.filter(
    (item) => item.images.length === 0
  ).length;

  // 스타일에 사용될 선택된 탭
  const isWithImagesActive = activeTab === "withImages";

  // 피드 정렬을 위한 column 세팅
  const groupItemsInRows = (items: FeedItem[], columns: number) => {
    const rows = [];
    for (let i = 0; i < items.length; i += columns) {
      rows.push(items.slice(i, i + columns));
    }
    return rows;
  };

  const rows = groupItemsInRows(
    filteredFeedList,
    activeTab === "withImages" ? numColumns : 1
  );

  return (
    <View style={styles.feedListContainer}>
      {/* Tab Bar */}
      <View style={styles.tabBarContainer}>
        <TouchableOpacity
          style={styles.tabBarWrapper}
          onPress={() => setActiveTab("withImages")}
        >
          <Image
            source={require("@/assets/icons/Images.png")}
            style={[styles.tabIcon, isWithImagesActive && styles.activeIconTab]}
          />
          <Text
            style={[
              styles.tabCount,
              isWithImagesActive && styles.activeCountTab,
            ]}
          >
            {withImagesCount}
          </Text>
        </TouchableOpacity>
        <View style={styles.empty} />
        <TouchableOpacity
          style={styles.tabBarWrapper}
          onPress={() => setActiveTab("withoutImages")}
        >
          <Image
            source={require("@/assets/icons/Text.png")}
            style={[
              styles.tabIcon,
              !isWithImagesActive && styles.activeIconTab,
            ]}
          />
          <Text
            style={[
              styles.tabCount,
              !isWithImagesActive && styles.activeCountTab,
            ]}
          >
            {withoutImagesCount}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      {rows.map((item, idx) =>
        activeTab === "withImages"
          ? renderRow(item, idx)
          : renderTextRow(item, idx)
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  feedListContainer: {
    marginTop: 16,
    flex: 1,
  },
  tabBarContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  tabBarWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  tabCount: { fontSize: 14 },
  tabIcon: {
    width: 26,
    height: 26,
    tintColor: "#AAA",
  },
  activeIconTab: {
    tintColor: "#386641",
    width: 30,
    height: 30,
  },
  activeCountTab: {
    color: "#386641",
    fontSize: 16,
  },
  empty: {
    width: 2,
  },
  row: {
    flexDirection: "row",
    gap: 4,
    marginBottom: 4,
  },
  item: {
    height: imageSize,
    width: imageSize,
  },
  image: {
    width: imageSize,
    height: imageSize,
    borderWidth: 0.5,
    borderColor: "#ddd",
    backgroundColor: "#efefef",
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
  },
  textRow: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  textItem: {
    paddingVertical: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  contents: {
    fontSize: 14,
    color: "#666",
    overflow: "hidden",
  },
});

export default FeedGallery;
