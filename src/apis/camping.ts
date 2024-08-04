import { OPENAPI } from ".";
import { showToastApiError, makeQueryString } from "../utils/apiHelper";
import { ApiResponse } from "@/types/api";

// // API 응답 인터페이스 정의
type CampingsApiResponse = {
  response: {
    body: {
      items: {
        item: CampingsType;
      };
    };
  };
};

// 캠핑장 API 함수
export const getCampingsApi = async (obj: {
  MobileOS: string;
  MobileApp: string;
  serviceKey: string;
  _type: string;
}): Promise<CampingsApiResponse | void> => {
  try {
    const res = await OPENAPI.get<CampingsApiResponse>(
      `/basedList${makeQueryString(obj)}`
    );
    return res.data;
  } catch (error) {
    showToastApiError();
  }
};
