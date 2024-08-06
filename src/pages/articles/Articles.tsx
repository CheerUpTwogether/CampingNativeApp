import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, Image } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import TopBar from "@/components/common/TopBar";
import Dropdown from "@/components/common/Dropdown";
import ArticleFlatList from "@/components/article/ArticleFlatList";
import {
  getArticlesSpb,
  getFavoriteArticleIdSpb,
  setFavoriteSpb,
} from "@/supaBase/api/article";

const menu = require("@/assets/icons/menu.png");
const profile = { uri: "https://picsum.photos/200/300" };
const ArticleInfoImg = require("@/assets/images/ArticleInfo.png");

const Articles = () => {
  const [sortType, setSortType] = useState<string>("LATEST");
  const [articles, setArticles] = useState<Article[]>([]);
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
      getFavoriteArticles();
    }, [])
  );

  useEffect(() => {
    getArticles();
    getFavoriteArticles();
  }, [sortType]);

  const getArticles = async () => {
    const data: Article[] = await getArticlesSpb(sortType);
    data && setArticles(data);
  };

  const getFavoriteArticles = async () => {
    const data: ArticleFavoriteAId[] = await getFavoriteArticleIdSpb();
    data && setMyFavoriteArticles(data);
  };
  const setFavorite = async (articleId: number, mode: boolean) => {
    await setFavoriteSpb(articleId, mode);
    getArticles();
    getFavoriteArticles();
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <TopBar
        title="아티클"
        leftIcon={menu}
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
            onSelect={(selectedItem) =>
              setSortType(selectedItem?.value || "LATEST")
            }
            defaultValue={orderList[0]}
          />
        </View>

        <ArticleFlatList
          articles={articles}
          myFavoriteArticles={myFavoriteArticles}
          setFavorite={setFavorite}
        />
      </ScrollView>
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
