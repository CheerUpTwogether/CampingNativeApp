import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Dimensions,
  Text,
  Image,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import TopBar from "@/components/common/TopBar";
import Carousel, { ICarouselInstance, Pagination } from "react-native-reanimated-carousel";
import { formatDate } from "@/utils/date";
const { width: screenWidth } = Dimensions.get("window");

import StarIcon from "@/assets/icons/Star.svg";
import { ScrollView } from "react-native-gesture-handler";
import useStore from "@/store/store";
import { useSharedValue } from "react-native-reanimated";
import { setFavoriteSpb } from "@/supaBase/api/article";
const backIcon = require("@/assets/icons/Back.png");

export const ArticleDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
  const { id, is_liked, title, contents,create_date, images } = route.params as Article;
  const [star, setStar] = useState(is_liked); 
  const {articles, setArticles} = useStore();
  const setFavorite = async () => {
    await setFavoriteSpb(id, is_liked === null ? false : true);
    const newArticles = articles.map((el: Article) => el.id === id ? {...el, is_liked: !is_liked} : el);
    setArticles(newArticles);
    setStar(is_liked === null ? true : !is_liked)
  };

  const renderItem = ({ item }) => {
    return (
      <Image
        source={{uri: item}}
        style={styles.thumbImage}
      />
    );
  };

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopBar
        leftIcon={backIcon}
        leftClick={navigation.goBack}
        rightIcon={<StarIcon color={star ? "#FFD73F" : "#ddd"} width={28} height={28} />}
        rightClick={setFavorite}
        title="캠핑장 상세 정보"
      />

      <ScrollView>
        <View>
          <Carousel
            data={images ? images : []}
            renderItem={renderItem}
            width={screenWidth}
            height={200}  
            onProgressChange={progress}
          />
          <Pagination.Basic
            progress={progress}
            data={images ? images : []}
            dotStyle={{ backgroundColor: "rgba(0,0,0,0.1)", borderRadius: 100 }}
            containerStyle={{ gap: 5, marginTop: 10 }}
            onPress={onPressPagination}
          />
        </View>

        <View style={styles.info}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.date}>{formatDate(create_date).split(' ')[0]}</Text>
          <Text style={styles.content}>{contents}</Text> 
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  thumbImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  info: {
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#333",
    paddingBottom: 8,
  },
  date: {
    fontSize: 16,
    marginBottom: 8,
  },
  content: {
    paddingVertical: 8,
    fontSize: 16,
    color: '#333',
  },
  starBtn: {
    alignItems: "flex-end",
    marginBottom: 12,
  },
});
