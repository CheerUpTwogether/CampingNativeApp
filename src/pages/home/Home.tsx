import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, StyleSheet, Platform } from "react-native";
import TopBar from "@/components/common/TopBar";
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import { RootBottomParamList } from "../../components/router/Router";
import { getCampingsApi } from "@/apis/camping";
import { OPENAPI_SERVICE_KEY } from "@env";
import CampingFlatList from "@/components/home/CampingFlatList";


const menu = require("../../assets/icons/menu.png");
const profile = { uri: "https://picsum.photos/200/300" };

const Home = () => {
  const [campings, setCampings] = useState<CampingsType>([]);
  const navigation = useNavigation<NavigationProp<RootBottomParamList>>();
  const handleLeft = () => navigation.navigate("Settings");
  const [pageNo, setPageNo] = useState(2);

  useEffect(() => {
    getCampings();
  }, [pageNo]);

  const getCampings = async () => {
    const serviceKey = OPENAPI_SERVICE_KEY;
    const data = await getCampingsApi({
      //MobileOS: Platform.OS === "ios" ? "ETC" : "AND",
      MobileOS: "AND",
      MobileApp: "캠핑 투게더",
      serviceKey: serviceKey,
      _type: "json",
      pageNo,
    });

    const campingList = data?.response?.body?.items?.item;

    if (campingList)
      setCampings((prev) =>
        pageNo === 1 ? campingList : [...prev, ...campingList]
      );
  };

  const handleEndReached = () => {
    setPageNo((prev) => prev + 1);
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <TopBar title="캠핑투게더" rightIsProfile={true} rightIcon={profile} />
      <CampingFlatList campings={campings} onEndReached={handleEndReached} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#F5F7F8",
    marginBottom: 40,
  },
  scrollAreaContainer: { flexGrow: 1, paddingBottom: 100 },
});

export default Home;
