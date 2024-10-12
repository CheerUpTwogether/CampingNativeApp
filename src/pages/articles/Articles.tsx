import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, Image } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import TopBar from "@/components/common/TopBar";
import Dropdown from "@/components/common/Dropdown";
import ArticleFlatList from "@/components/article/ArticleFlatList";
import {
  getArticleImageSpb,
  getArticlesSpb,
  getFavoriteArticleIdSpb,
  setFavoriteSpb,
} from "@/supaBase/api/article";
import useStore from "@/store/store";

const menu = require("@/assets/icons/menu.png");
const profile = { uri: "https://picsum.photos/200/300" };
const ArticleInfoImg = require("@/assets/images/ArticleInfo.png");

const Articles = () => {
  const [sortType, setSortType] = useState<string>("LATEST");
  const [articles, setArticles] = useState<Article[]>([]);
  const [articleImages, setArticleImages] = useState<any[]>([]);
  const [myFavoriteArticles, setMyFavoriteArticles] = useState<
    ArticleFavoriteAId[]
  >([]);
  const orderList = [
    { title: "최신순", value: "LATEST" },
    { title: "좋아요순", value: "FAVORITE" },
  ];

  useFocusEffect(
    React.useCallback(() => {
      getArticles();
    }, [])
  );

  const getArticles = async () => {
    const data: Article[] = await getArticlesSpb(sortType);
    data && setArticles(data);
  };

  const setFavorite = async (articleId: number, mode: boolean) => {
    await setFavoriteSpb(articleId, mode);
    getArticles();
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <TopBar
        title="아티클"
        rightIsProfile={true}
        rightIcon={profile}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollAreaContainer}
      >
        <Image source={ArticleInfoImg} style={styles.ArticleInfoImg} />
        <View style={{ alignItems: "flex-end", marginVertical: 12 }}>
          <Dropdown
            options={orderList}
            onSelect={(selectedItem) =>{
              setSortType(selectedItem?.value || "LATEST")
              getArticles()
            }}
            defaultValue={orderList[0]}
          />
        </View>

        <ArticleFlatList
          articles={articles}
          myFavoriteArticles={myFavoriteArticles}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#efefef",
  },
  container: {
    padding: 12,
  },
  scrollAreaContainer: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  ArticleInfoImg: {
    height: 150,
    width: "100%",
    resizeMode: "contain",
  },
});

export default Articles;
