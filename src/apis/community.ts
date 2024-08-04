import { API } from ".";
import { showToastApiError } from "@/utils/apiHelper";
import { ApiResponse } from "@/types/api";
// 커뮤니티 타입
interface Community {
  communityId: number;
}

// 커뮤니티 생성 타입
interface AddCommunity {
  title: string;
  content: string;
}

// 커뮤니티 댓글 타입
interface CommunityReply {
  communityId: string;
  replyId: string;
  reply: string;
}

// 커뮤니티 조회
export const getCommunitysApi = async (): Promise<ApiResponse<any> | void> => {
  try {
    return await API.get(`/community`);
  } catch (error) {
    showToastApiError();
  }
};

// 커뮤니티 상세 조회
export const getCommunityApi = async (
  communityId: string
): Promise<ApiResponse<any> | void> => {
  try {
    return await API.get(`/community/${communityId}`);
  } catch (error) {
    showToastApiError();
  }
};

// 커뮤니티 생성(post)
export const addCommunityApi = async (
  communityData: AddCommunity
): Promise<ApiResponse<any> | void> => {
  try {
    return await API.post("/community", communityData);
  } catch (error) {
    showToastApiError();
  }
};

// 커뮤니티 수정(put)
export const setCommunityApi = async (
  communityData: Community
): Promise<ApiResponse<any> | void> => {
  try {
    return await API.put(
      `/community/${communityData.communityId}`,
      communityData
    );
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
