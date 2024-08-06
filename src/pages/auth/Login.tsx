import React, { useState } from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Button from "@/components/common/Button";
import InputWithIcon from "@/components/common/InputWithIcon";
import LinearGradient from "react-native-linear-gradient";
import { RootStackParamList } from "@/components/router/Router";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";

const helpIcon = require("@/assets/icons/Help.png");
const googleIcon = require("@/assets/icons/GoogleIcon.png");
const facebookIcon = require("@/assets/icons/FacebookIcon.png");
const loginBackground = require("@/assets/images/LoginBackground.png");
import LockIcon from "@/assets/icons/Lock.svg";
import MailIcon from "@/assets/icons/Email.svg";
import { loginValid } from "@/utils/validateHelper";
import CheckBox from "@/components/common/CheckBox";

import WelcomeModal from "@/components/common/WelcomeModal";
import { signInSpb } from "@/supaBase/api/auth";
import { getUserSpb } from "@/supaBase/api/myPage";
import useStore from "@/store/store";

type SettingsScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const Login = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAutoLogin, setIsAutoLogin] = useState(false);
  const [isVisibleModal, setisVisibleModal] = useState(false);
  const setUserData = useStore((state) => state.setUserData);

  const clickLoginBtn = async () => {
    if (loginValid({ email, password })) {
      // 로그인이 되어있는지 확인.
      const isLogin = await signInSpb(email, password);

      if (!isLogin) return;

      // 로그인한 유저 프로필 정보
      const data = await getUserSpb();

      // zustand 전역 상태 관리
      setUserData(data);

      setisVisibleModal(true);
      navigation.replace("BottomTab", { screen: "Home" });
    }
  };

  const moveSignup = () => {
    navigation.replace("Signup");
  };

  const iconColor = (text: string) => (!!text ? "#FDA758" : "#999");

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

        <View style={styles.helpContainer}>
          <TouchableOpacity style={styles.helpWrapper}>
            <Image source={helpIcon} style={styles.helpIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.welcomeWrapper}>
          <Text style={styles.welcomeText}>환영해요!</Text>
        </View>

        <View style={{ flex: 1 }}>
          <View style={styles.socialWrapper}>
            <Image source={googleIcon} style={styles.socialImg} />
            <Text style={styles.socialText}>Continue with Google</Text>
          </View>

          <View style={styles.socialWrapper}>
            <Image source={facebookIcon} style={styles.socialImg} />
            <Text style={styles.socialText}>Continue with Facebook</Text>
          </View>

          <Text style={styles.formTitle}>이메일로 로그인하기</Text>
          <View style={styles.formWrapper}>
            <InputWithIcon
              value={email}
              setValue={setEmail}
              placeholder="이메일을 입력해주세요."
              isBgWhite={false}
              icon={
                <MailIcon width={50} height={20} color={iconColor(email)} />
              }
            />
            <InputWithIcon
              value={password}
              setValue={setPassword}
              placeholder="비밀번호"
              isBgWhite={false}
              secureTextEntry={true}
              icon={
                <LockIcon width={50} height={22} color={iconColor(password)} />
              }
            />
            <View style={styles.CheckBoxGroupContainer}>
              <View style={styles.CheckBoxContainer}>
                <CheckBox
                  isChecked={isAutoLogin}
                  setIsChecked={setIsAutoLogin}
                />
                <Text>자동 로그인</Text>
              </View>
            </View>

            <Button label="로그인" onPress={clickLoginBtn} />
            <Text style={styles.formTitle}>비밀번호 찾기</Text>
            <TouchableOpacity style={styles.signupBtn} onPress={moveSignup}>
              <Text style={styles.defaultText}>아직 회원이 아니세요?</Text>
              <Text style={styles.boldText}>회원가입</Text>
            </TouchableOpacity>
            <WelcomeModal
              isVisible={isVisibleModal}
              onClose={() => setisVisibleModal(false)}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
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
  helpContainer: { alignItems: "flex-end" },
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
  helpIcon: {
    width: 22,
    height: 22,
  },
  welcomeWrapper: {
    alignItems: "center",
    marginTop: 230,
    marginBottom: 60,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#573353",
  },
  socialWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 29,
    backgroundColor: "#FFF",
    paddingVertical: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  socialImg: {
    width: 23,
    height: 23,
  },
  socialText: {
    fontSize: 16,
    color: "#573353",
  },
  formWrapper: {
    height: "100%",
    backgroundColor: "#FFF",
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 5,
  },
  formTitle: {
    fontSize: 16,
    color: "#573353",
    textAlign: "center",
    backgroundColor: "#fff",
    marginTop: 20,
    paddingVertical: 12,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginBottom: 1,
  },
  signupBtn: {
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: 20,
  },
  defaultText: {
    color: "#573353",
  },
  boldText: {
    color: "#573353",
    fontWeight: "700",
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  CheckBoxGroupContainer: {
    gap: 10,
  },
  CheckBoxContainer: {
    flexDirection: "row",
    alignItems: "center",

    gap: 10,
  },
});

export default Login;
