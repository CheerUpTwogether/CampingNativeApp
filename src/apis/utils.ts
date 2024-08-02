import Toast from "react-native-toast-message";
// 에러 발생 시 토스트 메시지 표시 함수
export const showToastApiError = () => {
  Toast.show({
    type: "error",
    text1: "에러가 발생했습니다.",
    text2: "에러가 지속될 경우 관리자에게 문의해주세요.",
  });
};
