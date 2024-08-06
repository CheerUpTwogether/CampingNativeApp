import supabase from "../supabaseClient";
import { showInfo } from "./alert";
import { getSignInUserId, isSignInUser } from "./auth";

// 아티클 좋아요
export const setFavoriteSpb = async (
  articleId: number,
  mode: boolean
): Promise<boolean> => {
  try {
    const uid = await getSignInUserId();

    if (!uid) {
      showInfo("error", "uid 값을 찾지 못했습니다.");
      return false;
    }

    if (mode) {
      const { data, error: deleteError } = await supabase
        .from("article_favorite")
        .delete()
        .eq("user_id", uid)
        .eq("article_id", articleId);

      if (deleteError) {
        showInfo("error", deleteError.message);
        return false;
      }
      showInfo("success", "아티클의 좋아요를 취소하였습니다..");
      return true;
    } else {
      const { data, error: insertError } = await supabase
        .from("article_favorite")
        .insert({
          article_id: articleId,
          user_id: uid,
        });

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

// 유저가 좋아요를 누른 아티클 id 불러오기
export const getFavoriteArticleIdSpb = async (): Promise<any> => {
  try {
    const uid = await getSignInUserId();

    if (!uid) {
      showInfo("error", "uid 값을 찾지 못했습니다.");
      return [];
    }

    const { data, error: selectError } = await supabase
      .from("article_favorite")
      .select("article_id")
      .eq("user_id", uid);

    if (selectError) {
      showInfo("error", selectError.message);
      return [];
    }

    return data;
  } catch (error) {
    showInfo("error", (error as Error).message);
    return [];
  }
};

// 아티클 좋아요 여부 확인
export const isFavoriteSpb = async (articleId: number): Promise<Boolean> => {
  try {
    const uid = await getSignInUserId();

    if (!uid) {
      showInfo("error", "uid 값을 찾지 못했습니다.");
      return false;
    }
    const { data, error: selectError } = await supabase
      .from("article_favorite")
      .select("user_id")
      .eq("user_id", uid)
      .eq("article_id", articleId);

    if (selectError) {
      showInfo("error", selectError.message);
      return false;
    }

    if (data) {
      // 정상 조회
      return true;
    }
    showInfo("error", "문제가 생겼습니다 관리자에게 문의하세요.");
    return false;
  } catch (error) {
    showInfo("error", (error as Error).message);
    return false;
  }
};

// 아티클 리스트 가져오기
export const getArticlesSpb = async (sortType: string): Promise<Article[]> => {
  try {
    const isSignIn = await isSignInUser();
    if (!isSignIn) {
      showInfo("error", "로그인 후에 이용해주세요.");
      return [];
    }
    const sortColumn =
      sortType === "FAVORITE" ? "favorite_count" : "create_date";

    const { data, error } = await supabase
      .from("article")
      .select("*")
      .order(sortColumn, { ascending: false }); // 내림차순 정렬

    if (error) {
      showInfo("error", error.message);
      return [];
    }
    // showInfo("success", "아티클 정보를 성공적으로 가져왔습니다.");
    return data;
  } catch (error) {
    showInfo("error", (error as Error).message);
    return [];
  }
};

// 아티클 상세
export const getArticleSpb = async (
  articleId: number
): Promise<Article | null> => {
  try {
    const isSignIn = await isSignInUser();
    if (!isSignIn) {
      showInfo("error", "로그인 후에 이용해주세요.");
      return null;
    }

    const { data, error } = await supabase
      .from("article")
      .select("*")
      .eq("id", articleId)
      .single(); // 단일 결과를 반환하도록 설정

    if (error) {
      showInfo("error", error.message);
      return null; // 오류가 발생한 경우 null 반환
    }

    // showInfo("success", "아티클 상세 정보를 성공적으로 가져왔습니다.");
    return data;
  } catch (error) {
    showInfo("error", (error as Error).message);
    return null;
  }
};

// export const getFavoriteArticleSpb = async (): Promise<ArticleWithImages[]> => {
//   try {
//     const isSignIn = await isSignInUser();
//     if (!isSignIn) {
//       showInfo("error", "로그인 후에 이용해주세요.");
//       return [];
//     }
//     const { data, error } = await supabase
//       .from("article")
//       .select(
//         `
//     *,
//     article_favorite (
//       user_id,
//       article_id,
//       is_favorite
//     )
//   `
//       )
//       .order("created_at", { ascending: false });

//     if (error) {
//       showInfo("error", error.message);
//       return [];
//     }

//     // 데이터 구조 처리
//     const articlesWithImages: ArticleWithImages[] = (data || []).map(
//       (article) => ({
//         article_id: article.article_id,
//         title: article.title,
//         content: article.content,
//         is_favorite: article.is_favorite,
//         create_date: article.create_date,
//         images: (article.article_image || []).map((img) => ({
//           img_path: img.img_path,
//           article_id: article.article_id,
//         })),
//       })
//     );

//     showInfo("success", "즐겨찾기 아티클을 성공적으로 가져왔습니다.");
//     return articlesWithImages;
//   } catch (error) {
//     showInfo("error", (error as Error).message);
//     return [];
//   }
// };
