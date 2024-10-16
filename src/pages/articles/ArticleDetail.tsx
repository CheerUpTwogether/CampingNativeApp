import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Dimensions,
  Text,
  Image,
  ScrollView
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Carousel, { ICarouselInstance, Pagination } from "react-native-reanimated-carousel";
import useStore from "@/store/store";
import { useSharedValue } from "react-native-reanimated";
import { setLikeAriticleSpb } from "@/supaBase/api/article";
import { formatDate } from "@/utils/date";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TopBar from "@/components/common/TopBar";

const backIcon = require("@/assets/icons/Back.png");
const { width: screenWidth } = Dimensions.get("window");


export const ArticleDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params as {id: number};
  const {articles, setArticles} = useStore();
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
  const {title, is_liked, contents, images, create_date} = articles.find((el: Article) => el.id === id);
  const {userInfo} = useStore();
  
  const setLike = async () => {
    const res = await setLikeAriticleSpb(userInfo.user_id, id, !!is_liked)
    if(res) {
      const newArticles = articles.map((el: Article) => el.id === id ? {...el, is_liked: !is_liked} : el);
      setArticles(newArticles);
    }
  };

  const renderItem = ({ item }: {item: string}) => {
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
        rightIcon={<Icon color={is_liked ? "red" : "#ddd"} size={28} name={is_liked ? 'heart' : 'heart-outline'} />}
        rightClick={setLike}
      />

      <ScrollView>
        <View>
          <Carousel
            data={images ? images : []}
            renderItem={renderItem}
            width={screenWidth}
            height={250}  
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
    height: 250,
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
