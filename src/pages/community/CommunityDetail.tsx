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
  ListRenderItem,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { RootStackParamList } from "@/components/router/Router";
import TopBar from "@/components/common/TopBar";
import { getCommunityApi, addCommunityCommentApi } from "@/apis/community";
import Input from "@/components/common/Input";

const backIcon = require("@/assets/icons/Back.png");
const profileImage = require("@/assets/images/Introduce1.png");
const shareIcon = require("@/assets/icons/Share.png");
const heartIcon = require("@/assets/icons/Heart.png");
const chatIcon = require("@/assets/icons/Chat.png");

type SettingsScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const CommunityDetail = () => {
  const [communityData, setCommunityData] = useState<Community | null>(null);
  const [replys, setReplys] = useState<Reply[]>([]);
  const [inputText, setInputText] = useState("");
  const route = useRoute();
  const { CommunityId } = route.params as { CommunityId: number };
  const navigation = useNavigation<SettingsScreenNavigationProp>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getCommunityApi(CommunityId);
      if (res?.data?.result) {
        setCommunityData(res?.data?.result);
        setReplys(res.data.result.replys);
        console.log(CommunityId);
      }
    };
    fetchData();
  }, [CommunityId]);

  const handlePrev = () => {
    navigation.goBack();
  };

  const handleSend = async () => {
    const res = await addCommunityCommentApi(CommunityId.toString(), inputText);
    if (inputText.trim() === "" || !res?.success) console.log("error =>");
    setInputText("");
    const updatedRes = await getCommunityApi(CommunityId);
    if (updatedRes?.data?.result) {
      setReplys(updatedRes.data.result.replys);
    }
  };

  const renderItem: ListRenderItem<Reply> = ({ item }) => (
    <View style={{ marginBottom: 8 }}>
      <View style={styles.commentWrapper}>
        <View style={styles.otherProfileWrapper}>
          <Image source={profileImage} style={styles.otherProfile} />
        </View>
        <View style={styles.nameWrapper}>
          <Text style={styles.nickName}>{item.nickname}</Text>
          <Text style={styles.id}>{item.createDate}</Text>
        </View>
        <TouchableOpacity activeOpacity={0.8} style={styles.editWrapper}>
          <Text style={styles.editText}>수정</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} style={styles.editWrapper}>
          <Text style={styles.editText}>삭제</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.commentText}>{item.reply}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.wrapper}>
      <TopBar title="상세 보기" leftIcon={backIcon} leftClick={handlePrev} />
      <ScrollView>
        {communityData && (
          <View>
            <View style={{ marginHorizontal: "4%", marginVertical: "2%" }}>
              <View style={styles.userWrapper}>
                <View style={styles.topWrapper}>
                  <View style={styles.imageWrapper}>
                    <Image style={styles.profileImage} source={profileImage} />
                  </View>
                  <View style={styles.nameWrapper}>
                    <Text style={styles.nickName}>
                      {communityData.nickname}
                    </Text>
                    <Text style={styles.id}>{communityData.id}</Text>
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
                <FlatList
                  renderItem={renderItem}
                  data={replys}
                  keyExtractor={(item) => item.replyId.toString()}
                />
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                  <Input
                    value={inputText}
                    setValue={setInputText}
                    placeholder="댓글을 입력해주세요."
                    isBgWhite={false}
                  />
                </View>
                <TouchableOpacity
                  style={styles.sendButton}
                  onPress={handleSend}
                >
                  <Text style={styles.content}>등록</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
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
  nickName: {
    color: "#573353",
    fontWeight: "500",
  },
  id: {
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
  otherProfileWrapper: {
    width: 40,
    height: 40,
    overflow: "hidden",
    alignItems: "center",

    borderRadius: 30,
  },
  otherProfile: {
    width: 140,
    height: 160,
  },
  commentText: {
    marginHorizontal: "4%",
    marginTop: 4,
    color: "#573353",
  },
  inputContainer: {
    width: "100%",
    height: 60,
    backgroundColor: "#FFF",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 12,
    marginTop: 8,
  },
  inputWrapper: {
    width: "80%",
    marginLeft: 4,
  },
  sendButton: {
    width: "20%",
    alignItems: "center",
  },
  editWrapper: {},
  editText: { color: "#999", fontSize: 10 },
});

export default CommunityDetail;
