interface Profile {
  user_id: string;
  email: string;
  nickname: string;
}

// 커뮤니티 타입 상세
interface Community {
  contents: string;
  create_date: string;
  id: number,
  images: string[];
  is_liked: boolean;
  like_count: number;
  nickname: string;
  profile: string;
  reply_count: number;
  title: string;
  user_id: string;
}

type ImageFile= {uri: string, type: string, name: string}
type FormImageFile =  string | {uri: string, type: string, name: string}

interface CommunityForm {
  title: string,
  contents: string,
  images: FormImageFile[]
}

// interface Community {
//   id: number;
//   user_id: string;
//   subject: string;
//   content: string;
//   nickname: string;
//   like: number;
//   like_check: boolean;
//   reply_count: number;
//   profile?: User;
//   replys?: Reply[];
// }

interface Reply {
  replyId: number;
  nickname: string;
  reply: string;
  createDate: string;
}

// 커뮤니티 생성, 수정 타입
interface EditCommunity {
  subject: string;
  content: string;
}

// 커뮤니티 댓글 타입
interface CommunityReply {
  communityId: string;
  replyId: string;
  reply: string;
}

interface UserProfile {
  user_id: string;
  profile: string;
}
