import { OPENAPI } from ".";
import { showToastApiError, makeQueryString } from "./utils";
import { ApiResponse } from "@/types/api";

interface CampingType {
  firstImageUrl: string;
  facltNm: string;
  addr1: string;
  addr2: string;
  facltDivNm: string;
  mangeDivNm: string;
  induty: string;
  resveCl: string;
}
type CampingsType = CampingType[];

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
