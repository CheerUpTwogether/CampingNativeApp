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
import Input from "@/components/common/Input";
import { formatDate } from "@/utils/date";
import {
  addReplySpb,
  deleteReplySpb,
  getReplysSpb,
  setReplysSpb,
} from "@/supaBase/api/reply";
import useStore from "@/store/store";

const profileImage = require("@/assets/images/Introduce1.png");

const Replys: React.FC<{ CommunityId: number }> = ({ CommunityId }) => {
  const [inputText, setInputText] = useState("");
  const [replys, setReplys] = useState<ReplyType[]>([]);
  const [replyId, setReplyId] = useState(0);
  const [replyContent, setReplyContent] = useState("");
  const userInfo = useStore().userInfo;
  useEffect(() => {
    getReplys();
  }, [CommunityId]);

  const getReplys = async () => {
    const data = await getReplysSpb(CommunityId);
    setReplys(data);
  };

  const addReply = async () => {
    const param = {
      community_id: CommunityId,
      reply: inputText,
      user_id: userInfo.user_id,
    };
    const newReply = await addReplySpb(param);
    if (newReply) setReplys((prev) => [...prev, newReply]);
    setInputText("");
  };

  const deleteReply = async (id: number) => {
    const removeReply = await deleteReplySpb(id);
    if (removeReply) setReplys((prev) => prev.filter((el) => el.id !== id));
  };

  const showReplyForm = async (reply: ReplyType) => {
    setReplyId(reply.id);
    setReplyContent(reply.reply);
  };

  const udpateReply = async (replyId: string) => {
    const param = {
      id: Number(replyId),
      reply: replyContent,
    };
    const res = await setReplysSpb(param);
    if (!res) return;

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

        {userInfo.nickname === item.profile.nickname ? (
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => showReplyForm(item)}
            >
              <Text style={styles.editText}>수정</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => deleteReply(item.id)}
            >
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
            <Text style={styles.content}>수정</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.commentText}>{item.reply}</Text>
      )}
    </View>
  );

  return (
    <View style={styles.replyContainer}>
      <FlatList
        renderItem={renderItem}
        data={replys}
        contentContainerStyle={styles.cardcontainer}
        keyExtractor={(item) => String(item.id)}
        ListHeaderComponent={
          <View style={styles.contentsWrapper}>
            <Text style={styles.content}>댓글</Text>
          </View>
        }
      />
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Input
            value={inputText}
            setValue={setInputText}
            placeholder="댓글을 입력해주세요."
            isBgWhite={false}
          />
        </View>
        <TouchableOpacity style={styles.sendButton} onPress={addReply}>
          <Text style={styles.content}>등록</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  replyContainer: {
    flex: 1,
    backgroundColor: "#fff",
    marginHorizontal: "4%",
    paddingTop: "4%",
    marginBottom: 12,
  },
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
