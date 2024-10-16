import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { RootStackParamList } from "@/types/route";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import {
  getProfileSpb,
  kakaoLoginSpb,
  googleLoginSpb,
} from "@/supaBase/api/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import useStore from "@/store/store";
import {
  KakaoOAuthToken,
  login,
  loginWithKakaoAccount,
} from "@react-native-seoul/kakao-login";
import { GOOGLE_IOS_API_KEY, GOOGLE_WEB_API_KEY } from "@env";
import Toast from "react-native-toast-message";
import { Session, User } from "@supabase/supabase-js";
import { setItemSession } from "@/utils/storage";
import KakaoSvg from "@/assets/images/kakao.svg";
const googleIcon = require("@/assets/icons/GoogleIcon.png");
const loginBackground = require("@/assets/images/LoginBackground.png");

type SettingsScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const Login = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const setUserData = useStore((state) => state.setUserData);

  const signInWithGoogle = async (): Promise<void> => {
    try {
      GoogleSignin.configure({
        scopes: ["https://www.googleapis.com/auth/drive.readonly"],
        webClientId: GOOGLE_WEB_API_KEY,
        iosClientId: GOOGLE_IOS_API_KEY,
      });

      await GoogleSignin.signOut();

      // Google Play Services 확인 및 ID 토큰 가져오기
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const idToken = userInfo.data?.idToken;

      if (idToken) {
        const { data: authData, error: authDataError } = await googleLoginSpb(
          idToken
        );

        if (authDataError) {
          Toast.show({ type: "error", text1: "구글 로그인에 실패했어요" });
          return;
        }

        getUserProfile(authData);
      } else {
        Toast.show({ type: "error", text1: "ID 토큰을 가져오지 못했습니다." });
      }
    } catch (e) {
      Toast.show({ type: "error", text1: "구글 로그인에 실패했어요" });
    }
  };

  const signInWithKakao = async (): Promise<void> => {
    try {
      const { idToken, accessToken }: KakaoOAuthToken = await login();
      if (idToken) {
        const { data: authData, error: authDataError } = await kakaoLoginSpb(
          idToken,
          accessToken
        );

        if (authDataError) {
          Toast.show({ type: "error", text1: "카카오 로그인에 실패했어요" });
          return;
        }

        getUserProfile(authData);
      }
    } catch (error) {
      Toast.show({ type: "error", text1: "카카오 로그인에 실패했어요" });
    }
  };

  const getUserProfile = async (authData: {
    user?: User;
    session: Session;
  }) => {
    const { data: profileData, error: profileDataError } = await getProfileSpb(
      authData.session.user.id
    );

    if (profileDataError) {
      Toast.show({ type: "success", text1: "정보를 등록해주세요" });
      navigation.replace("Profile", { init: true });
      // navigation.replace("Profile", { params: { init: true } });
      return;
    }

    if (profileData) {
      // 여기에 zutand profileData 정보가지고 전역설정
      const { user_id, nickname, created_at, profile, introduce } = profileData;

      setUserData(user_id, nickname, created_at, profile, introduce);

      await setItemSession(
        authData.session.access_token,
        authData.session.refresh_token
      );

      navigation.replace("BottomTab", { screen: "Home" });
      return;
    }
    navigation.replace("Profile", { init: true });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Image source={loginBackground} style={styles.imgBackground} />

        <View style={styles.welcomeWrapper}>
          <Text style={styles.welcomeText}>Camping Together</Text>
        </View>

        <TouchableOpacity
          style={styles.googleWrapper}
          onPress={signInWithGoogle}
        >
          <Image source={googleIcon} style={styles.socialImg} />
          <Text style={styles.socialText}>구글로 시작하기</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.kakaoWrapper} onPress={signInWithKakao}>
          <KakaoSvg />
          <Text style={styles.socialText}>카카오로 시작하기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  wrapper: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
  imgBackground: {
    marginBottom: 50,
    width: 350,
    height: 230,
    zIndex: -2,
    alignSelf: "center",
  },
  welcomeWrapper: {
    alignItems: "center",
    marginBottom: 60,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#386641",
  },
  kakaoWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    backgroundColor: "#FFE401",
    paddingVertical: 10,
    marginHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
    width: 300,
  },
  googleWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 28,
    backgroundColor: "#efefef",
    paddingVertical: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
    width: 300,
  },
  socialImg: {
    width: 23,
    height: 23,
  },
  socialText: {
    fontSize: 16,
    color: "#333",
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
