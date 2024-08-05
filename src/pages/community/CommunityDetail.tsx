import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
} from "react-native";
import { useNavigation, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { RootStackParamList } from "@/components/router/Router";
import TopBar from "@/components/common/TopBar";
import { getCommunityApi } from "@/apis/community";

const backIcon = require("@/assets/icons/Back.png");
const profileImage = require("@/assets/images/Introduce1.png");
const shareIcon = require("@/assets/icons/Share.png");
const heartIcon = require("@/assets/icons/Heart.png");
const chatIcon = require("@/assets/icons/Chat.png");

type SettingsScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

interface CommunityDetailRouteProp {
  route: RouteProp<RootStackParamList, "CommunityDetail">;
}

const CommunityDetail: React.FC<CommunityDetailRouteProp> = ({ route }) => {
  const [communityData, setCommunityData] = useState<Community | null>();
  const communityId = route.params.CommunityId;
  const navigation = useNavigation<SettingsScreenNavigationProp>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getCommunityApi(communityId);
      setCommunityData(res?.data?.result);
    };
    fetchData();
  }, [communityId]);

  const handlePrev = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <TopBar title="상세 보기" leftIcon={backIcon} leftClick={handlePrev} />
      <View>
        {communityData && (
          <View>
            <View style={{ marginHorizontal: "4%", marginVertical: "2%" }}>
              <View style={styles.userWrapper}>
                <View style={styles.topWrapper}>
                  <View style={styles.imageWrapper}>
                    <Image style={styles.profileImage} source={profileImage} />
                  </View>
                  <View style={styles.nameWrapper}>
                    <Text style={styles.name}>이름</Text>
                    <Text style={styles.nickName}>
                      {communityData.nickname}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.iconWrapper}
                  activeOpacity={0.8}
                >
                  <Image source={shareIcon} style={styles.icon1} />
                </TouchableOpacity>
              </View>

              <View style={styles.contentWrapper}>
                <Text style={styles.contentText}>{communityData.content}</Text>
                <View style={styles.reactionContainer}>
                  <View style={styles.reactionWrapper}>
                    <Image style={styles.icon1} source={heartIcon} />
                    <Text style={styles.reactionText}>
                      {communityData.like}
                    </Text>
                  </View>
                  <View style={styles.reaction}>
                    <Image style={styles.icon2} source={chatIcon} />
                    <Text style={styles.reactionText}>
                      {communityData.replyCount}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.commentContainer}>
                <View style={styles.contentsWrapper}>
                  <Text style={styles.content}>댓글</Text>
                </View>
                {/* FlatList 시작 */}
                <View style={{ marginBottom: 8 }}>
                  <View style={styles.commentWrapper}>
                    <Image source={heartIcon} style={styles.otherProfile} />
                    <View style={styles.nameWrapper}>
                      <Text style={styles.name}>이름</Text>
                      <Text style={styles.nickName}>닉네임</Text>
                    </View>
                  </View>
                  <Text style={styles.commentText}>댓글 내용</Text>
                </View>
                {/* FlatList 종료 */}
              </View>
            </View>
          </View>
        )}
      </View>
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
    margin: 12,
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
  nameWrapper: {
    gap: 2,
    justifyContent: "center",
  },
  name: {
    color: "#573353",
    fontWeight: "500",
  },
  nickName: {
    color: "rgba(87, 51, 83, 0.4)",
    fontWeight: "500",
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
    marginBottom: 12,
  },
  profileImage: {
    width: 70,
    height: 100,
  },
  contentsWrapper: {
    marginTop: 50,
    marginHorizontal: "4%",
    marginBottom: 10,
  },
  content: {
    fontSize: 15,
    color: "#573353",
  },
  commentContainer: {
    backgroundColor: "#FFF",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  commentWrapper: {
    flexDirection: "row",
    marginHorizontal: "4%",
    marginVertical: 12,
    gap: 10,
  },
  otherProfile: {
    width: 40,
    height: 40,
  },
  commentText: {
    marginHorizontal: "4%",
    marginTop: 4,
    color: "#573353",
  },
});

export default CommunityDetail;
