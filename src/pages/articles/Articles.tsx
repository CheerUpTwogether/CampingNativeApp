import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Image, FlatList } from "react-native";
import TopBar from "@/components/common/TopBar";
import ArticleFlatList from "@/components/article/ArticleFlatList";
import { getArticlesSpb } from "@/supaBase/api/article";
import useStore from "@/store/store";

const ArticleInfoImg = require("@/assets/images/ArticleInfo.png");

const Articles = () => {
  const {articles, setArticles} = useStore();
  const [refresh, setRefresh] = useState(false);
  const {userInfo} = useStore();
  useEffect(() => {
    getArticles()
  },[]);

  const getArticles = async () => {
    setRefresh(true);
    const data: Article[] = await getArticlesSpb(userInfo.user_id);
    data && setArticles(data);
    setRefresh(false);
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <TopBar
        rightIsProfile={true}
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
