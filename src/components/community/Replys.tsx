import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  
  Dimensions,
} from "react-native";
import Input from "@/components/common/Input";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { formatDate } from "@/utils/date";
import { addReplySpb, getReplysSpb } from "@/supaBase/api/reply";
import useStore from "@/store/store";
import DynamicTextInput from "../common/DynamicTextInput";

const Replys: React.FC<{ communityId: number }> = ({ communityId }) => {
  const [replys, setReplys] = useState<ReplyType[]>([]);
  const [reply, setReply] = useState('');
  const {user_id} = useStore().userInfo;

  useEffect(() => {
    getReplys();
  }, [communityId]);

  const getReplys = async () => {
    const data = await getReplysSpb(communityId);
    setReplys(data);
  };

  const addComment = async() => {
    const data = await addReplySpb({
      community_id: communityId,
      user_id,
      reply
    });
    if(data) setReplys([data, ...replys])
  }

  return (
    <View style={styles.replyContainer}>
      <FlatList
        renderItem={({item}) => (
          <View style={styles.commentWrapper}>
            <View style={styles.profileContainer}>
              {
                item?.profile?.profile ?
                <Image source={{uri: item?.profile?.profile}} style={styles.profileImage}/> :
                <Icon name="account-circle" size={32} color="#AEB6B9" style={{marginRight: 4}}/>
              }
              <Text style={styles.nickname}>{item?.profile?.nickname || ''}</Text>
            </View>
            <Text style={{color: '#333', fontSize: 16}}>{item.reply}</Text>
          </View>
        )}
        data={replys}
        keyExtractor={(item) => String(item.id)}
        ListHeaderComponent={
          <View>
            <View style={styles.contentsWrapper}>
              <Text style={styles.title}>댓글</Text>
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <DynamicTextInput setText={setReply} text={reply}/>
              </View>
              <TouchableOpacity style={styles.sendButton} onPress={addComment}>
                <Text style={styles.sendButtonText}>등록</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
      />
    </View>
  );
};

const width = Dimensions.get("window").width; 

const styles = StyleSheet.create({
  replyContainer: {
    backgroundColor: "#fff",
    marginHorizontal: 12,
    paddingTop: 8,
    marginBottom: 12,
  },
  contentsWrapper: {
    marginHorizontal: 12,
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  inputContainer: {
    width: '100%',
    backgroundColor: "#FFF",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'flex-start',
    borderRadius: 12,
    marginTop: 8,
  },  
  inputWrapper: {
    width: width - 120,
    marginLeft: 4,
  },
  sendButton: {
    width: 80,
    alignItems: "center",
    backgroundColor: "#6a994e",
    padding: 12,
    borderRadius: 10,
  },
  sendButtonText: {
    fontWeight: "600",
    fontSize: 16,
    color: "#FFF",
  },
  commentWrapper: {
    marginHorizontal: 8,
    marginTop: 12,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  nickname: {
    color: "#333",
    fontSize: 14,
    fontWeight: "600"
  },



  commentContainer: {
    backgroundColor: "#FFF",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
 
  otherProfileWrapper: {
    width: 32,
    height: 32,
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
  
  nickName: {
    color: "#573353",
    fontWeight: "500",
  },
  id: {
    color: "rgba(87, 51, 83, 0.4)",
    fontWeight: "500",
  },
  profileImage: {
    width: 40, 
    height: 40, 
    marginRight: 8, 
    borderRadius: 100
  },
  
  content: {
    fontSize: 15,
    color: "#573353",
  },
 
});
export default Replys;
