import { addLoginApi } from "@/apis/account";
import { setUserToken } from "@/apis/cookie";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { RootStackParamList } from "@/components/router/Router";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";

const helpIcon = require("@/assets/icons/Help.png");
const googleIcon = require("@/assets/icons/GoogleIcon.png");
const facebookIcon = require("@/assets/icons/FacebookIcon.png");
const loginBackground = require("@/assets/images/LoginBackground.png");

type SettingsScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation<SettingsScreenNavigationProp>();

  const clickLoginBtn = async () => {
    const data = await addLoginApi({
      email,
      password,
    });
    if (data?.success) {
      setUserToken("userData", { email, password });
      navigation.replace("BottomTab");
    }
  };
  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView style={styles.wrapper} showsHorizontalScrollIndicator={false}>
        <Image source={loginBackground} style={styles.imgBackground} />
        <LinearGradient
          colors={[
            "rgba(255, 255, 255, 0)",
            "rgba(255, 255, 255, 0)",
            "#FFF3E9",
          ]}
          locations={[0, 0.8, 1]} // 각 색상의 위치 설정
          style={styles.gradient}
        />
        <View style={styles.subGradient} />

        <View style={{ alignItems: "flex-end" }}>
          <TouchableOpacity style={styles.helpWrapper}>
            <Image source={helpIcon} style={{ width: 22, height: 22 }} />
          </TouchableOpacity>
        </View>
        <View
          style={{ alignItems: "center", marginTop: 230, marginBottom: 60 }}
        >
          <Text style={{ fontSize: 32, fontWeight: "700", color: "#573353" }}>
            환영해요!
          </Text>
        </View>

        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 29,
              backgroundColor: "#FFF",
              paddingVertical: 17,
              marginHorizontal: 20,
              borderRadius: 12,
              marginBottom: 8,
            }}
          >
            <Image source={googleIcon} style={{ width: 23, height: 23 }} />
            <Text style={{ fontSize: 16, color: "#573353" }}>
              Continue with Google
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 29,
              backgroundColor: "#FFF",
              paddingVertical: 17,
              marginHorizontal: 20,
              borderRadius: 12,
            }}
          >
            <Image source={facebookIcon} style={{ width: 23, height: 23 }} />
            <Text style={{ fontSize: 16, color: "#573353" }}>
              Continue with Facebook
            </Text>
          </View>

          <View
            style={{
              height: "100%",
              marginTop: 20,
              backgroundColor: "#FFF",
              paddingHorizontal: 10,
              paddingVertical: 8,
              borderTopStartRadius: 16,
              borderTopEndRadius: 16,
              gap: 5,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: "#573353",
                textAlign: "center",
                marginBottom: 4,
              }}
            >
              이메일로 로그인하기
            </Text>
            <View
              style={{
                height: 1,
                backgroundColor: "#FFF3E9",
                marginBottom: 4,
              }}
            ></View>
            <Input
              value={email}
              setValue={setEmail}
              placeholder="이메일을 입력해주세요."
              isBgWhite={false}
            />
            <Input
              value={password}
              setValue={(text) => {
                setPassword(text);
              }}
              placeholder="비밀번호"
              isBgWhite={false}
            />
            <Button label="로그인" onPress={clickLoginBtn} />
            <Text
              style={{
                textAlign: "center",
                color: "#573353",
                textDecorationLine: "underline",
              }}
            >
              비밀번호 찾기
            </Text>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "center",
                paddingBottom: 20,
              }}
              onPress={() => {
                navigation.replace("Signup");
              }}
            >
              <Text style={styles.defaultText}>아직 회원이 아니세요?</Text>
              <Text style={styles.boldText}>회원가입</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  defaultText: {
    color: "#573353",
  },
  boldText: {
    color: "#573353",
    fontWeight: "700",
  },
  wrapper: {
    flex: 1,
    backgroundColor: "white",
  },
  imgBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: -2,
  },
  gradient: {
    position: "absolute",
    left: 0,
    width: "100%",
    height: "46%",
    zIndex: -1,
  },
  subGradient: {
    width: "100%",
    height: "54%",
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "#FFF3E9",
    zIndex: -1,
  },
  helpWrapper: {
    marginTop: 30,
    marginRight: 20,
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "rgba(87, 51, 83, 0.2)",
  },
});

export default Login;
