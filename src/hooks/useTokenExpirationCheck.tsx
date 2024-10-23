import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/types/route";
import Toast from "react-native-toast-message";

const useTokenExpirationCheck = (expiresAt: number) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const checkTokenExpiration = () => {
      const currentTime = Math.floor(Date.now() / 1000);

      // 토큰 만료 시 로그인 페이지로 리디렉션
      if (expiresAt <= currentTime) {
        Toast.show({
          type: "error",
          text1: "세션이 만료되었습니다.",
          text2: "로그인을 다시 시도해주세요.",
        });
        navigation.navigate("Login");
      }
    };

    // 만료 시간에 맞춰서 체크 (1분 간격으로 체크)
    const intervalId = setInterval(checkTokenExpiration, 1000 * 60);

    // 컴포넌트 언마운트 시 인터벌 제거
    return () => clearInterval(intervalId);
  }, [expiresAt, navigation]);
};

export default useTokenExpirationCheck;
