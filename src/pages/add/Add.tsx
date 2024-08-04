import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import TopBar from "@/components/common/TopBar";
import Input from "@/components/common/Input";

const backIcon = require("@/assets/icons/Back.png");
const addButton = require("@/assets/icons/bottomTab/add.png");

const Add: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const navigation = useNavigation();

  const handleSubmit = () => {
    console.log("TODO: API 연동");
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
    color: "#FDA758",
    backgroundColor: "#FFF",
    borderRadius: 10,
    height: 370,
    padding: 12,
    fontSize: 15,
  },
});

export default Add;
