import { addSignUpApi } from "@/apis/account";
import Button from "@/components/common/Button";
import { RootStackParamList } from "@/components/router/Router";
import { registValid } from "@/utils/validateHelper";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";

import UserIcon from "@/assets/icons/User.svg";
import MailIcon from "@/assets/icons/Email.svg";
import LockIcon from "@/assets/icons/Lock.svg";
import InputWithIcon from "@/components/common/InputWithIcon";

const signupImage = require("@/assets/images/Regist.png");
const googleIcon = require("@/assets/icons/GoogleIcon.png");
const facebookIcon = require("@/assets/icons/FacebookIcon.png");

type SettingsScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const Signup = () => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("01012341231");
  const [password, setPassword] = useState("");

  const navigation = useNavigation<SettingsScreenNavigationProp>();

  const handleSubmit = async () => {
    if (registValid({ email, password, passwordCheck: password, nickname })) {
      const data = await addSignUpApi({
        email,
        password,
        nickname,
        phoneNumber,
      });

      if (data.success) {
        navigation.replace("Login");
      }
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView>
        <View style={styles.signupImageWrapper}>
          <Image style={styles.signupImage} source={signupImage} />
        </View>
        <Text style={styles.signupTitle}>회원가입 </Text>
        <View style={styles.formWrapper}>
          <InputWithIcon
            value={nickname}
            setValue={setNickname}
            placeholder="닉네임을 입력해주세요."
            isBgWhite={true}
            icon={
              <UserIcon
                width={50}
                height={25}
                color={nickname ? "#FDA758" : "#999"}
              />
            }
          />
          <InputWithIcon
            value={email}
            setValue={setEmail}
            placeholder="이메일을 입력해주세요."
            isBgWhite={true}
            icon={
              <MailIcon
                width={50}
                height={22}
                color={email ? "#FDA758" : "#999"}
              />
            }
          />
          <InputWithIcon
            value={password}
            setValue={setPassword}
            placeholder="비밀번호를 입력해주세요."
            isBgWhite={true}
            secureTextEntry={true}
            icon={
              <LockIcon
                width={50}
                height={25}
                color={password ? "#FDA758" : "#999"}
              />
            }
          />
        </View>

        <View style={styles.button}>
          <Button label="회원가입하기" onPress={handleSubmit} />
        </View>
        <View style={styles.socialGroupBar}>
          <View style={styles.socialBar}></View>
          <Text style={styles.socialTitle}>Or sign in with</Text>
          <View style={styles.socialBar}></View>
        </View>

        <View style={styles.socialButtonGroupWrapper}>
          <View style={styles.socialButtonWrapper}>
            <Image source={googleIcon} style={{ width: 23, height: 23 }} />
            <Text style={styles.socialButtonTitle}>Google</Text>
          </View>

          <View style={styles.socialButtonWrapper}>
            <Image source={facebookIcon} style={{ width: 23, height: 23 }} />
            <Text style={styles.socialButtonTitle}>Facebook</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.navigateLoginWrapper}
          onPress={() => {
            navigation.replace("Login");
          }}
        >
          <Text style={styles.defaultText}>회원이세요?</Text>
          <Text style={styles.boldText}>로그인</Text>
        </TouchableOpacity>
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
    backgroundColor: "#FFF3E9",
  },
  signupTitle: {
    textAlign: "center",
    marginTop: 32,
    marginBottom: 64,
    fontSize: 24,
    fontWeight: "700",
    color: "#573353",
  },
  signupImageWrapper: {
    alignItems: "center",
    marginTop: 48,
  },
  signupImage: {
    width: 188,
    height: 200,
  },
  formWrapper: {
    marginHorizontal: 12,
    gap: 8,
  },
  checkboxGroupWrapper: {
    marginLeft: 20,
    marginVertical: 10,
    gap: 12,
  },
  button: {
    marginHorizontal: 12,
    borderRadius: 16,
  },
  socialGroupBar: {
    flexDirection: "row",
    marginHorizontal: 12,
    marginVertical: 12,
    gap: 10,
    alignItems: "center",
  },
  socialBar: {
    flex: 1,
    height: 1,
    backgroundColor: "#573353",
  },
  socialTitle: {
    color: "#573353",
    fontSize: 14,
    fontWeight: "500",
  },
  socialButtonGroupWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  socialButtonWrapper: {
    flexGrow: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    paddingVertical: 8,
    marginHorizontal: 12,
    gap: 20,
    backgroundColor: "#FFF",
  },
  socialButtonTitle: { fontSize: 16, color: "#573353" },
  navigateLoginWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 10,
  },
});

export default Signup;
