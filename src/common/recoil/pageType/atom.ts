import { atom } from 'recoil';

export enum pageRegType {
  TYPE_TRANS_EDU = 'TYPE_TRANS_EDU',
  TYPE_TRAFFIC_SAFETY_EDU = 'TYPE_TRAFFIC_SAFETY_EDU',
}

export const pageType = atom<pageRegType>({
  key: 'pageType',
  default: pageRegType.TYPE_TRANS_EDU,
});
