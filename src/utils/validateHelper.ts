import Toast from "react-native-toast-message";

// 폼 데이터 타입 정의
interface RegisterForm {
  email: string;
  password: string;
  passwordCheck: string;
  nickname: string;
}

interface LoginForm {
  email: string;
  password: string;
}

const alertMessage = (type: string, message: string): void => {
  Toast.show({
    type,
    text1: message,
  });
};

// 이메일 유효성 검사
export const getEmailValid = (email: string): string | boolean => {
  if (!email) {
    alertMessage("error", "이메일을 입력해주세요");
    return false;
  }
  const regex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
  if (!regex.test(email)) {
    alertMessage("error", "이메일 형식에 맞게 입력해주세요.");
    return false;
  }

  return true;
};

// 패스워드 유효성 검사
export const getPasswordValid = (password: string): string | boolean => {
  /* 회원가입 시 비밀번호는 8~20, 최소 하나의 영어소문자, 영어 대문자, 특수 문자, 숫자 이상 포함되어야 합니다 */
  if (!password) {
    alertMessage("error", "비밀번호를 입력해주세요.");
    return false;
  }
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
  if (!regex.test(password)) {
    console.log(password);
    alertMessage(
      "error",
      "대/소문자, 특수 문자, 숫자를 포함하여 8글자 이상 입력하세요."
    );
    return false;
  }

  if (password.length > 20) {
    alertMessage("error", "비밀번호는 20자 이하로만 입력해주세요.");
    return false;
  }

  return true;
};

// 패스워드 확인 유효성 검사
export const getPasswordCheckValid = (
  password: string,
  passwordCheck: string
): string | boolean => {
  console.log(passwordCheck);
  if (!passwordCheck) {
    alertMessage("error", "비밀번호 확인을 입력해주세요.");
    return false;
  }

  if (password !== passwordCheck) {
    alertMessage("error", "비밀번호와 일치하지 않습니다.");
    return false;
  }

  return true;
};

// 닉네임 유효성 검사
export const getNicknameValid = (nickname: string): string | boolean => {
  if (nickname.length < 2) {
    alertMessage("error", "2글자 이상의 닉네임을 입력해주세요.");
    return false;
  }

  if (nickname.length > 8) {
    alertMessage("error", "8글자 이하의 닉네임을 입력해주세요.");
    return false;
  }

  return true;
};

// 회원가입 유효성 검사
export const registValid = (form: RegisterForm): boolean => {
  if (
    getNicknameValid(form.nickname) &&
    getEmailValid(form.email) &&
    getPasswordValid(form.password) &&
    getPasswordCheckValid(form.password, form.passwordCheck)
  ) {
    return true;
  }
  return false;
};

export const loginValid = (form: LoginForm): boolean => {
  if (getEmailValid(form.email) && getPasswordValid(form.password)) {
    return true;
  }
  return false;
};
