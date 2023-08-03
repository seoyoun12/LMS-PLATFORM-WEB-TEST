import { PrincialEnrollResponse } from "@common/api/Api";


// 내가 클래스 또는 객체를 알고 있을 때 사용
export const isAllowedType = (type: string): type is keyof PrincialEnrollResponse => {
  const bool = Object.keys(new PrincialEnrollResponse()).includes(type);
  return bool
}

// 내가 클래스 또는 객체를 모를 때 사용. 값 자리에 string을 넣은 이유는 키만 사용할 것이기 때문에 중요하지 않음.
export const isAllowedType2 = (obj: Record<string, string>, type: string): type is keyof typeof obj => {
  const bool = Object.keys(obj).includes(type);
  return bool;
}