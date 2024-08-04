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

type CampingsType = CampingType[] | null;

interface CampingFlatListProps {
  campings: CampingsType;
}
