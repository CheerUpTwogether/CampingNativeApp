import { isSignInUser } from "./auth";
import supabase from "../supabaseClient";
import { showInfo } from "./alert";

// 커뮤니티 조회
export const getCommunitysSpb = async (
  page_no: number = 1,
): Promise<Community[] | void> => {
  try {
    console.log(page_no)
    const { data, error } = await supabase.rpc('get_community_list', {
      page_no,
      page_size: 10
    });

    if (error) {
      console.log(error)
      showInfo("error", error.message);
      return;
    }

    return data;
  } catch (error) {
    showInfo("error", (error as Error).message);
    return;
  }
};

// 커뮤니티 생성(post)
export const addCommunitySpb = async (
  user_id: string,
  title: string,
  contents: string,
  images: string[]
): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from("community")
      .insert([{ user_id, title, contents, images }]);

    if (error) {
      console.log(error)
      showInfo("error", error.message);
      return false;
    }
    return true;
  } catch (error) {
    showInfo("error", (error as Error).message);
    return false;
  }
};

// 아티클 좋아요
export const setLikeCommunitySpb = async (
  user_id: string,
  community_id: number,
  isDelete: boolean
): Promise<boolean> => {
  try {
    if (isDelete) {
      const { data, error: deleteError } = await supabase
        .from("community_like")
        .delete()
        .eq("user_id", user_id)
        .eq("community_id", community_id);

      if (deleteError) {
        showInfo("error", deleteError.message);
        return false;
      }
      showInfo("success", "게시글에 좋아요를 취소하였습니다.");
      return true;
    } else {
      const { error: insertError } = await supabase
        .from("community_like")
        .insert({ community_id, user_id});

      if (insertError) {
        showInfo("error", insertError.message);
        return false;
      }
      showInfo("success", "게시글에 좋아요를 누르셨습니다!");
      return true;
    }
  } catch (error) {
    showInfo("error", (error as Error).message);
    return false;
  }
};



// 커뮤니티 수정(put)
export const setCommunitySpb = async (
  communityId: number,
  subject: string,
  content: string,
  nickname: string
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

// 유저 정보 전체 조회
export const getUsersSpb = async () => {
  const { data, error } = await supabase
    .from("profile")
    .select("profileimagepath, user_id");
  return data;
};
