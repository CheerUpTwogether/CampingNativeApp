import { API } from ".";
import { showToastApiError } from "../utils/apiHelper";
import Toast from "react-native-toast-message";
import { ApiResponse } from "@/types/api";

// 회원가입 API 함수
export const addSignUpApi = async (
  data: UserDetail
): Promise<{ success: boolean }> => {
  try {
    const res = await API.post<ApiResponse<{ success: boolean }>>(
      "/accounts",
      data
    );

    const text1 = "회원가입을 성공했습니다";
    Toast.show({ type: "success", text1 });

    return res.data;
  } catch (error) {
    const text1 = "작성하신 내용을 다시 확인해주세요.";
    Toast.show({ type: "error", text1 });
    return { success: false };
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
