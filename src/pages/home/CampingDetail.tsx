import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Linking,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import TopBar from "@/components/common/TopBar";
import CheckCircle from "@/assets/icons/CheckCircle.svg";
import Button from "@/components/common/Button";
const backIcon = require("@/assets/icons/Back.png");

const Camping = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute();
  const { campingInfo } = route.params as { campingInfo: CampingType };
  const moveCall = (number: string) => {
    Linking.openURL(`tel:${number.split("-").join("")}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TopBar
          leftIcon={backIcon}
          leftClick={navigation.goBack}
          title="캠핑장 상세 정보"
        />
      </View>

      {/* 추가 프로퍼티들 출력 */}
      <ScrollView>
        <Image
          source={{ uri: `${campingInfo.firstImageUrl}` }}
          style={styles.thumbImage}
        />
        <View>
          <View style={styles.divNmContainer}>
            <Text style={styles.mangeDivNm}>{campingInfo.facltDivNm}</Text>
            <Text style={styles.mangeDivNm}>{campingInfo.mangeDivNm}</Text>
          </View>
          <Text style={styles.addrbox}>
            {campingInfo.addr1} {campingInfo.addr2}
          </Text>
          <Text style={styles.facltNm}>{campingInfo.facltNm}</Text>
          {campingInfo.caravInnerFclty.length ? (
            <View style={styles.caravInnerFcltyContainer}>
              <View style={styles.caravInnerFcltyTitle}>
                <CheckCircle color="#555" width={20} height={20} />
                <Text style={styles.caravInnerFcltyTitleText}>
                  편의 시설/서비스
                </Text>
              </View>
              <Text style={styles.caravInnerFclty}>
                {campingInfo.caravInnerFclty.split(",").join(" ")}
              </Text>
            </View>
          ) : (
            <></>
          )}
          {campingInfo.resveCl ? (
            <>
              <View style={styles.caravInnerFcltyContainer}>
                <View style={styles.caravInnerFcltyTitle}>
                  <CheckCircle color="#555" width={20} height={20} />
                  <Text style={styles.caravInnerFcltyTitleText}>예약 방법</Text>
                </View>
                <Text style={styles.caravInnerFclty}>
                  {campingInfo.resveCl}
                </Text>
              </View>
            </>
          ) : (
            <></>
          )}
        </View>
        <Text style={styles.intro}>{campingInfo.intro}</Text>
      </ScrollView>
      <View style={styles.btnWrapper}>
        <Button label="전화걸기" onPress={() => moveCall(campingInfo.tel)} />
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
    paddingTop: 28,
    paddingBottom: 16,
    fontSize: 16,
    color: "#555",
    marginBottom: 30,
  },
  caravInnerFcltyContainer: {
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  caravInnerFclty: {
    paddingVertical: 4,
    paddingLeft: 4,
  },
  caravInnerFcltyTitle: {
    flexDirection: "row",
  },
  caravInnerFcltyTitleText: {
    lineHeight: 20,
    color: "#555",
    paddingLeft: 4,
  },
  resveCl: {
    paddingHorizontal: 16,
  },
  btnWrapper: {
    backgroundColor: "#FFF3E9",
    height: 88,
    position: "static",
    bottom: 0,
    paddingHorizontal: 12,
    //marginVertical: 8,
    paddingBottom: 8,
  },
});
export default Camping;
