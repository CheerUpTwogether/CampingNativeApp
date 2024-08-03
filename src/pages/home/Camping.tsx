import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import TopBar from "@/components/common/TopBar";
import { useNavigation, NavigationProp } from "@react-navigation/native";
const backIcon = require("@/assets/icons/Back.png");
import CheckCircle from "@/assets/icons/CheckCircle.svg";

interface CampingType {
  firstImageUrl: string;
  facltNm: string;
  addr1: string;
  addr2: string;
  facltDivNm: string;
  mangeDivNm: string;
  induty: string;
  resveCl: string;
  intro: string;
  caravInnerFclty: string;
}

const Camping = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute();
  const { campingInfo } = route.params as { campingInfo: CampingType };
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TopBar
          title="캠핑장 상세 정보"
          leftIcon={backIcon}
          leftClick={navigation.goBack}
        />
      </View>

      <Image
        source={{ uri: `${campingInfo.firstImageUrl}` }}
        style={styles.thumbImage}
      />
      {/* 추가 프로퍼티들 출력 */}
      <View>
        <View style={styles.divNmContainer}>
          <Text style={styles.mangeDivNm}>{campingInfo.facltDivNm}</Text>
          <Text style={styles.mangeDivNm}>{campingInfo.mangeDivNm}</Text>
        </View>
        <Text style={styles.addrbox}>
          {campingInfo.addr1} {campingInfo.addr2}
        </Text>
        <Text style={styles.facltNm}>{campingInfo.facltNm}</Text>
        {/* <View style={styles.caravInnerFcltyContainer}>
          <CheckCircle fill="#555" width={40} height={40} />
          <Text style={styles.caravInnerFclty}>
            {campingInfo.caravInnerFclty}
          </Text>
        </View> */}
        <Text style={styles.intro}>{campingInfo.intro}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  topBar: { backgroundColor: "#FFF3E9" },
  thumbImage: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
  addrbox: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingTop: 16,
    color: "#555",
  },
  divNmContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  facltNm: {
    fontSize: 18,
    paddingHorizontal: 16,
    paddingTop: 4,
    color: "#000",
  },
  mangeDivNm: {
    marginRight: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 100,
    backgroundColor: "rgba(87, 51, 83, 0.2)",
    color: "#573353",
  },
  intro: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: "#555",
  },
  caravInnerFcltyContainer: {
    flexDirection: "row",
    paddingVertical: 16,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  caravInnerFclty: {
    paddingVertical: 16,
    paddingLeft: 4,
  },
});
export default Camping;
