import supabase from "../supabaseClient";
import { showInfo } from "./alert";
import { isSignInUser } from "./auth";

// 아티클 좋아요
export const setFavoriteSpb = async (articleId: number): Promise<boolean> => {
  try {
    const isSignIn = await isSignInUser();
    if (!isSignIn) {
      showInfo("error", "로그인 후에 이용해주세요.");
      return false;
    }

    const { data, error } = await supabase
      .from("article")
      .update({
        is_favorite: true,
      })
      .eq("id", articleId);

    if (error) {
      showInfo("error", error.message);
      return false;
    }
    showInfo("success", "아티클이 성공적으로 좋아요가 추가되었습니다.");
    return true;
  } catch (error) {
    showInfo("error", (error as Error).message);
    return false;
  }
};

type Article = {
  article_id: number;
  title: string;
  content: string;
  is_favorite: boolean;
  create_date: string;
};

type ArticleImage = {
  img_path: string;
  article_id: number;
};

type ArticleWithImages = Article & {
  images: ArticleImage[];
};

// 아티클 리스트 가져오기
export const getArticlesSpb = async (
  sortType: "FAVORITE" | "LATEST"
): Promise<ArticleWithImages[]> => {
  try {
    const isSignIn = await isSignInUser();
    if (!isSignIn) {
      showInfo("error", "로그인 후에 이용해주세요.");
      return [];
    }

    // `article`와 `article_image` 테이블을 조인
    const { data, error } = await supabase
      .from("article")
      .select(
        `
        article_id,
        title,
        content,
        is_favorite,
        create_date,
        article_image (img_path)
      `
      )
      .order(sortType === "FAVORITE" ? "is_favorite" : "create_date", {
        ascending: sortType === "LATEST",
      });

    if (error) {
      showInfo("error", error.message);
      return [];
    }

    // 데이터 처리 및 형식 변경
    const articlesWithImages: ArticleWithImages[] = (data || []).map(
      (article: any) => {
        return {
          ...article,
          images: article.article_image ? [article.article_image] : [], // `article_image`가 배열이 아니라 객체로 포함되어 있을 수 있습니다.
        };
      }
    );

    // 클라이언트 단에서 FAVORITE 정렬을 다시한번 더 진행
    if (sortType === "FAVORITE") {
      articlesWithImages.sort((a, b) => {
        if (a.is_favorite === b.is_favorite) {
          return 0;
        }
        return a.is_favorite ? -1 : 1;
      });
    }
    showInfo("success", "아티클을 성공적으로 가져왔습니다.");
    return articlesWithImages;
  } catch (error) {
    showInfo("error", (error as Error).message);
    return [];
  }
};

// 아티클 상세
export const getArticleSpb = async (
  articleId: number
): Promise<ArticleWithImages | null> => {
  try {
    const isSignIn = await isSignInUser();
    if (!isSignIn) {
      showInfo("error", "로그인 후에 이용해주세요.");
      return null;
    }

    // `article`와 `article_image` 테이블을 조인
    const { data, error } = await supabase
      .from("article")
      .select(
        `
        article_id,
        title,
        content,
        is_favorite,
        create_date,
        article_image (img_path)
      `
      )
      .eq("article_id", articleId)
      .single(); // 단일 결과를 반환하도록 설정

    if (error) {
      showInfo("error", error.message);
      return null; // 오류가 발생한 경우 null 반환
    }

    // 데이터 처리 및 형식 변경
    const articleDetails: ArticleWithImages = {
      article_id: data.article_id,
      title: data.title,
      content: data.content,
      is_favorite: data.is_favorite,
      create_date: data.create_date,
      images: (data.article_image || []).map((img) => ({
        img_path: img.img_path,
        article_id: data.article_id,
      })),
    };

    showInfo("success", "아티클 상세 정보를 성공적으로 가져왔습니다.");
    return articleDetails;
  } catch (error) {
    showInfo("error", (error as Error).message);
    return null; // 예외 발생 시 null 반환
  }
};

export const getFavoriteArticleSpb = async (): Promise<ArticleWithImages[]> => {
  try {
    const isSignIn = await isSignInUser();
    if (!isSignIn) {
      showInfo("error", "로그인 후에 이용해주세요.");
      return [];
    }
    // `article`와 `article_image` 테이블을 조인
    const { data, error } = await supabase
      .from("article")
      .select(
        `
        article_id,
        title,
        content,
        is_favorite,
        create_date,
        article_image (img_path)
      `
      )
      .eq("is_favorite", true);

    if (error) {
      showInfo("error", error.message);
      return [];
    }

    // 데이터 구조 처리
    const articlesWithImages: ArticleWithImages[] = (data || []).map(
      (article) => ({
        article_id: article.article_id,
        title: article.title,
        content: article.content,
        is_favorite: article.is_favorite,
        create_date: article.create_date,
        images: (article.article_image || []).map((img) => ({
          img_path: img.img_path,
          article_id: article.article_id,
        })),
      })
    );

    showInfo("success", "즐겨찾기 아티클을 성공적으로 가져왔습니다.");
    return articlesWithImages;
  } catch (error) {
    showInfo("error", (error as Error).message);
    return [];
  }
};
