import Toast from "react-native-toast-message";

export const showInfo = (infoType: string, message: string) => {
  Toast.show({
    type: infoType,
    text1: message,
  });
};
