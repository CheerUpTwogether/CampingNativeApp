import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ListRenderItem,
} from "react-native";
import { setCommunityCommentApi } from "@/apis/community";
import Input from "@/components/common/Input";
import { formatDate } from "@/utils/date";
import { getUserApi } from "@/apis/myPage";
import { getReplysSpb } from "@/supaBase/api/reply";

const profileImage = require("@/assets/images/Introduce1.png");

const Replys: React.FC<{ CommunityId: number }> = ({ CommunityId }) => {
  const [inputText, setInputText] = useState("");
  const [replys, setReplys] = useState<ReplyType[]>([]);
  const [nickName, setNickName] = useState("");
  const [replyId, setReplyId] = useState(0);
  const [replyContent, setReplyContent] = useState("");

  useEffect(() => {
    getReplys();
    getUserInfo();
  }, [CommunityId]);

  const getUserInfo = async () => {
    const userInfo = await getUserApi();
    userInfo?.result?.nickname && setNickName(userInfo?.result?.nickname);
  };

  const getReplys = async () => {
    setReplys(await getReplysSpb(CommunityId));
  };

  // const handleSend = async () => {
  //   await addCommunityCommentApi(CommunityId.toString(), inputText);
  //   setInputText("");
  //   const updatedRes = await getCommunityApi(CommunityId);
  //   updatedRes?.data?.result && setReplys(updatedRes.data.result.replys);
  // };

  const showReplyForm = async (reply: ReplyType) => {
    setReplyId(reply.id);
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
        if (String(el.id) === replyId) {
          return { ...el, reply: replyContent };
        }
        return el;
      })
    );
    setReplyContent("");
    setReplyId(0);
  };

  const renderItem: ListRenderItem<ReplyType> = ({ item }) => (
    <View style={{ marginBottom: 8 }}>
      <View style={styles.commentWrapper}>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.otherProfileWrapper}>
            <Image source={profileImage} style={styles.otherProfile} />
          </View>

          <View style={{ paddingTop: 10, paddingLeft: 12 }}>
            <Text style={styles.nickName}>{item.profile.nickname}</Text>
            <Text style={styles.id}>{formatDate(item.create_date)}</Text>
          </View>
        </View>

        {nickName === item.profile.nickname ? (
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

      {replyId === item.id ? (
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
            onPress={() => udpateReply(String(item.id))}
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
          keyExtractor={(item) => String(item.id)}
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
        {/* <TouchableOpacity style={styles.sendButton} onPress={handleSend}> */}
        <TouchableOpacity style={styles.sendButton}>
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
  deleteText: {
    color: "#F44336",
    fontSize: 10,
    paddingTop: 8,
    paddingLeft: 8,
  },
  editText: {
    color: "#999",
    fontSize: 10,
    paddingTop: 8,
    paddingLeft: 8,
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
  nickName: {
    color: "#573353",
    fontWeight: "500",
  },
  id: {
    color: "rgba(87, 51, 83, 0.4)",
    fontWeight: "500",
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
