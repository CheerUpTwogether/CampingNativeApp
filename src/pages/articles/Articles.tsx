import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Image, FlatList } from "react-native";
import TopBar from "@/components/common/TopBar";
import ArticleFlatList from "@/components/article/ArticleFlatList";
import { getArticlesSpb } from "@/supaBase/api/article";
import useStore from "@/store/store";
import SkeletonArticleItem from "@/components/skeleton/SkeletonArticleItem";

const ArticleInfoImg = require("@/assets/images/ArticleInfo.png");

const Articles = () => {
  const { articles, setArticles } = useStore();
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const { userInfo } = useStore();
  useEffect(() => {
    getArticles();
    console.log("ars");
  }, []);

  const getArticles = async () => {
    setLoading(true);
    const data: Article[] = await getArticlesSpb(userInfo.user_id);
    data && setArticles(data);
    setLoading(false);
  };

  const skeletonData = Array(5).fill({});

  return (
    <SafeAreaView style={styles.wrapper}>
      <TopBar rightIsProfile={true} />
      <FlatList
        data={loading ? skeletonData : articles} // 로딩 중일 때 스켈레톤 데이터 렌더링
        renderItem={({ item }) =>
          loading ? (
            <SkeletonArticleItem /> // 스켈레톤 컴포넌트 렌더링
          ) : (
            <ArticleFlatList article={item} />
          )
        }
        keyExtractor={(item, index) =>
          loading ? `skeleton-${index}` : item.id.toString()
        }
        ListHeaderComponent={
          <Image source={ArticleInfoImg} style={styles.ArticleInfoImg} />
        }
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
    width: "100%",
    resizeMode: "cover",
    marginBottom: 8,
  },
});

export default Articles;
