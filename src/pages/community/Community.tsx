import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text} from "react-native";
import { CommunityProps } from "@/types/route";
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from "@gorhom/bottom-sheet";
import { getCommunitiesSpb } from "@/supaBase/api/community";
import TopBar from "@/components/common/TopBar";
import CommunityItem from "@/components/community/CommunityItem";
import useStore from "@/store/store";
import Replys from "@/components/community/Replys";
import uuid  from 'react-native-uuid';

const Community = ({route}: CommunityProps) => {
  const {setCommunities, communities} = useStore();
  const [refresh, setRefresh] = useState(false);
  const [reached, setReached] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [communityId, setCommunityId] = useState(0);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const flatListRef = useRef<FlatList>(null); // FlatList의 ref 생성
  let isFinish = false

  // variables
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  // callbacks
  const handlePresentModalPress = useCallback((newCommunityId: number) => {
    bottomSheetModalRef.current?.present();
    setCommunityId(newCommunityId)
  }, []);

  useEffect(() => {
    fetchCommunitysData();
  }, []);

  const fetchCommunitysData = async (page?: number) => {
    const data = await getCommunitiesSpb(page || pageNo);
    if (data) {
      if(page === 1) setCommunities(data);
      else setCommunities([...communities, ...data]);
      if(data.length < 10) isFinish = true
    } else {
      isFinish = true
    }
  };

  const handleEndReached = () => {
    if(isFinish || reached) return
    setReached(true)
    setPageNo((prev) => {
      fetchCommunitysData(prev + 1)
      return prev + 1
    });
  };

  const pullDown = async() => {
    setCommunities([])
    setRefresh(true);
    setReached(false);
    await fetchCommunitysData(1);
    setPageNo(1)
    setRefresh(false);
  };  

  return (
    <SafeAreaView style={styles.wrapper}>
      <BottomSheetModalProvider>
        <TopBar rightIsProfile={true} />
        <FlatList
          data={communities}
          renderItem={({item}) => <CommunityItem id={item.id} handlePresentModalPress={handlePresentModalPress}/>}
          style={{ marginBottom: 70 }}
          onRefresh={pullDown}
          refreshing={refresh}
          onEndReached={handleEndReached} 
          ref={flatListRef} 
        />
        <BottomSheetModal 
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
        >
        <BottomSheetView style={{paddingBottom: 100, flex: 1,}}>
          <Replys communityId={communityId}/>
        </BottomSheetView>
      </BottomSheetModal>
      </BottomSheetModalProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
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
