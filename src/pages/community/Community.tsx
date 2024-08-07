import React, { useState, useEffect } from "react";
import { RootStackParamList } from "@/components/router/Router";
import { useNavigation } from "@react-navigation/native";
import {
  FlatList,
  SafeAreaView,
  ListRenderItem,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import TopBar from "@/components/common/TopBar";
import { getCommunitysSpb, getUsersSpb } from "@/supaBase/api/community";

const leftIcon = require("@/assets/icons/menu.png");
const shareIcon = require("@/assets/icons/Share.png");
const heartIcon = require("@/assets/icons/Heart.png");
const chatIcon = require("@/assets/icons/Chat.png");
const profileImage = require("@/assets/images/Introduce1.png");

type SettingsScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const Community = () => {
  const [dataList, setDataList] = useState<Community[]>([]);
  const [userProfileData, setUserProfileData] = useState<UserProfile[]>([]);
  const [mergedData, setMergedData] = useState<
    (Community & { profileimagepath: string })[]
  >([]);
  const [refresh, setRefresh] = useState(false);
  const navigation = useNavigation<SettingsScreenNavigationProp>();

  useEffect(() => {
    fetchCommunitysData();
    fetchUserProfileData();
  }, [refresh]);

  useEffect(() => {
    if (dataList.length && userProfileData.length) {
      const merged = dataList.map((item) => {
        const userProfile = userProfileData.find(
          (profile) => profile.user_id === item.user_id
        );
        return {
          ...item,
          profileimagepath: userProfile ? userProfile.profileimagepath : "",
        };
      });
      setMergedData(merged);
    }
  }, [dataList, userProfileData]);

  const fetchUserProfileData = async () => {
    const data: UserProfile[] | null = await getUsersSpb();
    if (data) {
      setUserProfileData(data);
    }
  };
  const fetchCommunitysData = async () => {
    const data = await getCommunitysSpb();
    if (data) {
      const sortedData = data.sort((a, b) => b.id - a.id);
      setDataList(sortedData);
    }
    setRefresh(false);
  };

  const handleMove = (id: number) => {
    navigation.navigate("CommunityDetail", { CommunityId: id });
  };

  const pullDown = () => {
    setRefresh(true);
  };

  const renderItem: ListRenderItem<
    Community & { profileimagepath: string }
  > = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={{ marginHorizontal: "4%", marginVertical: "2%" }}
        onPress={() => handleMove(item.id)}
      >
        <View style={styles.userWrapper}>
          <View style={styles.topWrapper}>
            <View style={{ marginVertical: 3 }}>
              <View style={styles.imageWrapper}>
                <Image
                  source={
                    item.profileimagepath
                      ? { uri: item.profileimagepath }
                      : profileImage
                  }
                  style={
                    item.profileimagepath
                      ? styles.userProfileImage
                      : styles.dummyProfileImage
                  }
                />
              </View>
              <Text style={styles.nickName}>{item.nickname}</Text>
            </View>
            <View style={styles.subjectWrapper}>
              <Text style={styles.subject}>{item.subject}</Text>
            </View>
            <TouchableOpacity style={styles.iconWrapper} activeOpacity={0.8}>
              <Image source={shareIcon} style={styles.icon1} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.contentWrapper}>
          <Text style={styles.contentText}>{item.content}</Text>
          <View style={styles.reactionContainer}>
            <View style={styles.reactionWrapper}>
              <Image style={styles.icon1} source={heartIcon} />
              <Text style={styles.reactionText}>{item.like}</Text>
            </View>
            <View style={styles.reaction}>
              <Image style={styles.icon2} source={chatIcon} />
              <Text style={styles.reactionText}>{item.replyCount}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <TopBar title="커뮤니티" leftIcon={leftIcon} />
      <FlatList
        data={mergedData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        style={{ marginBottom: 70 }}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={pullDown} />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#FFF3E9",
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
