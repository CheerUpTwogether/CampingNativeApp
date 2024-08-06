import { uploadImage } from "@/utils/imageHelper";
import supabase from "../supabaseClient";
import { showInfo } from "./alert";
import { getSignInUserId } from "./auth";

// 회원 정보 조회 API 함수
export const getUserSpb = async (): Promise<{ [key: string]: any } | null> => {
  try {
    const uid = await getSignInUserId();

    if (!uid) {
      showInfo("error", "uid 값을 찾지 못했습니다.");
      return null;
    }
    const { data, error } = await supabase
      .from("profile")
      .select("*")
      .eq("user_id", uid)
      .single();

    if (error) {
      showInfo("error", error.message);
      return null;
    }
    showInfo("success", "프로필 조회에 성공하였습니다.");
    return data;
  } catch (error) {
    console.log((error as Error).message);
    showInfo("error", (error as Error).message);
    return null;
  }
};

type ProfileUpdate = {
  nickname: string;
  name: string;
  introduce: string;
};

// 회원 정보 수정 API 함수
export const setUserSpb = async (
  nickname: string,
  name: string,
  introduce: string
): Promise<boolean> => {
  try {
    const uid = await getSignInUserId();
    if (!uid) {
      showInfo("error", "uid 값을 찾지 못했습니다.");
      return false;
    }
    const { error } = await supabase
      .from("profile")
      .update({ nickname, name, introduce })
      .eq("user_id", uid);

    if (error) {
      showInfo("error", error.message);
      return false;
    }
    showInfo("success", "프로필 수정에 성공하였습니다.");
    return true;
  } catch (error) {
    showInfo("error", (error as Error).message);
    return false;
  }
};

// 프로필 이미지 변경 API 함수
export const setProfileCameraSpb = async (
  base64Image: string
): Promise<boolean> => {
  try {
    const uid = await getSignInUserId();
    if (!uid) {
      showInfo("error", "uid 값을 찾지 못했습니다.");
      return false;
    }

    // Base64 문자열을 Blob으로 변환 후 업로드
    const fileName = `${uid}-profile-image.jpg`; // 파일 이름 지정
    const publicURL = await uploadImage(base64Image, fileName);
    if (!publicURL) {
      showInfo("error", "스토리지에 이미지 업로드 하는데 실패하였습니다.");
      return false;
    }
    // profile 테이블의 profileimagepath 컬럼을 업데이트합니다.
    const { data, error } = await supabase
      .from("profile")
      .update({ profileimagepath: publicURL })
      .eq("user_id", uid);

    if (error) {
      showInfo("error", "프로필 이미지 업로드 하는데 실패하였습니다.");
      return false;
    }
    showInfo("success", "프로필 이미지가 성공적으로 업데이트되었습니다.");
    return true;
  } catch (error) {
    showInfo("error", (error as Error).message);
    return false;
  }
};
