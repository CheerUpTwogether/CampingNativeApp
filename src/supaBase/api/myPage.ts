import { uploadImage } from "@/utils/imageHelper";
import supabase from "../supabaseClient";
import { showInfo } from "./alert";
import { getSignInUserId } from "./auth";
import useStore from "@/store/store";

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
    console.log("hellowWorld");
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

// 프로필 이미지 변경 API 함수
// export const setProfileCameraSpb = async (
//   base64Image: string
// ): Promise<boolean> => {
//   try {
//     const uid = await getSignInUserId();
//     if (!uid) {
//       showInfo("error", "uid 값을 찾지 못했습니다.");
//       return false;
//     }

//     // Base64 문자열을 Blob으로 변환 후 업로드
//     const fileName = `${uid}-profile-image.jpg`; // 파일 이름 지정
//     const publicURL = await uploadImage(base64Image, fileName);
//     if (!publicURL) {
//       showInfo("error", "스토리지에 이미지 업로드 하는데 실패하였습니다.");
//       return false;
//     }
//     // profile 테이블의 profileimagepath 컬럼을 업데이트합니다.
//     const { data, error } = await supabase
//       .from("profile")
//       .update({ profileimagepath: publicURL })
//       .eq("user_id", uid);

//     if (error) {
//       showInfo("error", "프로필 이미지 업로드 하는데 실패하였습니다.");
//       return false;
//     }
//     showInfo("success", "프로필 이미지가 성공적으로 업데이트되었습니다.");
//     return true;
//   } catch (error) {
//     showInfo("error", (error as Error).message);
//     return false;
//   }
// };
// export const setProfileImageSpb = async (image: string): Promise<boolean> => {
//   try {
//     const uid = await getSignInUserId();
//     if (!uid) {
//       showInfo("error", "uid 값을 찾지 못했습니다.");
//       return false;
//     }

//     // Base64 문자열을 Blob으로 변환 후 업로드
//     const fileName = `${uid}-profile-image.jpg`; // 파일 이름 지정
//     const publicURL = await uploadImage(base64Image, fileName);
//     if (!publicURL) {
//       showInfo("error", "스토리지에 이미지 업로드 하는데 실패하였습니다.");
//       return false;
//     }
//     // profile 테이블의 profileimagepath 컬럼을 업데이트합니다.
//     const { data, error } = await supabase
//       .from("profile")
//       .update({ profileimagepath: publicURL })
//       .eq("user_id", uid);

//     if (error) {
//       showInfo("error", "프로필 이미지 업로드 하는데 실패하였습니다.");
//       return false;
//     }
//     showInfo("success", "프로필 이미지가 성공적으로 업데이트되었습니다.");
//     return true;
//   } catch (error) {
//     showInfo("error", (error as Error).message);
//     return false;
//   }
// };

export const setProfileSpb = async (image): Promise<boolean> => {
  const fileName = `profile-images/${String(Math.random())
    .split(".")
    .join("")}${image.filename || "JPEG"}`;
  // Supabase Storage에 파일 업로드

  const { data, error: uploadError } = await supabase.storage
    .from("profileBucket") // 버킷 이름
    .upload(fileName, image.path, {
      contentType: image.mime,
    });

  console.log(data);

  if (uploadError) {
    console.error("업로드 오류:", uploadError.message);
    return false;
  }

  // 파일의 URL 생성
  // const { data: publicUrl, error: urlError } = supabase.storage
  //   .from("profileBucket")
  //   .getPublicUrl(`profile-images/${email}`);

  // console.log(publicUrl);
  return true;
};
