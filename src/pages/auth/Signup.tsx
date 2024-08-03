import { addSignUpApi } from "@/apis/account";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { RootStackParamList } from "@/components/router/Router";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";

const signupImage = require("@/assets/images/Regist.png");
const googleIcon = require("@/assets/icons/GoogleIcon.png");
const facebookIcon = require("@/assets/icons/FacebookIcon.png");

type SettingsScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const Signup = () => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState(
    Math.random().toString().substr(2, 7)
  );
  const [phoneNumber, setPhoneNumber] = useState("01012341231");
  const [password, setPassword] = useState("");
  const navigation = useNavigation<SettingsScreenNavigationProp>();

  //   const handleSubmit = () =>{

  //   }

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.signupImageWrapper}>
        <Image style={styles.signupImage} source={signupImage} />
      </View>
      <Text style={styles.signupTitle}>회원가입 </Text>
      <View style={styles.formWrapper}>
        <Input
          value={nickname}
          setValue={(text) => {
            setNickname(text);
          }}
          placeholder="이름을 입력해주세요."
          isBgWhite={true}
        />
        <Input
          value={email}
          setValue={(text) => {
            setEmail(text);
          }}
          placeholder="이메일을 입력해주세요."
          isBgWhite={true}
        />
        <Input
          value={password}
          setValue={(text) => {
            setPassword(text);
          }}
          placeholder="비밀번호를 입력해주세요."
          isBgWhite={true}
        />
      </View>
      <View style={styles.checkboxGroupWrapper}>
        <View style={styles.checkboxWrapper}>
          <View style={styles.checkbox}></View>
          <Text>자동 로그인</Text>
        </View>
        <View style={styles.checkboxWrapper}>
          <View style={styles.checkbox}></View>
          <Text>약관 동의</Text>
        </View>
      </View>
      <View style={styles.button}>
        <Button
          label="회원가입하기"
          onPress={async () => {
            const data = await addSignUpApi({
              email,
              password,
              nickname,
              phoneNumber,
            });

            if (data.success) {
              navigation.replace("Login");
            }
          }}
        />
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
    marginVertical: 16,
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
  checkboxWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    backgroundColor: "#FDA758",
    borderRadius: 4,
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
