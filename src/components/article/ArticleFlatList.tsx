import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { formatDate } from "@/utils/date";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "@/types/route";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import useStore from "@/store/store";
import { setLikeAriticleSpb } from "@/supaBase/api/article";

const ArticleFlatList: React.FC<ArticleFlatListProps> = ({ article }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { setArticles, articles, userInfo } = useStore();

  const handleArticleLike = async () => {
    const res = await setLikeAriticleSpb(
      userInfo.user_id,
      article.id,
      !!article.is_liked
    );
    if (res) {
      const newArticles = articles.map((el: Article) =>
        el.id === article.id ? { ...el, is_liked: !article.is_liked } : el
      );
      setArticles(newArticles);
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("ArticleDetail", { id: article.id })}
    >
      {article?.images?.[0] ? (
        <Image
          source={{ uri: article.images?.[0] }}
          style={styles.thumbImage}
        />
      ) : (
        <View style={styles.thumbImage}></View>
      )}

      <Text style={styles.title}>{article.title}</Text>
      <Text numberOfLines={2} style={styles.content}>
        {article.contents}
      </Text>
      <View style={styles.etc}>
        <Text style={styles.createDate}>
          {formatDate(article.create_date).split(" ")[0]}
        </Text>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <TouchableOpacity onPress={handleArticleLike}>
            <Icon
              name={article.is_liked ? "heart" : "heart-outline"}
              size={24}
              color={article.is_liked ? "red" : "#AEB6B9"}
              style={{ marginRight: 2 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    marginBottom: 8,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  thumbImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    color: "#000",
    fontWeight: "bold",
    paddingTop: 16,
    paddingBottom: 8,
  },
  content: {
    paddingBottom: 24,
    fontSize: 16,
    color: "#333",
  },
  createDate: {
    color: "#999",
    fontSize: 16,
  },
  etc: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default ArticleFlatList;
