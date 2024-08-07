interface UserSimpleType {
  nickname: string;
  user_id: string;
}
interface updateReplyType {
  id: number;
  reply: string;
}

interface ReplyType extends updateReplyType {
  community_id: number;
  create_date: string;
  user_id: string;
  profile: UserSimpleType;
}
