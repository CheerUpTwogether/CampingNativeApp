import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import TopBar from "@/components/common/TopBar";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import {
  RootBottomParamList,
  RootStackParamList,
} from "../../components/router/Router";
import { getCampingsApi } from "@/apis/camping";
import { OPENAPI_SERVICE_KEY } from "@env";
import { ScrollView } from "react-native-gesture-handler";
import CampingFlatList from "@/components/home/CampingFlatList";

const menu = require("../../assets/icons/menu.png");

const profile = { uri: "https://picsum.photos/200/300" };

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
type CampingsType = CampingType[] | null;

type SettingsScreenNavigationProp =
  NativeStackNavigationProp<RootBottomParamList>;

const Home = () => {
  const [campings, setCampings] = useState<CampingsType>([]);
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const handleLeft = () => navigation.navigate("Settings");

  useEffect(() => {
    getCampings();
  }, []);

  const getCampings = async () => {
    const {
      response: {
        body: {
          items: { item },
        },
      },
    } = await getCampingsApi({
      MobileOS: "AND",
      MobileApp: "캠핑 투게더",
      serviceKey: OPENAPI_SERVICE_KEY,
      _type: "json",
    });

    setCampings(item);
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <TopBar
        leftIcon={menu}
        leftClick={handleLeft}
        title="캠핑투게더"
        rightIsProfile={true}
        rightIcon={profile}
      />
      <ScrollView
        style={styles.campingContainer}
        contentContainerStyle={styles.scrollAreaContainer}
      >
        <CampingFlatList campings={campings} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#FFF3E9",
  },
  campingContainer: {
    flex: 1,
  },
  scrollAreaContainer: { flexGrow: 1 },
});

export default Home;
