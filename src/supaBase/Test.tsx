import { Text, View } from "react-native";
import { useState } from "react";
import Button from "@/components/common/Button";
import supabase from "./supabaseClient";
import Toast from "react-native-toast-message";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { RootStackParamList } from "@/components/router/Router";
import { useNavigation } from "@react-navigation/native";

type SettingsScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const Test = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const [nickname, setNickname] = useState("testac2");
  const [email, setEmail] = useState("test2@naver.com");
  const [password, setPassword] = useState("123456");

  const handleSignup = async () => {
    console.log("하하");
    const { data: user, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });
    if (authError) {
      Toast.show({
        type: "error",
        text1: authError.message,
      });
      return;
    }

    const { error: profileError } = await supabase.from("profile").insert([
      {
        user_id: user?.user?.id,
        nickname: nickname,
        introduce: "plase edit your introduce",
        profileimagepath: "",
        communitycount: 0,
        favoritecount: 0,
      },
    ]);
    console.log(profileError);
  };

  const handleLogin = async () => {
    console.log("하하");
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log(data);
    console.log(error);

    navigation.replace("TestCommunity");
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    console.log(error);
  };

  return (
    <View>
      <Text>TEST</Text>
      <Button label="가입" onPress={handleSignup}></Button>
      <Button label="로그인" onPress={handleLogin}></Button>
      <Button label="로그아웃" onPress={handleLogout}></Button>
    </View>
  );
};

export default Test;
