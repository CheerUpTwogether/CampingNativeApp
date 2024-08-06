interface UserSimpleType {
  nickname: string;
  user_id: string;
}

interface ReplyType {
  community_id: number;
  create_date: string;
  id: number;
  reply: string;
  user_id: string;
  profile: UserSimpleType;
}
