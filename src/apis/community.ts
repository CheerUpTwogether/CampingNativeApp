import { API } from ".";
import Community from "../pages/community/Community";
import { showToastApiError } from "./utils";

// 커뮤니티 타입
interface Community {
  communityId: number;
}

// 커뮤니티 댓글 타입
interface CommunityReply {
  communityId: string;
  replyId: string;
  reply: string;
}

// 커뮤니티 조회
export const getCommunitysApi = async () => {
  try {
    return await API.get(`/community`);
  } catch (error) {
    showToastApiError();
    throw error;
  }
};

// 커뮤니티 상세 조회
export const getCommunityApi = async (communityId: string) => {
  try {
    return await API.get(`/community/${communityId}`);
  } catch (error) {
    showToastApiError();
    throw error;
  }
};

// 커뮤니티 생성(post)
export const addCommunityApi = async (communityData: Community) => {
  try {
    return await API.post("/community", communityData);
  } catch (error) {
    showToastApiError();
    throw error;
  }
};

// 커뮤니티 수정(put)
export const setCommunityApi = async (communityData: Community) => {
  try {
    return API.put(`/feed/${communityData.communityId}`);
  } catch (error) {
    showToastApiError();
    throw error;
  }
};

// 커뮤니티 삭제
export const deleteCommunityApi = async (communityId: string) => {
  try {
    return await API.delete(`/community/${communityId}`);
  } catch (error) {
    showToastApiError();
    throw error;
  }
};

// 커뮤니티 댓글 작성(post)
export const addCommunityCommentApi = async (communityId: string) => {
  try {
    return await API.post(`/community/${communityId}/replays`, communityId);
  } catch (error) {
    showToastApiError();
    throw error;
  }
};

// 커뮤니티 좋아요
export const addCommunityLikeApi = async (communityId: string) => {
  try {
    return await API.post(`/community/${communityId}/lick`, communityId);
  } catch (error) {
    showToastApiError();
    throw error;
  }
};

// 댓글 수정
export const setCommunityCommentApi = async (
  communityReply: CommunityReply
) => {
  try {
    return await API.post(
      `/community/${communityReply.communityId}/replay/${communityReply.replyId}`,
      communityReply.reply
    );
  } catch (error) {
    showToastApiError();
    throw error;
  }
};
