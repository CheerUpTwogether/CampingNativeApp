import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, Image, FlatList } from "react-native";
import TopBar from "@/components/common/TopBar";
import useStore from "@/store/store";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { getMyCommunitiesSpb } from "@/supaBase/api/community";
import FeedGallery from "@/components/common/FeedGallery";

const Settings = () => {
  const {userInfo, myCommunities, setMyCommunities} = useStore();

  const getMyCommunities = async () => {
    const data = await getMyCommunitiesSpb(1);
    console.log(data)
    setMyCommunities(data);
  } 

  useEffect(() => {
    getMyCommunities()
  }, [])

  return (
    <SafeAreaView style={styles.wrapper}>
      <TopBar rightIsProfile={true} />
      <View style={styles.profileContainer}>
        {userInfo.profile ? (
          <Image
            source={{ uri: userInfo.profile }} 
            style={{ width: 110, height: 110, borderRadius: 100, margin: 10 }}
          />
        ) : (
          <Icon name="account-circle" size={120} color="#AEB6B9" />
        )}
        <View style={{justifyContent: 'center'}}>
          <Text style={{fontWeight: 'bold', fontSize: 24, marginBottom: 8, color: "#333"}}>{userInfo.nickname}</Text>
          <Text numberOfLines={3} style={{color: userInfo.introduce ? "#333" : "#777"}}>
            {userInfo.introduce ? userInfo.introduce : '아직 소개글이 없어요! 자신을 표현해보세요'}
          </Text>
        </View>    
      </View>

      {/* 피드 리스트 */}
      {myCommunities?.length ? (
        <FeedGallery feedList={myCommunities} />
      ) : (
        <View>
          <Text>{myCommunities?.length}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
  },
  profileContainer: {
    backgroundColor: '#fff',
    height: 160,
    paddingVertical: 24,
    paddingHorizontal: 12,
    flexDirection: 'row',
  },






  
});

export default Settings;
