import React from "react";
import { SafeAreaView, StyleSheet, Text, View, Image } from "react-native";
import TopBar from "@/components/common/TopBar";

const menu = require("@/assets/icons/menu.png");
const profile = { uri: "https://picsum.photos/200/300" };
const ArticleInfoImg = require("@/assets/images/ArticleInfo.png");

const Articles = () => {
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
        <Text>Articles</Text>
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
