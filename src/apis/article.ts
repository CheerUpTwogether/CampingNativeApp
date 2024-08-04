import { ApiResponse } from "@/types/api";
import { API } from ".";
import { showToastApiError } from "../utils/apiHelper";

// 아티클 추가
export const addArticleApi = async (
  articleId: number
): Promise<ApiResponse<any> | void> => {
  try {
    return await API.post(`/article/favorite/${articleId}`);
  } catch (error) {
    showToastApiError();
  }
};

// 아티클 리스트 가져오기
export const getArticlesApi = async (
  sortType: string
): Promise<ApiResponse<ArticlesReponse> | void> => {
  try {
    return await API.get(`/article?sortType=${sortType}`);
  } catch (error) {
    showToastApiError();
  }
};

// 아티클 상세
export const getArticleApi = async (
  articleId: number
): Promise<ApiResponse<any> | void> => {
  try {
    return await API.get(`/article/${articleId}`);
  } catch (error) {
    showToastApiError();
  }
};

// 즐겨찾기 아티클 리스트 가져오기
export const getFavoriteArticlesApi =
  async (): Promise<ApiResponse<any> | void> => {
    try {
      return await API.get(`/article/favorite`);
    } catch (error) {
      showToastApiError();
    }
  };
