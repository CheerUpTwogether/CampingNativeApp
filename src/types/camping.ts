interface CampingType {
  firstImageUrl: string;
  facltNm: string;
  addr1: string;
  addr2: string;
  facltDivNm: string;
  mangeDivNm: string;
  induty: string;
  resveCl: string;
  intro: string;
  caravInnerFclty: string;
  tel: string;
}

type CampingsType = CampingType[];

interface CampingFlatListProps {
  campings: CampingsType;
  onEndReached: () => void;
}
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
