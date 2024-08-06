import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Toast from "react-native-toast-message";
import TopBar from "@/components/common/TopBar";
import Input from "@/components/common/Input";
import { addCommunityApi, setCommunityApi } from "@/apis/community";
import { RootStackParamList } from "@/components/router/Router";
import {
  addCommunitySpb,
  setCommunityCommentSpb,
  setCommunitySpb,
} from "@/supaBase/api/community";
const backIcon = require("@/assets/icons/Back.png");
const addButton = require("@/assets/icons/bottomTab/add.png");
import useStore from "@/store/store";

type AddScreenNavigationProp = StackNavigationProp<RootStackParamList, "Add">;
type AddScreenRouteProp = RouteProp<RootStackParamList, "Add">;

const Add: React.FC = () => {
  const [subject, setSubject] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const navigation = useNavigation<AddScreenNavigationProp>();
  const route = useRoute<AddScreenRouteProp>();
  const userInfo = useStore().userInfo;

  const isEdit = route.params?.isEdit ?? false;
  const communityId = route.params?.communityId ?? null;
  const initialSubject = route.params?.subject ?? "";
  const initialContent = route.params?.content ?? "";

  useEffect(() => {
    if (isEdit) {
      setSubject(initialSubject ?? "");
      setContent(initialContent ?? "");
    }
  }, [isEdit, initialSubject, initialContent]);

  const handleSubmit = async () => {
    let res;
    if (isEdit) {
      res = await setCommunitySpb(Number(communityId), subject, content);
      navigation.navigate("CommunityDetail", {
        CommunityId: Number(communityId),
      });
    } else {
      res = await addCommunitySpb(userInfo.user_id, subject, content);
    }

    if (res) {
      Toast.show({
        type: "success",
        text1: isEdit ? "커뮤니티를 수정했습니다." : "커뮤니티를 생성했습니다.",
      });
      navigation.navigate("BottomTab", { screen: "Community" });
    }
  };

  const handleLeftPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <TopBar
        title={isEdit ? "수정하기" : "새 글 쓰기"}
        leftIcon={backIcon}
        leftClick={handleLeftPress}
        rightIcon={addButton}
        rightClick={handleSubmit}
      />
      <View
        style={{ width: "80%", marginHorizontal: "4%", marginBottom: "2%" }}
      >
        <Input
          value={subject}
          setValue={setSubject}
          placeholder="제목을 입력해주세요."
        />
      </View>
      <View style={{ marginHorizontal: 16, marginVertical: 20 }}>
        <TextInput
          style={styles.textInput}
          value={content}
          onChangeText={setContent}
          autoCapitalize="none"
          multiline={true}
          numberOfLines={5}
          maxLength={1000}
          textAlignVertical="top"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#FFF3E9",
  },
  textInput: {
    backgroundColor: "#FFF",
    color: "#FDA758",
    borderRadius: 10,
    height: 370,
    padding: 12,
    fontSize: 15,
  },
});

export default Add;
