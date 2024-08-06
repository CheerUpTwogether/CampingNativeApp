interface CommunityResponse<T> {
  result: {
    content: T;
  };
  replys: [];
}
interface CommunityDetailResponse {
  result: Community[];
  replys: [];
}

interface Profile {
  user_id: string;
  email: string;
  nickname: string;
}

// 커뮤니티 타입 상세
interface Community {
  id: number;
  user_id: string;
  subject: string;
  content: string;
  nickname: string;
  like: number;
  like_check: boolean;
  replyCount: number;
  replys?: Reply[];
}

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
