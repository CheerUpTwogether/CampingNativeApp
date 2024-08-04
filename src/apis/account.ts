import { API } from ".";
import { showToastApiError } from "../utils/apiHelper";
import Toast from "react-native-toast-message";
import { AxiosError } from "axios";

// 사용자 인터페이스 정의
interface User {
  email: string;
  password: string;
}

// 사용자 인터페이스 정의
interface UserDetail {
  email: string;
  password: string;
  nickname: string;
  phoneNumber: string;
}

// 에러 응답 인터페이스 정의
interface ErrorResponse {
  response?: {
    data?: {
      errors?: { reason: string }[];
    };
  };
}

// API 응답 인터페이스 정의
interface ApiResponse<T> {
  data: T;
}

// 회원가입 API 함수
export const addSignUpApi = async (
  data: UserDetail
): Promise<ApiResponse<any>> => {
  try {
    const res = await API.post<ApiResponse<any>>("/accounts", data);

    const text1 = "회원가입을 성공했습니다";
    Toast.show({ type: "success", text1 });

    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    // const text1 =
    //   axiosError?.response?.data?.errors?.[0]?.reason ||
    //   "작성하신 내용을 다시 확인해주세요.";
    const text1 = "작성하신 내용을 다시 확인해주세요.";
    Toast.show({ type: "error", text1 });
    throw error;
  }
};

// 로그인 API 함수
export const addLoginApi = async (
  user: User
): Promise<{ success: boolean }> => {
  try {
    const res = await API.post<{ success: boolean }>("/auth", user);
    Toast.show({
      type: "success",
      text1: "로그인에 성공하였습니다.",
    });
    return res.data;
  } catch (error) {
    showToastApiError();
    return { success: false };
  }
};
