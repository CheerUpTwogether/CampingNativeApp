import supabase from "../supabaseClient";
import { showInfo } from "./alert";
import { getSignInUserId, isSignInUser } from "./auth";

// 아티클 리스트 가져오기
export const getArticlesSpb = async (user_uuid: string): Promise<Article[]> => {
  try {
    const { data, error } = await supabase.rpc('get_article_list', {
      user_uuid,
      sort_by_date: true
    });
    
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

// 아티클 좋아요
export const setLikeAriticleSpb = async (
  user_id: string,
  article_id: number,
  isDelete: boolean
): Promise<boolean> => {
  try {
    if (isDelete) {
      const { data, error: deleteError } = await supabase
        .from("article_like")
        .delete()
        .eq("user_id", user_id)
        .eq("article_id", article_id);

      if (deleteError) {
        showInfo("error", deleteError.message);
        return false;
      }
      showInfo("success", "아티클의 좋아요를 취소하였습니다.");
      return true;
    } else {
      const { error: insertError } = await supabase
        .from("article_like")
        .insert({ article_id, user_id});

      if (insertError) {
        showInfo("error", insertError.message);
        return false;
      }
      showInfo("success", "아티클에 좋아요를 누르셨습니다!");
      return true;
    }
  } catch (error) {
    showInfo("error", (error as Error).message);
    return false;
  }
};