import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, Image } from "react-native";

import TopBar from "@/components/common/TopBar";
import Dropdown from "@/components/common/Dropdown";
import { useFocusEffect } from "@react-navigation/native";
import { getArticlesApi } from "@/apis/article";

const menu = require("@/assets/icons/menu.png");
const profile = { uri: "https://picsum.photos/200/300" };
const ArticleInfoImg = require("@/assets/images/ArticleInfo.png");

const Articles = () => {
  const [sortType, setSortType] = useState("LATEST");
  const orderList = [
    { title: "최신순", value: "LATEST" },
    { title: "즐겨찾기순", value: "FAVORITE" },
  ];

  useFocusEffect(
    React.useCallback(() => {
      getArticles();
    }, [])
  );

  const getArticles = async () => {
    const res = await getArticlesApi(sortType);
    console.log(res);
  };
  return (
    <SafeAreaView style={styles.wrapper}>
      <TopBar
        title="아티클"
        leftIcon={menu}
        rightIsProfile={true}
        rightIcon={profile}
      />
      <View style={styles.container}>
        <Image source={ArticleInfoImg} style={styles.ArticleInfoImg} />
        <View style={{ alignItems: "flex-end", marginVertical: 12 }}>
          <Dropdown
            options={orderList}
            onSelect={(selectedItem) =>
              setSortType(selectedItem?.value || "LATEST")
            }
            defaultValue={orderList[0]}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#FFF3E9",
  },
  container: {
    padding: 12,
  },
  ArticleInfoImg: {
    height: 150,
    width: "100%",
    resizeMode: "contain",
  },
});

export default Articles;
