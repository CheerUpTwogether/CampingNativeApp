import supabase from "../supabaseClient";
import { showInfo } from "./alert";
import { isSignInUser } from "./auth";

// 아티클 좋아요
export const setFavoriteSpb = async (
  articleId: number,
  userId: string,
  mode: boolean
): Promise<boolean> => {
  try {
    const isSignIn = await isSignInUser();
    if (!isSignIn) {
      showInfo("error", "로그인 후에 이용해주세요.");
      return false;
    }

    const { data, error } = await supabase
      .from("article_favorite")
      .update({
        is_favorite: mode,
      })
      .eq("article_id", articleId)
      .eq("user_id", userId);

    if (error) {
      showInfo("error", error.message);
      return false;
    }
    showInfo("success", "아티클이 좋아요 상태가 변경되었습니다.");
    return true;
  } catch (error) {
    showInfo("error", (error as Error).message);
    return false;
  }
};

// 아티클 리스트 가져오기
export const getArticlesSpb = async (sortType: string): Promise<Article[]> => {
  try {
    const { data, error } = await supabase
      .from("article")
      .select(
        `
      *,
      article_favorite (
        user_id,
        article_id,
        is_favorite
      )
    `
      )
      .order("create_date", { ascending: false }); // 내림차순 정렬

    console.log(data);

    if (error) {
      showInfo("error", error.message);
      return [];
    }

    // // 정렬 함수
    // const sortedData = data.sort((a, b) => {
    //   // article_favorite 배열의 첫 번째 요소를 추출
    //   const favoriteA =
    //     a.article_favorite.length > 0
    //       ? a.article_favorite[0][0]
    //       : { is_favorite: false };
    //   const favoriteB =
    //     b.article_favorite.length > 0
    //       ? b.article_favorite[0][0]
    //       : { is_favorite: false };

    //   // is_favorite 값에 따라 정렬
    //   return (favoriteB.is_favorite ? 1 : 0) - (favoriteA.is_favorite ? 1 : 0);
    // });

    // showInfo("success", "아티클을 성공적으로 가져왔습니다.");
    return sortType === "FAVORITE" ? data : data;
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
      .select(
        `
      *,
      article_favorite (
        user_id,
        article_id,
        is_favorite
      )
    `
      )
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
