import AsyncStorage from "@react-native-async-storage/async-storage";
import supabase from "../supabaseClient";
import { showInfo } from "./alert";

export const signUpSpb = async (
  email: string,
  password: string,
  nickname: string
): Promise<boolean> => {
  const { data, error: nicknameError } = await supabase
    .from("profile")
    .select("user_id")
    .eq("nickname", nickname);

  if (nicknameError) {
    showInfo("error", nicknameError.message);
    return false;
  }

  if (data && data?.length > 0) {
    showInfo("error", "이미 존재하는 닉네임입니다.");
    return false;
  }

  const { data: user, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });
  if (authError) {
    showInfo("error", authError.message);
    return false;
  }

  const { error: profileError } = await supabase.from("profile").insert([
    {
      user_id: user?.user?.id,
      email: user?.user?.email,
      nickname: nickname,
      introduce: "please edit your introduce",
      profileimagepath: "",
      communitycount: 0,
      favoritecount: 0,
    },
  ]);
  if (profileError) {
    showInfo("error", profileError.message);
    return false;
  }

  showInfo("success", "회원가입에 성공하셨습니다.");
  return true;
};

export const signInSpb = async (
  email: string,
  password: string,
  autoLogin: boolean
): Promise<boolean> => {
  const { data: user, error: authError } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (authError) {
    showInfo("error", authError.message);
    return false;
  }

  if (autoLogin && user.session) {
    const access_token = user.session.access_token;
    const refresh_token = user.session.refresh_token;
    AsyncStorage.setItem(
      "userToken",
      JSON.stringify({ access_token, refresh_token })
    );
  }

  showInfo("success", "로그인에 성공하셨습니다.");
  return true;
};

export const autoSignInSpb = async (): Promise<boolean> => {
  const token = await AsyncStorage.getItem("userToken");

  if (token) {
    const { access_token, refresh_token } = token && JSON.parse(token);

    const { data, error } = await supabase.auth.setSession({
      access_token,
      refresh_token,
    });

    if (error) {
      showInfo("error", error.message);
      return false;
    }
    showInfo("success", "자동 로그인 성공.");
    return true;
  }
  showInfo("error", "토큰을 찾을 수 없습니다.");
  return false;
};

export const signOutSpb = async (): Promise<boolean> => {
  const { error: logoutError } = await supabase.auth.signOut();

  if (logoutError) {
    showInfo("error", logoutError.message);
    return false;
  }
  showInfo("success", "로그아웃에 성공하셨습니다.");
  return true;
};

export const isSignInUser = async (): Promise<boolean> => {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    showInfo("error", error.message);
    return false;
  }
  // 유저 로그인 상태 정상
  return true;
};

export const getSignInUserId = async (): Promise<string> => {
  const { data: userData, error } = await supabase.auth.getUser();
  if (error) {
    showInfo("error", error.message);
    return "";
  }
  // UID 반환
  return userData?.user?.id;
};
