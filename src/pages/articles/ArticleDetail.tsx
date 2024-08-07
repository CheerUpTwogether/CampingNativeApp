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
import { useNavigation, useRoute } from "@react-navigation/native";
import TopBar from "@/components/common/TopBar";
import Carousel from "react-native-snap-carousel";
import { getArticleApi, setFavoriteApi } from "@/apis/article";
import { formatDate } from "@/utils/date";
const { width: screenWidth } = Dimensions.get("window");

import StarIcon from "@/assets/icons/Star.svg";
import { ScrollView } from "react-native-gesture-handler";
import useStore from "@/store/store";
const backIcon = require("@/assets/icons/Back.png");

export const ArticleDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { id, iconState, data } = route.params as {
    id: number;
    iconState: boolean;
    data: ArticleDetail;
  };

  const [isFavorite, setIsFavorite] = useState(iconState);
  const favoriteFunc = useStore().favoriteFunc;
  const handleFavorite = async () => {
    favoriteFunc(id, isFavorite);
    setIsFavorite(!isFavorite);
  };

  const renderItem = ({ item }) => {
    return (
      <Image
        source={{
          uri: item,
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
            data={data?.images ? data?.images : []}
            renderItem={renderItem}
            sliderWidth={screenWidth}
            itemWidth={screenWidth * 0.75}
            layout={"default"}
          />
        </View>

        <View style={styles.info}>
          <TouchableOpacity style={styles.starBtn} onPress={handleFavorite}>
            <StarIcon
              color={isFavorite ? "#FFD73F" : "#ddd"}
              width={24}
              height={24}
            />
          </TouchableOpacity>
          <Text style={styles.title}>{data.title}</Text>
          <Text>{formatDate(data.create_date)}</Text>
          <Text style={styles.content}>{data.content}</Text>
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
