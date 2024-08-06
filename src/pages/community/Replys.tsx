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
import {
  getCommunityApi,
  addCommunityCommentApi,
  setCommunityCommentApi,
} from "@/apis/community";
import Input from "@/components/common/Input";
import { formatDate } from "@/utils/date";
import { getStorage } from "@/utils/storage";
import { getUserApi } from "@/apis/myPage";

const profileImage = require("@/assets/images/Introduce1.png");

const Replys: React.FC<{ CommunityId: number }> = ({ CommunityId }) => {
  const [inputText, setInputText] = useState("");
  const [replys, setReplys] = useState<Reply[]>([]);
  const [nickName, setNickName] = useState("");
  const [replyId, setReplyId] = useState(0);
  const [replyContent, setReplyContent] = useState("");

  useEffect(() => {
    getReplys();
    getUserInfo();
  }, [CommunityId]);

  const getUserInfo = async () => {
    const userInfo = await getUserApi();
    userInfo?.result?.nickName && setNickName(userInfo?.result?.nickName);
  };

  const getReplys = async () => {
    const res = await getCommunityApi(CommunityId);
    res?.data?.result && setReplys(res.data.result.replys);
  };

  const handleSend = async () => {
    await addCommunityCommentApi(CommunityId.toString(), inputText);
    setInputText("");
    const updatedRes = await getCommunityApi(CommunityId);
    updatedRes?.data?.result && setReplys(updatedRes.data.result.replys);
  };

  const showReplyForm = async (reply: Reply) => {
    setReplyId(reply.replyId);
    setReplyContent(reply.reply);
  };

  const udpateReply = async (replyId: string) => {
    const param = {
      communityId: String(CommunityId),
      replyId,
      reply: replyContent,
    };
    const res = await setCommunityCommentApi(param);
    if (!res?.data?.success) return;

    setReplys((prev) =>
      prev.map((el) => {
        if (String(el.replyId) === replyId) {
          return { ...el, reply: replyContent };
        }
        return el;
      })
    );
    setReplyContent("");
    setReplyId(0);
  };

  const renderItem: ListRenderItem<Reply> = ({ item }) => (
    <View style={{ marginBottom: 8 }}>
      <View style={styles.commentWrapper}>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.otherProfileWrapper}>
            <Image source={profileImage} style={styles.otherProfile} />
          </View>

          <View style={{ paddingTop: 10, paddingLeft: 12 }}>
            <Text style={styles.nickName}>{item.nickname}</Text>
            <Text style={styles.id}>{formatDate(item.createDate)}</Text>
          </View>
        </View>

        {nickName === item.nickname ? (
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => showReplyForm(item)}
            >
              <Text style={styles.editText}>수정</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8}>
              <Text style={styles.deleteText}>삭제</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <></>
        )}
      </View>

      {replyId === item.replyId ? (
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Input
              value={replyContent}
              setValue={setReplyContent}
              placeholder="댓글을 입력해주세요."
              isBgWhite={false}
            />
          </View>
          <TouchableOpacity
            style={styles.sendButton}
            onPress={() => udpateReply(String(item.replyId))}
          >
            <Text style={styles.content}>등록</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.commentText}>{item.reply}</Text>
      )}
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
    marginTop: 12,
    justifyContent: "space-between",
    alignItems: "flex-start",
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
    marginBottom: 12,
    color: "#573353",
  },

  deleteText: { color: "#F44336", fontSize: 10, paddingTop: 8, paddingLeft: 8 },
  editText: { color: "#999", fontSize: 10, paddingTop: 8, paddingLeft: 8 },
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
    padding: 8,
    marginLeft: 4,
  },
  sendButton: {
    width: "20%",
    alignItems: "center",
  },
});
export default Replys;
