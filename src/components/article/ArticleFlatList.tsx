import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { formatDate } from "@/utils/date";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../router/Router";
import StarIcon from "@/assets/icons/Star.svg";

import UserIcon from "@/assets/icons/User.svg";
import useStore from "@/store/store";

const ArticleFlatList: React.FC<ArticleFlatListProps> = ({
  articles,
}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const favoriteFunc = useStore().favoriteFunc;
  return (
    <>
      {articles.length ? (
        articles.map((el) => {
          return (
            <TouchableOpacity
              key={el.id}
              style={styles.container}
              onPress={() =>
                navigation.navigate("ArticleDetail", {...el})
              }
            >
              {el?.images?.[0] ? (
                <Image
                  source={{ uri: el.images?.[0] }}
                  style={styles.thumbImage}
                />
              ) : (
                <View style={styles.thumbImage}></View>
              )}

              <Text style={styles.title}>{el.title}</Text>
              <Text numberOfLines={2} style={styles.content}>
                {el.contents}
              </Text>
              <View style={styles.etc}>
                <Text style={styles.createDate}>
                  {formatDate(el.create_date).split(' ')[0]}
                </Text>
                <View style={{ flexDirection: "row", gap: 10 }}>
                  <View style={{ flexDirection: "row" }}>
                    {Array.from({ length: el.like_count })
                      .slice(0, 3)
                      .map(() => (
                        <UserIcon
                          style={{ borderRadius: 10, marginRight: -12 }}
                          color={el.is_liked ? "#FFD73F" : "#ddd"}
                          width={20}
                          height={20}
                          key={Math.random()}
                        />
                      ))}
                  </View>
                  <Text style={{ fontSize: 12 }}>{el.like_count}</Text>
                  <TouchableOpacity
                    onPress={() => favoriteFunc(el.id, !!el.is_liked)}
                  >
                    <StarIcon
                      color={el.is_liked ? "#FFD73F" : "#ddd"}
                      width={24}
                      height={24}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          );
        })
      ) : (
        <></>
      )}
    </>
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
    fontSize: 18,
    color: "#000",
    fontWeight: "bold",
    paddingTop: 16,
    paddingBottom: 8,
  },
  content: {
    paddingBottom: 24,
    fontSize: 16,
    color: "#999",
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
