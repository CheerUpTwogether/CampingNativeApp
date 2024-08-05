// 사용자 인터페이스 정의
interface User {
  email: string;
  password: string;
}

// 사용자 인터페이스 정의
interface UserDetail extends User {
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
