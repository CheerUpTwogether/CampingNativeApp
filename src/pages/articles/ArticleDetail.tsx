import React, { useState } from "react";
// import uuid from "react-native-uuid";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import TopBar from "@/components/common/TopBar";
import Carousel from "react-native-snap-carousel";
import { getArticleApi, setFavoriteApi } from "@/apis/article";
import { formatDate } from "@/utils/date";
const { width: screenWidth } = Dimensions.get("window");

import StarIcon from "@/assets/icons/Star.svg";
import { ScrollView } from "react-native-gesture-handler";
import { getArticleSpb } from "@/supaBase/api/article";
const backIcon = require("@/assets/icons/Back.png");

export const ArticleDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params as { id: number };
  const [article, setArticle] = useState<Article>({
    id: 0,
    title: "",
    content: "",
    create_date: "",
    images: [""],
    article_favorite: [[""]],
  });

  useFocusEffect(
    React.useCallback(() => {
      getArticle();
    }, [])
  );

  const getArticle = async () => {
    const data = await getArticleSpb(id);
    data && setArticle(data);
  };

  const setFavorite = async () => {};

  const renderItem = ({ item }) => {
    console.log(item);
    return (
      <Image
        // key={uuid.v4()}
        source={{
          uri: `https://picsum.photos/300/200`,
        }}
        style={styles.thumbImage}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopBar
        leftIcon={backIcon}
        leftClick={navigation.goBack}
        title="캠핑장 상세 정보"
      />

      <ScrollView>
        <View>
          <Carousel
            data={article?.images ? article?.images : []}
            renderItem={renderItem}
            sliderWidth={screenWidth}
            itemWidth={screenWidth * 0.75}
            layout={"default"}
          />
        </View>

        <View style={styles.info}>
          <TouchableOpacity style={styles.starBtn} onPress={setFavorite}>
            <StarIcon
              color={article.isFavorite ? "#FFD73F" : "#ddd"}
              width={24}
              height={24}
            />
          </TouchableOpacity>
          <Text style={styles.title}>{article.title}</Text>
          <Text>{formatDate(article.create_date)}</Text>
          <Text style={styles.content}>{article.content}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF3E9",
    flex: 1,
  },
  thumbImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
  },
  info: {
    backgroundColor: "#fff",
    margin: 24,
    padding: 12,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    color: "#555",
    paddingBottom: 8,
  },
  content: {
    paddingVertical: 8,
    fontSize: 16,
  },
  starBtn: {
    alignItems: "flex-end",
    marginBottom: 12,
  },
});
