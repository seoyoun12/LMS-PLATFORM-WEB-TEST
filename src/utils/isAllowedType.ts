import { ProvincialEnrollSaveRequestDto } from "@common/api/Api";
export class PrincialEnrollResponse implements ProvincialEnrollSaveRequestDto {
  age3: number;
  age4: number;
  age5: number;
  elderly: number;
  expectedToStartDtime: string;
  expiredDtime: string;
  grade1: number;
  grade2: number;
  grade3: number;
  grade4: number;
  grade5: number;
  grade6: number;
  modifiedDtime: string;
  organization: string;
  selfDriver: number;
  seq: number;
  status: number;
  userInfo: string;
  userSeq: number;

  constructor() {
    this.age3 = 0;
    this.age4 = 0;
    this.age5 = 0;
    this.elderly = 0;
    this.expectedToStartDtime = "";
    this.expiredDtime = "";
    this.grade1 = 0;
    this.grade2 = 0;
    this.grade3 = 0;
    this.grade4 = 0;
    this.grade5 = 0;
    this.grade6 = 0;
    this.modifiedDtime = "";
    this.organization = "";
    this.selfDriver = 0;
    this.seq = 0;
    this.status = 0;
    this.userInfo = '';
    this.userSeq = 0;
  }
}


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