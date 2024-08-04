import React from "react";
import { Image, StyleSheet, Text, View, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation, NavigationProp } from "@react-navigation/native";

interface CampingType {
  firstImageUrl: string;
  facltNm: string;
  addr1: string;
  addr2: string;
  facltDivNm: string;
  mangeDivNm: string;
  induty: string;
  resveCl: string;
}

interface CampingFlatListProps {
  campings: CampingType[] | null;
}

const CampingFlatList: React.FC<CampingFlatListProps> = ({ campings }) => {
  const navigation = useNavigation<NavigationProp<any>>();
  return campings && campings?.length
    ? campings.map((el) => (
        <View key={el.firstImageUrl} style={styles.container}>
          {/* 사진 */}
          <TouchableOpacity
            onPress={() => navigation.navigate("Camping", { campingInfo: el })}
          >
            <Image
              source={{ uri: `${el.firstImageUrl}` }}
              style={styles.thumbImage}
            />
            <View style={styles.induty}>
              <Text style={styles.indutyText}>
                {el?.induty?.split(",").join(" ")}
              </Text>
            </View>

            {/* 컨텐츠 영역 */}
            <View style={styles.faclContainer}>
              <Text style={styles.addr}>
                {el.addr1} {el.addr2}
              </Text>
              <Text style={styles.facltNm}>{el.facltNm}</Text>
            </View>

            <View style={styles.faclDetailContainer}>
              <View style={styles.divNmContainer}>
                <Text style={styles.mangeDivNm}>{el.facltDivNm}</Text>
                <Text style={styles.mangeDivNm}>{el.mangeDivNm}</Text>
              </View>
              <Text style={styles.resveCl}>{el.resveCl}</Text>
            </View>
          </TouchableOpacity>
        </View>
      ))
    : "";
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
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
