import { Text, View } from "react-native";
import { useState } from "react";
import Button from "@/components/common/Button";
import supabase from "./supabaseClient";
import Toast from "react-native-toast-message";

const TestCommunity = () => {
  const handleAddFeed = async () => {
    // 현재 로그인한 사용자 정보 가져오기
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.error("User is not logged in");
      return;
    }

    // 피드 데이터 삽입
    const { data, error } = await supabase.from("feed").insert([
      {
        content: "테스트1",
        nickname: "아무거나",
        tags: ["가", "니"],
        images: ["img1", "img2"],
        user_id: user.id, // 현재 로그인한 사용자의 ID를 설정
      },
    ]);

    if (error) {
      console.error("Error creating feed:", error);
    } else {
      console.log("Feed created successfully:", data);
    }
  };

  return (
    <View>
      <Text>TEST Community</Text>
      <Button label="게시글생성" onPress={handleAddFeed}></Button>
    </View>
  );
};

export default TestCommunity;
