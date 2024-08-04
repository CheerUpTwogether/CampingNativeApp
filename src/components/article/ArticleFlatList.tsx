import React from "react";
import { Text, View } from "react-native";

const ArticleFlatList: React.FC<ArticleFlatListProps> = ({ articles }) => {
  return (
    <View>{!!articles && articles.map((el) => <Text>{el.title}</Text>)}</View>
  );
};

export default ArticleFlatList;
