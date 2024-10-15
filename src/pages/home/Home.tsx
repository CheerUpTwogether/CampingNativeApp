import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, StyleSheet, Platform, FlatList } from "react-native";
import TopBar from "@/components/common/TopBar";
import { getCampingsApi } from "@/api";
import { OPENAPI_SERVICE_KEY } from "@env";
import CampingItem from "@/components/home/CampingItem";

const profile = { uri: "https://picsum.photos/200/300" };

const Home = () => {
  const [campings, setCampings] = useState<CampingsType>([]);
  const [pageNo, setPageNo] = useState(1);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getCampings();
  }, []);

  const getCampings = async (no?: number) => {
    const serviceKey = OPENAPI_SERVICE_KEY;
    const data = await getCampingsApi({
      MobileOS: "AND",
      MobileApp: "캠핑 투게더",
      serviceKey: serviceKey,
      _type: "json",
      pageNo: no || pageNo,
    });

    const campingList = data?.response?.body?.items?.item;
    if (campingList) setCampings((prev) => [...prev, ...campingList]);
    
  };

  const handleRefresh = async() => {
    setPageNo(1)
    setRefresh(true)
    setCampings([])
    await getCampings();
    setRefresh(false);
  }

  const handleEndReached = () => {
    setPageNo((prev) => {
      getCampings(prev + 1)
      return prev + 1
    });
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <TopBar rightIsProfile={true} />
      <FlatList
        data={campings}
        keyExtractor={(item: CampingType) => item.facltNm}
        renderItem={({item}) => <CampingItem item={item} />} 
        onEndReached={handleEndReached} 
        onRefresh={handleRefresh}
        refreshing={refresh}
        style={{ marginBottom: 70 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#F5F7F8",
  },
});

export default Home;
