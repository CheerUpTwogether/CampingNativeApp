import { isSignInUser } from "./auth";
import supabase from "../supabaseClient";
import { showInfo } from "./alert";

// 커뮤니티 조회
export const getCommunitysSpb = async (): Promise<{ [key: string]: any }[]> => {
  try {
    const isSignIn = await isSignInUser();
    if (!isSignIn) {
      showInfo("error", "로그인 후에 이용해주세요.");
      return [];
    }
    const { data, error } = await supabase.from("community").select("*");

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

// 커뮤니티 상세 조회
export const getCommunitySpb = async (
  communityId: number
): Promise<{ [key: string]: any } | null> => {
  try {
    const isSignIn = await isSignInUser();

    if (!isSignIn) {
      showInfo("error", "로그인 후에 이용해주세요.");
      return null;
    }
    const { data, error } = await supabase
      .from("community")
      .select("*")
      .eq("id", communityId)
      .single();

    if (error) {
      showInfo("error", error.message);
      return null;
    }
    return data;
  } catch (error) {
    showInfo("error", (error as Error).message);
    return null;
  }
};

// 커뮤니티 생성(post)
export const addCommunitySpb = async (
  subject: string,
  content: string
): Promise<boolean> => {
  try {
    const isSignIn = await isSignInUser();

    if (!isSignIn) {
      showInfo("error", "로그인 후에 이용해주세요.");
      return false;
    }

    const { data, error } = await supabase
      .from("community")
      .insert([{ subject, content }]);

    if (error) {
      showInfo("error", error.message);
      return false;
    }
    showInfo("success", "게시글이 성공적으로 생성되었습니다.");
    return true;
  } catch (error) {
    showInfo("error", (error as Error).message);
    return false;
  }
};

// 커뮤니티 수정(put)
export const setCommunitySpb = async (
  communityId: number,
  subject: string,
  content: string
): Promise<boolean> => {
  try {
    const isSignIn = await isSignInUser();

    if (!isSignIn) {
      showInfo("error", "로그인 후에 이용해주세요.");
      return false;
    }

    const { data, error } = await supabase
      .from("community")
      .update({ subject, content })
      .eq("id", communityId);

    if (error) {
      showInfo("error", error.message);
      return false;
    }

    showInfo("success", "게시글이 성공적으로 수정되었습니다.");
    return true;
  } catch (error) {
    showInfo("error", (error as Error).message);
    return false;
  }
};

// 커뮤니티 삭제
export const deleteCommunitySpb = async (
  communityId: number
): Promise<boolean> => {
  try {
    const isSignIn = await isSignInUser();

    if (!isSignIn) {
      showInfo("error", "로그인 후에 이용해주세요.");
      return false;
    }

    const { data, error } = await supabase
      .from("community")
      .delete()
      .eq("id", communityId); // communityId가 숫자형이므로, eq()에서 숫자로 처리

    if (error) {
      showInfo("error", error.message);
      return false;
    }
    showInfo("success", "게시글이 성공적으로 삭제되었습니다.");
    return true;
  } catch (error) {
    showInfo("error", (error as Error).message);
    return false;
  }
};

// 커뮤니티 댓글 작성(post)
export const addCommunityCommentSpb = async (
  communityId: number,
  reply: string
): Promise<boolean> => {
  try {
    const isSignIn = await isSignInUser();

    if (!isSignIn) {
      showInfo("error", "로그인 후에 이용해주세요.");
      return false;
    }

    const { data, error } = await supabase
      .from("reply") // 댓글을 저장할 테이블 이름
      .insert([{ community_id: communityId, reply }]); // communityId를 community_id 컬럼에 매핑

    if (error) {
      showInfo("error", error.message);
      return false;
    }

    showInfo("success", "댓글이 성공적으로 작성되었습니다.");
    return true;
  } catch (error) {
    showInfo("error", (error as Error).message);
    return false;
  }
};

// 커뮤니티 좋아요
export const addCommunityLikeApi = async (
  communityId: number
): Promise<boolean> => {
  try {
    // 현재 게시글의 like 값을 조회
    const { data: currentData, error: fetchError } = await supabase
      .from("community")
      .select("like")
      .eq("id", communityId)
      .single();

    if (fetchError) {
      showInfo("error", fetchError.message);
      return false;
    }

    if (!currentData) {
      showInfo("info", "게시글을 찾을 수 없습니다.");
      return false;
    }

    const newLikeCount = (currentData.like || 0) + 1;

    // 게시글의 like 값을 1 증가 like_check를 true로 설정.
    const { data, error } = await supabase
      .from("community")
      .update({
        like: newLikeCount,
        like_check: true,
      })
      .eq("id", communityId);
    if (error) {
      showInfo("error", error.message);
      return false;
    }
    showInfo("success", "좋아요가 성공적으로 추가되었습니다.");
    return true;
  } catch (error) {
    showInfo("error", (error as Error).message);
    return false;
  }
};

// 댓글 수정
export const setCommunityCommentSpb = async (
  communityId: number,
  replyId: number,
  newReply: string
): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from("reply") // 댓글을 수정할 테이블 이름
      .update({ reply: newReply }) // 수정할 댓글 내용
      .eq("id", replyId) // 댓글을 식별할 ID
      .eq("community_id", communityId); // 해당 커뮤니티 게시글의 ID로 조건 설정

    if (error) {
      showInfo("error", error.message);
      return false;
    }
    showInfo("success", "댓글이 성공적으로 수정되었습니다.");
    return true;
  } catch (error) {
    showInfo("error", (error as Error).message);
    return false;
  }
};
