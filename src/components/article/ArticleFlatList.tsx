import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { formatDate } from "@/utils/date";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../router/Router";
import StarIcon from "@/assets/icons/Star.svg";

const ArticleFlatList: React.FC<ArticleFlatListProps> = ({
  articles,
  setFavorite,
}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <>
      {articles.length ? (
        articles.map((el) => (
          <TouchableOpacity
            key={el.title}
            style={styles.container}
            onPress={() => navigation.navigate("ArticleDetail", { id: el.id })}
          >
            {el?.articleImages?.[0]?.imgPath ? (
              <Image
                source={{ uri: `${el?.articleImages?.[0]?.imgPath}` }}
                style={styles.thumbImage}
              />
            ) : (
              <View style={styles.thumbImage}></View>
            )}

            <Text style={styles.title}></Text>
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
