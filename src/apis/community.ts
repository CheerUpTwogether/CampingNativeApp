import { API } from ".";
import { showToastApiError } from "@/utils/apiHelper";
import { ApiResponse } from "@/types/api";

// 커뮤니티 조회
export const getCommunitysApi =
  async (): Promise<ApiResponse<CommunityResponse> | void> => {
    try {
      return await API.get(`/community`);
    } catch (error) {
      showToastApiError();
    }
  };

// 커뮤니티 상세 조회
export const getCommunityApi = async (
  communityId: number
): Promise<ApiResponse<CommunityResponse> | void> => {
  try {
    return await API.get(`/community/${communityId}`);
  } catch (error) {
    showToastApiError();
  }
};

// 커뮤니티 생성(post)
export const addCommunitySpb = async (
  subject: string,
  content: string
): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from("community")
      .insert([{ subject, content }]);

    if (error) {
      showInfo("error", error.message);
      return false;
    }
    showInfo("error", error.message);
    return true;
  } catch (error) {
    showInfo("error", "Error: " + (error as Error).message);
    return false;
  }
};

// 커뮤니티 수정(put)
export const setCommunityApi = async (
  communityData: Community
): Promise<ApiResponse<EditCommunity> | void> => {
  try {
    return await API.put(`/community/${communityData.id}`, communityData);
  } catch (error) {
    showToastApiError();
  }
};

// 커뮤니티 삭제
export const deleteCommunityApi = async (
  communityId: string
): Promise<ApiResponse<any> | void> => {
  try {
    return await API.delete(`/community/${communityId}`);
  } catch (error) {
    showToastApiError();
  }
};

// 커뮤니티 댓글 작성(post)
export const addCommunityCommentApi = async (
  communityId: string,
  reply: string
): Promise<ApiResponse<any> | void> => {
  try {
    return await API.post(`/community/${communityId}/replies`, { reply });
  } catch (error) {
    showToastApiError();
  }
};

// 커뮤니티 좋아요
export const addCommunityLikeApi = async (
  communityId: string
): Promise<ApiResponse<any> | void> => {
  try {
    return await API.post(`/community/${communityId}/like`);
  } catch (error) {
    showToastApiError();
  }
};

// 댓글 수정
export const setCommunityCommentApi = async (
  communityReply: CommunityReply
): Promise<ApiResponse<any> | void> => {
  try {
    return await API.put(
      `/community/${communityReply.communityId}/reply/${communityReply.replyId}`,
      { reply: communityReply.reply }
    );
  } catch (error) {
    showToastApiError();
  }
};
