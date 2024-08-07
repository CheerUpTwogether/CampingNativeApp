import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { RootStackParamList } from "@/components/router/Router";
import TopBar from "@/components/common/TopBar";
import Replys from "@/components/community/Replys";
import {
  getCommunitySpb,
  deleteCommunitySpb,
  getUsersSpb,
} from "@/supaBase/api/community";
import useStore from "@/store/store";

const backIcon = require("@/assets/icons/Back.png");
const profileImage = require("@/assets/images/Introduce1.png");
const shareIcon = require("@/assets/icons/Share.png");
const heartIcon = require("@/assets/icons/Heart.png");
const chatIcon = require("@/assets/icons/Chat.png");

type SettingsScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const CommunityDetail = () => {
  const [communityData, setCommunityData] = useState<Community>();
  const [userProfileData, setUserProfileData] = useState<UserProfile[]>([]);
  const [userId, setUserId] = useState("");
  const route = useRoute();
  const { CommunityId } = route.params as { CommunityId: number };
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const userInfo = useStore().userInfo;

  useEffect(() => {
    fetchCommunityData();
    fetchUserProfileData();
    setUserId(userInfo.user_id);
  }, [CommunityId]);

  const handlePrev = () => {
    navigation.goBack();
  };

  const fetchCommunityData = async () => {
    const data = await getCommunitySpb(CommunityId);
    if (data) {
      setCommunityData(data);
    }
  };

  const fetchUserProfileData = async () => {
    const data: UserProfile[] | null = await getUsersSpb();
    if (data) {
      setUserProfileData(data);
    }
  };

  const handleEdit = () => {
    if (communityData) {
      navigation.navigate("Add", {
        isEdit: true,
        communityId: communityData.id.toString(),
        subject: communityData.subject,
        content: communityData.content,
      });
    }
  };

  const handleDelete = async () => {
    try {
      const res = await deleteCommunitySpb(CommunityId);
      if (res) {
        Toast.show({
          type: "success",
          text1: "커뮤니티를 삭제했습니다.",
        });
        navigation.navigate("Community");
      }
    } catch (error) {
      if (error instanceof Error) {
        Toast.show({
          type: "error",
          text1: "다시 시도해주세요.",
          text2: error.message,
        });
      } else {
        Toast.show({
          type: "error",
          text1: "삭제에 실패했습니다.",
          text2: "알 수 없는 오류가 발생했습니다.",
        });
      }
    }
  };

  const getProfileImage = (userId: string) => {
    const userProfile = userProfileData.find(
      (profile) => profile.user_id === userId
    );
    return userProfile ? userProfile.profileimagepath : "";
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <TopBar title="상세 보기" leftIcon={backIcon} leftClick={handlePrev} />
      {communityData && (
        <View>
          <View style={{ marginHorizontal: "4%", marginVertical: "2%" }}>
            <View style={styles.userWrapper}>
              <View style={styles.topWrapper}>
                <View style={{ gap: 6 }}>
                  <View style={styles.imageWrapper}>
                    <Image
                      source={
                        getProfileImage(communityData.user_id)
                          ? { uri: getProfileImage(communityData.user_id) }
                          : profileImage
                      }
                      style={
                        getProfileImage(communityData.user_id)
                          ? styles.userProfileImage
                          : styles.dummyProfileImage
                      }
                    />
                  </View>
                  <Text style={styles.nickName}>{communityData.nickname}</Text>
                </View>
                <View style={styles.subjectWrapper}>
                  <Text style={styles.subject}>{communityData.subject}</Text>
                </View>

                <View style={styles.rightTopContainer}>
                  {userInfo.user_id === communityData.user_id && (
                    <View style={styles.editButtonContainer}>
                      <TouchableOpacity
                        onPress={handleEdit}
                        activeOpacity={0.8}
                      >
                        <Text style={styles.editText}>수정</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={handleDelete}
                      >
                        <Text style={styles.deleteText}>삭제</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  <TouchableOpacity
                    style={styles.iconWrapper}
                    activeOpacity={0.8}
                  >
                    <Image source={shareIcon} style={styles.icon1} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={styles.contentWrapper}>
              <Text style={styles.contentText}>{communityData.content}</Text>
              <View style={styles.reactionContainer}>
                <View style={styles.reactionWrapper}>
                  <Image style={styles.icon1} source={heartIcon} />
                  <Text style={styles.reactionText}>{communityData.like}</Text>
                </View>
                <View style={styles.reaction}>
                  <Image style={styles.icon2} source={chatIcon} />
                  <Text style={styles.reactionText}>
                    {communityData.replyCount}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
      <Replys CommunityId={CommunityId} />
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
    gap: 4,
    marginHorizontal: 12,
    marginVertical: 8,
    justifyContent: "space-between",
    alignItems: "center",
  },
  userWrapper: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    marginBottom: 3,
    paddingHorizontal: "4%",
    paddingVertical: "2%",
  },
  iconWrapper: {
    width: 25,
    height: 25,
    backgroundColor: "rgba(87, 51, 83, 0.2)",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  icon1: {
    width: 15,
    height: 12,
  },
  icon2: {
    width: 15,
    height: 15,
  },
  subjectWrapper: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  nickName: {
    color: "#573353",
    fontWeight: "500",
    marginBottom: 5,
  },
  subject: {
    color: "#FDA758",
    fontWeight: "600",
    fontSize: 16,
  },
  contentWrapper: {
    backgroundColor: "#FFF",
    height: 80,
    padding: 10,
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
    width: 70,
    height: 100,
  },
  userProfileImage: { width: 40, height: 40 },
  editButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  editText: {
    color: "#999",
    fontSize: 10,
    paddingTop: 8,
    paddingLeft: 8,
  },
  deleteText: {
    color: "#F44336",
    fontSize: 10,
    paddingTop: 8,
    paddingLeft: 8,
  },
  rightTopContainer: {
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 6,
    marginRight: 8,
    marginBottom: 18,
  },
});

export default CommunityDetail;
