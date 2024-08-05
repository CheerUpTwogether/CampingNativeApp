import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import TopBar from "@/components/common/TopBar";
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import { RootBottomParamList } from "../../components/router/Router";
import { getCampingsApi } from "@/apis/camping";
import { OPENAPI_SERVICE_KEY } from "@env";
import { ScrollView } from "react-native-gesture-handler";
import CampingFlatList from "@/components/home/CampingFlatList";

const menu = require("../../assets/icons/menu.png");
const profile = { uri: "https://picsum.photos/200/300" };

const Home = () => {
  const [campings, setCampings] = useState<CampingsType>([]);
  const navigation = useNavigation<NavigationProp<RootBottomParamList>>();
  const handleLeft = () => navigation.navigate("Settings");

  useFocusEffect(
    React.useCallback(() => {
      getCampings();
    }, [])
  );

  const getCampings = async () => {
    const serviceKey = OPENAPI_SERVICE_KEY;
    const data = await getCampingsApi({
      MobileOS: "AND",
      MobileApp: "캠핑 투게더",
      serviceKey,
      _type: "json",
    });

    const campingList = data?.response?.body?.items?.item;
    if (campingList) setCampings(campingList);
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
  scrollAreaContainer: { flexGrow: 1, paddingBottom: 100 },
});

export default Home;
