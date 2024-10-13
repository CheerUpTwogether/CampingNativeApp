// 사용자 인터페이스 정의
interface UserDetail {
  email: string;
  password: string;
}

interface UserApiResponse {
  result: UserData;
}

interface UserData {
  nickname: string;
  email?: string;
  introduce: string;
  profile: string;
  communitycount?: number;
  favoritecount?: number;
  user_id?: string;
  id?: number;
}

interface User {
  nickname: string;
  introduce: string;
  profile: string;
}

interface UserEditData {
  nickname: string;
  introduce: string;
  profile: string;
}

interface CropPickerImage {
  uri: string,
  type: string,
  name: string,
}