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
}

interface CampingFlatListProps {
  campings: CampingType[] | null;
}

const CampingFlatList: React.FC<CampingFlatListProps> = ({ campings }) => {
  const navigation = useNavigation<NavigationProp<any>>();
  return campings && campings?.length
    ? campings.map((el) => (
        <View key={el.firstImageUrl}>
          {/* 사진 */}
          <TouchableOpacity
            onPress={() => navigation.navigate("Camping", { id: el.facltNm })}
          >
            <Image
              source={{ uri: `${el.firstImageUrl}` }}
              style={styles.thumbImage}
            />

            {/* 컨텐츠 영역 */}
            <View>
              <View style={styles.divNmContainer}>
                <Text>{el.facltDivNm}</Text>
                <Text>{el.mangeDivNm}</Text>
              </View>
              <Text style={styles.facltNm} numberOfLines={1}>
                {el.facltNm}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ))
    : "";
};

const styles = StyleSheet.create({
  thumbImage: {
    width: "100%",
    height: 80,
    resizeMode: "cover",
  },
  facltNm: {
    fontSize: 20,
    fontWeight: "bold",
  },
  divNmContainer: {
    flexDirection: "row",
  },
});
export default CampingFlatList;
