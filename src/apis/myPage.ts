import { API } from ".";
import Toast from "react-native-toast-message";
import { showToastApiError } from "./utils";
import { ApiResponse } from "@/types/api";

// 사용자 인터페이스 정의
interface UserDetail {
  email: string;
  password: string;
}

interface getUserApiResponse {
  result: {
    nickName: string;
  };
}

// 회원 정보 조회 API 함수
export const getUserApi = async (): Promise<getUserApiResponse | void> => {
  try {
    const res = await API.get<getUserApiResponse>("/accounts/info");
    return res.data;
  } catch (error) {
    showToastApiError();
  }
};

// 회원 정보 수정 API 함수
export const setUserApi = async (
  data: Partial<UserDetail>
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
