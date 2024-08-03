import { API } from ".";
import { showToastApiError } from "./utils";

// 아티클 추가
export const addArticleApi = async (articleId: number) => {
  try {
    return await API.post(`/article/favorite/${articleId}`);
  } catch (error) {
    showToastApiError();
    throw error;
  }
};

// 아티클 리스트 가져오기
export const getArticlesApi = async (sortType: string) => {
  try {
    return await API.get(`/article${sortType ? `?sortType=${sortType}` : ""}`);
  } catch (error) {
    showToastApiError();
    throw error;
  }
};

// 아티클 상세
export const getArticleApi = async (articleId: number) => {
  try {
    return await API.get(`/article/${articleId}`);
  } catch (error) {
    showToastApiError();
    throw error;
  }
};

// 즐겨찾기 아티클 리스트 가져오기
export const getFavoriteArticlesApi = async () => {
  try {
    return await API.get(`/article/favorite`);
  } catch (error) {
    showToastApiError();
    throw error;
  }
};
