import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View, Image, FlatList } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import TopBar from "@/components/common/TopBar";
//import Dropdown from "@/components/common/Dropdown";
import ArticleFlatList from "@/components/article/ArticleFlatList";
import {
  getArticlesSpb,
  setFavoriteSpb,
} from "@/supaBase/api/article";
import useStore from "@/store/store";

const profile = { uri: "https://picsum.photos/200/300" };
const ArticleInfoImg = require("@/assets/images/ArticleInfo.png");

const Articles = () => {
  const [sortType, setSortType] = useState<string>("LATEST");
  const {articles, setArticles} = useStore();
  const [refresh, setRefresh] = useState(false);
  const orderList = [
    { title: "최신순", value: "LATEST" },
    { title: "좋아요순", value: "FAVORITE" },
  ];

  useEffect(() => {
    getArticles()
  },[]);

  const getArticles = async () => {
    setRefresh(true);
    const data: Article[] = await getArticlesSpb(sortType);
    data && setArticles(data);
    setRefresh(false);
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <TopBar
        title="아티클"
        rightIsProfile={true}
        rightIcon={profile}
      />
      <FlatList 
        data={articles} 
        renderItem={({item}) => <ArticleFlatList article={item} />} 
        keyExtractor={(item) => item.id.toString()} 
        ListHeaderComponent={<Image source={ArticleInfoImg} style={styles.ArticleInfoImg} />}
        onRefresh={getArticles}
        refreshing={refresh}
        style={{ marginBottom: 70 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#efefef",
  },
  scrollAreaContainer: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  ArticleInfoImg: {
    height: 80,
    width: '100%',
    resizeMode: "cover",
    marginBottom: 8
  },
});

export default Articles;
