import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { getMonthValue, padZero } from "@/utils/date";

import StarIcon from "@/assets/icons/Star.svg";
import { TouchableOpacity } from "react-native-gesture-handler";

const ArticleFlatList: React.FC<ArticleFlatListProps> = ({
  articles,
  setFavorite,
}) => {
  const formatDate = (createDate: string) => {
    const date = new Date(createDate);
    const year = date.getFullYear();
    const month = getMonthValue(date.getMonth());
    const day = padZero(date.getDate());
    const hour = padZero(date.getHours());
    const minute = padZero(date.getMinutes());

    return `${year}-${month}-${day} ${hour}:${minute}
    `;
  };

  return (
    <>
      {articles.length ? (
        articles.map((el) => (
          <TouchableOpacity key={el.title} style={styles.container}>
            <Image
              source={{
                uri: `http://${el?.articleImages?.[0]?.imgPath}`,
              }}
              style={styles.thumbImage}
            />
            <Text style={styles.title}>{el.title}</Text>
            <Text numberOfLines={2} style={styles.content}>
              {el.content}
            </Text>
            <View style={styles.etc}>
              <Text style={styles.createDate}>{formatDate(el.createDate)}</Text>
              <TouchableOpacity onPress={() => setFavorite(el.id)}>
                <StarIcon
                  color={el.isFavorite ? "#FFD73F" : "#ddd"}
                  width={24}
                  height={24}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <></>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    paddingHorizontal: 12,
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
    paddingVertical: 8,
  },
  content: {
    paddingBottom: 24,
    fontSize: 16,
    color: "#999",
  },
  createDate: {
    color: "#999",
  },
  etc: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default ArticleFlatList;
