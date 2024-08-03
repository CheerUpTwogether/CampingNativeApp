import { OPENAPI } from ".";
import { showToastApiError, makeQueryString } from "./utils";

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
type CampingsType = CampingType[] | null;

// API 응답 인터페이스 정의
interface ApiResponse<T> {
  response: {
    body: {
      items: {
        item: CampingsType;
      };
    };
  };
}

// 캠핑장 API 함수
export const getCampingsApi = async (
  obj: object
): Promise<ApiResponse<object[]> | void> => {
  try {
    const res = await OPENAPI.get<ApiResponse<object[]>>(
      `/basedList${makeQueryString(obj)}`
    );
    return res.data;
  } catch (error) {
    showToastApiError();
  }
};
