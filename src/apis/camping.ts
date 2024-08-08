import { OPENAPI } from ".";
import { showToastApiError, makeQueryString } from "../utils/apiHelper";

// 캠핑장 API 함수
export const getCampingsApi = async (obj: {
  MobileOS: string;
  MobileApp: string;
  serviceKey: string;
  _type: string;
  pageNo: number;
}): Promise<CampingsApiResponse | void> => {
  try {
    const res = await OPENAPI.get<CampingsApiResponse>(
      `/basedList${makeQueryString(obj)}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
    showToastApiError();
  }
};
