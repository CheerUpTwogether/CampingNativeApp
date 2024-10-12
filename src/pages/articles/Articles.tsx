import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, Image } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
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

  return (
    <SafeAreaView style={styles.wrapper}>
      <TopBar
        title="아티클"
        rightIsProfile={true}
        rightIcon={profile}
      />
      <ScrollView
        
        contentContainerStyle={styles.scrollAreaContainer}
      >
        <Image source={ArticleInfoImg} style={styles.ArticleInfoImg} />
        {/* <View style={{ alignItems: "flex-end", marginVertical: 20, marginHorizontal: 24 }}>
          <Dropdown
            options={orderList}
            onSelect={(selectedItem) =>{
              setSortType(selectedItem?.value || "LATEST")
              getArticles()
            }}
            defaultValue={orderList[0]}
          />
        </View> */}

        <ArticleFlatList
          articles={articles}
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
