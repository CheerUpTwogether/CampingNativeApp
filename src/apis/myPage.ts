import { API } from ".";
import Toast from "react-native-toast-message";
import { showToastApiError } from "../utils/apiHelper";
import { ApiResponse } from "@/types/api";

// 회원 정보 조회 API 함수
export const getUserApi = async (): Promise<UserApiResponse | void> => {
  try {
    const res = await API.get<UserApiResponse>("/accounts/info");
    return res.data;
  } catch (error) {
    showToastApiError();
  }
};

export const getCommunitysApi = async (): Promise<ApiResponse<
  CommunityResponse<Community[]>
> | void> => {
  try {
    return await API.get(`/community`);
  } catch (error) {
    showToastApiError();
  }
};

// 회원 정보 수정 API 함수
export const setUserApi = async (
  data: Partial<User>
): Promise<ApiResponse<any> | void> => {
  try {
    const res = await API.patch<ApiResponse<any>>("/accounts", data);
    return res.data;
  } catch (error) {
    showToastApiError();
  }
};

// 프로필 이미지 변경 API 함수
export const setProfileApi = async (
  data: FormData
): Promise<ApiResponse<any> | void> => {
  try {
    const res = await API.patch<ApiResponse<any>>("/accounts/profile", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    const text1 = "프로필 이미지 변경 요청 중 오류가 발생했습니다.";
    Toast.show({ type: "error", text1 });
  }
};

// 마이페이지 데이터 조회 API 함수
export const getMyPageApi = async (): Promise<ApiResponse<any> | void> => {
  try {
    const res = await API.get<ApiResponse<any>>("/accounts/info/mypage");
    return res.data;
  } catch (error) {
    showToastApiError();
  }
};
