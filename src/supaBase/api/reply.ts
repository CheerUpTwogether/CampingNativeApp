import supabase from "../supabaseClient";
import { showInfo } from "./alert";
import { isSignInUser } from "./auth";

// 커뮤니티 조회
export const getReplysSpb = async (
  page: number,
  pageSize: number = 10
): Promise<ReplyType[]> => {
  try {
    const isSignIn = await isSignInUser();
    if (!isSignIn) {
      showInfo("error", "로그인 후에 이용해주세요.");
      return [];
    }

    const { data, error } = await supabase
      .from("reply")
      .select("*, profile (user_id, nickname)");

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
