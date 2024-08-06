import supabase from "../supabaseClient";
import { showInfo } from "./alert";
import { isSignInUser } from "./auth";

// 커뮤니티 조회
export const getReplysSpb = async (
  community_id: number
): Promise<ReplyType[]> => {
  try {
    const isSignIn = await isSignInUser();
    if (!isSignIn) {
      showInfo("error", "로그인 후에 이용해주세요.");
      return [];
    }

    const { data, error } = await supabase
      .from("reply")
      .select("*, profile (user_id, nickname)")
      .eq("community_id", community_id);

    if (error) {
      showInfo("error", error.message);
      return [];
    }

    return data;
  } catch (error) {
    showInfo("error", (error as Error).message);
    return [];
  }
};

// 커뮤니티 댓글 작성(post)
export const addReplySpb = async ({
  community_id,
  reply,
  user_id,
}: {
  community_id: number;
  reply: string;
  user_id: string;
}): Promise<false | ReplyType> => {
  try {
    const isSignIn = await isSignInUser();

    if (!isSignIn) {
      showInfo("error", "로그인 후에 이용해주세요.");
      return false;
    }

    const { data, error } = await supabase
      .from("reply") // 댓글을 저장할 테이블 이름
      .insert([{ community_id, reply, user_id }]) // communityId를 community_id 컬럼에 매핑
      .select("*, profile (user_id, nickname)")
      .single();

    if (error) {
      showInfo("error", error.message);
      return false;
    }
    showInfo("success", "댓글이 성공적으로 작성되었습니다.");

    return data;
  } catch (error) {
    showInfo("error", (error as Error).message);
    return false;
  }
};

// 커뮤니티 댓글 삭제
export const deleteReplySpb = async (id: number) => {
  try {
    const isSignIn = await isSignInUser();

    if (!isSignIn) {
      showInfo("error", "로그인 후에 이용해주세요.");
      return false;
    }
    const { data, error } = await supabase.from("reply").delete().eq("id", id);

    if (error) {
      showInfo("error", error.message);
      return false;
    }
    showInfo("success", "댓글이 성공적으로 삭제되었습니다.");

    return data;
  } catch (e) {
    console.log(e);
  }
};
