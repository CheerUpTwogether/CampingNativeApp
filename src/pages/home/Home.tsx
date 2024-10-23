import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, StyleSheet, Platform, FlatList } from "react-native";
import TopBar from "@/components/common/TopBar";
import { getCampingsApi } from "@/api";
import { OPENAPI_SERVICE_KEY } from "@env";
import CampingItem from "@/components/home/CampingItem";
import SkeletonCampingItem from "@/components/skeleton/SkeletonCampingItem";

const profile = { uri: "https://picsum.photos/200/300" };

const Home = () => {
  const [campings, setCampings] = useState<CampingsType>([]);
  const [pageNo, setPageNo] = useState(1);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getCampings();
  }, []);

  const getCampings = async (no?: number) => {
    setLoading(true);
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
    setLoading(false);
  };
  const handleRefresh = async () => {
    setPageNo(1);
    setRefresh(true);
    setCampings([]);
    await getCampings();
    setRefresh(false);
  };

  const handleEndReached = () => {
    setPageNo((prev) => {
      getCampings(prev + 1);
      return prev + 1;
    });
  };

  const skeletonData = Array(5).fill({});

  return (
    <SafeAreaView style={styles.wrapper}>
      <TopBar rightIsProfile={true} />
      <FlatList
        data={loading ? skeletonData : campings}
        keyExtractor={(item, index) =>
          loading ? `skeleton-${index}` : item.facltNm
        }
        renderItem={({ item }) =>
          loading ? <SkeletonCampingItem /> : <CampingItem item={item} />
        }
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
