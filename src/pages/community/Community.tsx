import React, { useState, useEffect } from "react";
import { FlatList, SafeAreaView, StyleSheet} from "react-native";
import { getCommunitysSpb } from "@/supaBase/api/community";
import TopBar from "@/components/common/TopBar";
import CommunityItem from "@/components/community/CommunityItem";
import useStore from "@/store/store";

const Community = () => {
  const {setCommunities, communities} = useStore();
  const [refresh, setRefresh] = useState(false);
  const [pageNo, setPageNo] = useState(1);

  useEffect(() => {
    fetchCommunitysData();
  }, []);

  const fetchCommunitysData = async (page?: number) => {
    const data = await getCommunitysSpb(pageNo || page);
    if (data) setCommunities(data);
  };

  const handleEndReached = () => {
    setPageNo((prev) => {
      fetchCommunitysData(prev + 1)
      return prev + 1
    });
  };

  const pullDown = async() => {
    setRefresh(true);
    setPageNo(1)
    await fetchCommunitysData(1);
    setRefresh(false);
  };  

  return (
    <SafeAreaView style={styles.wrapper}>
      <TopBar rightIsProfile={true} />
      <FlatList
        data={communities}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => <CommunityItem id={item.id} />}
        style={{ marginBottom: 70 }}
        onRefresh={pullDown}
        refreshing={refresh}
        onEndReached={handleEndReached} 
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#efefef",
  },
  topWrapper: {
    flexDirection: "row",
    marginHorizontal: 12,
    marginVertical: 6,
    justifyContent: "space-between",
    alignItems: "center",
  },
  userWrapper: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 3,
  },
  iconWrapper: {
    width: 25,
    height: 25,
    backgroundColor: "rgba(87, 51, 83, 0.2)",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  icon1: {
    width: 15,
    height: 12,
  },
  icon2: {
    width: 15,
    height: 15,
  },

  nickName: {
    color: "#573353",
    fontWeight: "500",
  },
  contentWrapper: {
    backgroundColor: "#FFF",
    height: 80,
    padding: 10,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  contentText: {
    color: "#573353",
  },
  reactionContainer: {
    flexDirection: "row",
    gap: 20,
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  reactionWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },
  reaction: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },
  reactionText: {
    fontSize: 12,
  },
  imageWrapper: {
    overflow: "hidden",
    width: 40,
    height: 40,
    borderRadius: 30,
    alignItems: "center",
  },
  dummyProfileImage: {
    width: 100,
    height: 130,
  },
  userProfileImage: {
    width: 40,
    height: 40,
  },
  subjectWrapper: {
    flex: 1,
    paddingBottom: 30,
    marginLeft: 8,
  },
  subject: {
    color: "#FDA758",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default Community;
