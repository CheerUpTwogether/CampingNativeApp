import React, { useState } from "react";
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
import { getArticleApi } from "@/apis/article";
import { formatDate } from "@/utils/date";
const { width: screenWidth } = Dimensions.get("window");

import StarIcon from "@/assets/icons/Star.svg";
import { ScrollView } from "react-native-gesture-handler";
const backIcon = require("@/assets/icons/Back.png");

export const ArticleDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params as { id: number };
  const [article, setArticle] = useState<Article>({
    id: 0,
    title: "",
    content: "",
    createDate: "",
    isFavorite: false,
    articleImages: [],
  });

  useFocusEffect(
    React.useCallback(() => {
      getArticle();
    }, [])
  );

  const getArticle = async () => {
    const res = await getArticleApi(id);
    res?.data?.result && setArticle(res?.data?.result);
  };

  const renderItem = ({
    item,
  }: {
    item: { id: number; imgPath: string };
    index: number;
  }) => {
    return (
      <Image
        key={id}
        source={{
          uri: item.imgPath,
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
            data={article?.articleImages ? article?.articleImages : []}
            renderItem={renderItem}
            sliderWidth={screenWidth}
            itemWidth={screenWidth * 0.75}
            layout={"default"}
          />
        </View>

        <View style={styles.info}>
          <TouchableOpacity style={styles.starBtn}>
            <StarIcon
              color={article.isFavorite ? "#FFD73F" : "#ddd"}
              width={24}
              height={24}
            />
          </TouchableOpacity>
          <Text style={styles.title}>{article.title}</Text>
          <Text style={styles.date}>{formatDate(article.createDate)}</Text>
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
    // padding: 12,
    alignItems: "flex-end",
    paddingBottom: 12,
  },
});
