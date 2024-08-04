import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import TopBar from "@/components/common/TopBar";
import Input from "@/components/common/Input";
import { addCommunityApi } from "@/apis/community";
import { RootStackParamList } from "@/components/router/Router";

const backIcon = require("@/assets/icons/Back.png");
const addButton = require("@/assets/icons/bottomTab/add.png");

type AddScreenNavigationProp = StackNavigationProp<RootStackParamList, "Add">;

const Add: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const navigation = useNavigation<AddScreenNavigationProp>();

  const handleSubmit = async () => {
    const res = await addCommunityApi({
      title,
      content,
    });
    // TODO 타입 설정
    if (res.success) {
      console.log("res ++==>", res);
      return;
    }
    navigation.replace("CommunityDetail");
  };

  const handleLeftPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <TopBar
        title="새 글 쓰기"
        leftIcon={backIcon}
        leftClick={handleLeftPress}
        rightIcon={addButton}
        rightClick={handleSubmit}
      />
      <View
        style={{ width: "80%", marginHorizontal: "4%", marginBottom: "2%" }}
      >
        <Input
          value={title}
          setValue={setTitle}
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
