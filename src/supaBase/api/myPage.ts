import uuid from "react-native-uuid";
import supabase from "../supabaseClient";
import { showInfo } from "./alert";
import { getSignInUserId } from "./auth";

// 회원 정보 조회 API 함수
export const getUserSpb = async (
  boolean: boolean = true
): Promise<UserEditData | void> => {
  try {
    const uid = await getSignInUserId();

    if (!uid) {
      showInfo("error", "uid 값을 찾지 못했습니다.");
      return;
    }
    const { data, error } = await supabase
      .from("profile")
      .select("*")
      .eq("user_id", uid)
      .single();

    if (error) {
      showInfo("error", error.message);
      return;
    }

    return data;
  } catch (error) {
    showInfo("error", (error as Error).message);
    return;
  }
};

// 회원 정보 수정 API 함수
export const setUserSpb = async ({
  nickname,
  email,
  introduce,
}: {
  nickname: string;
  email: string;
  introduce: string;
}): Promise<boolean> => {
  try {
    const uid = await getSignInUserId();
    if (!uid) {
      showInfo("error", "uid 값을 찾지 못했습니다.");
      return false;
    }
    const { error } = await supabase
      .from("profile")
      .update({ nickname, email, introduce })
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

export const setProfileSpb = async (image): Promise<string> => {
  const fileName = `${uuid.v4()}${image.name}`;
  const { data, error: uploadError } = await supabase.storage
    .from("profileBucket") // 버킷 이름
    .upload(`profile-images/${fileName}`, image, {
      contentType: image.type,
    });

  if (uploadError) {
    console.error("업로드 오류:", uploadError.message);
    return "";
  }

  // 파일의 URL 생성
  const { data: file } = supabase.storage
    .from("profileBucket")
    .getPublicUrl(`profile-images/${fileName}`);

  const uid = await getSignInUserId();
  await setProfileImagePathSpb(file.publicUrl, uid);

  return file.publicUrl;
};

export const setProfileImagePathSpb = async (profileimagepath, uid) => {
  // profile 테이블의 profileimagepath 컬럼을 업데이트합니다.
  const { data, error } = await supabase
    .from("profile")
    .update({ profileimagepath })
    .eq("user_id", uid);
  if (error) {
    showInfo("error", "프로필 이미지 업로드 하는데 실패하였습니다.");
    return false;
  }
  showInfo("success", "프로필 이미지가 성공적으로 업데이트되었습니다.");
  return true;
};
