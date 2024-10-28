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
  user_id?: string;
}

interface UserEditData {
  nickname: string;
  introduce: string;
  profile: string;
}

interface CropPickerImage {
  uri: string;
  type: string;
  name: string;
}

export interface FeedItem {
  id: number;
  title: string;
  contents: string;
  create_date: string;
  images: string[];
  is_liked: boolean;
  like_count: number;
  reply_count: number;
}
