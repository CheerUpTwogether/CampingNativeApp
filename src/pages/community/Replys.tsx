import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ListRenderItem,
} from "react-native";
import { getCommunityApi, addCommunityCommentApi } from "@/apis/community";
import Input from "@/components/common/Input";

const profileImage = require("@/assets/images/Introduce1.png");

const Replys = ({ CommunityId }) => {
  const [inputText, setInputText] = useState("");
  const [replys, setReplys] = useState<Reply[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getCommunityApi(CommunityId);
      if (res?.data?.result) {
        setReplys(res.data.result.replys);
        console.log(CommunityId);
      }
    };
    fetchData();
  }, [CommunityId]);

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
    <View>
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
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.content}>등록</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  editText: { color: "#999", fontSize: 10 },
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

  inputWrapper: {
    width: "80%",
    marginLeft: 4,
  },
  sendButton: {
    width: "20%",
    alignItems: "center",
  },
  editWrapper: {},
});
export default Replys;
