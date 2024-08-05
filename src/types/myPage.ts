// 사용자 인터페이스 정의
interface UserDetail {
  email: string;
  password: string;
}

interface UserApiResponse {
  result: UserData;
}

interface UserData {
  nickName: string;
  email: string;
  introduce: string;
  profileImagePath: string;
  communityCount: number;
  favoriteCount: number;
}
