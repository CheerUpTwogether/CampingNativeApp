import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../router/Router";

const CampingFlatList: React.FC<CampingFlatListProps> = ({
  campings,
  onEndReached,
}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const renderItem = ({ item }: { item: CampingType }) => {
    return (
      <View key={item.firstImageUrl} style={styles.container}>
        {/* 사진 */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("CampingDetail", { campingInfo: item })
          }
        >
          {item.firstImageUrl ? (
            <Image
              source={{ uri: `${item.firstImageUrl}` }}
              style={styles.thumbImage}
            />
          ) : (
            <></>
          )}

          <View style={styles.induty}>
            <Text style={styles.indutyText}>
              {item?.induty?.split(",").join(" ")}
            </Text>
          </View>

          {/* 컨텐츠 영역 */}
          <View style={styles.faclContainer}>
            <Text style={styles.addr}>
              {item.addr1} {item.addr2}
            </Text>
            <Text style={styles.facltNm}>{item.facltNm}</Text>
          </View>

          <View style={styles.faclDetailContainer}>
            <View style={styles.divNmContainer}>
              <Text style={styles.mangeDivNm}>{item.facltDivNm}</Text>
              <Text style={styles.mangeDivNm}>{item.mangeDivNm}</Text>
            </View>
            <Text style={styles.resveCl}>{item.resveCl}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <FlatList
      data={campings}
      keyExtractor={(item: CampingType) => item.facltNm}
      renderItem={renderItem}
      onEndReached={onEndReached}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    marginHorizontal: 24,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  thumbImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
  },
  induty: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "#FC9D45",
    borderRadius: 100,
    padding: 8,
  },
  indutyText: {
    color: "#FFF3E9",
    fontSize: 14,
    fontWeight: "bold",
  },
  facltNm: {
    fontSize: 18,
    color: "#000",
  },
  divNmContainer: {
    flexDirection: "row",
  },
  faclContainer: {
    padding: 8,
  },
  mangeDivNm: {
    marginRight: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 100,
    backgroundColor: "rgba(87, 51, 83, 0.2)",
    color: "#573353",
  },
  faclDetailContainer: {
    paddingHorizontal: 8,
    paddingBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  addr: {
    fontSize: 14,
  },
  resveCl: {
    fontSize: 18,
  },
});
export default CampingFlatList;
