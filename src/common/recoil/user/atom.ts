import { UserRole } from '@common/api/user';
import { atom, atomFamily } from 'recoil';

export const isLoginState = atom({
  key: 'isLoginState',
  default: false,
});

export type regCategory =
  | ''
  | 'TYPE_TRANS_EDU'
  | 'ROLE_TRANS_MANAGER'
  | 'TYPE_TRAFFIC_SAFETY_EDU'
  | 'ROLE_TRAFFIC_SAFETY_MANAGER'
  | 'ROLE_ADMIN';

interface userInfoType {
  name: string;
  regCategory?: regCategory;
  role?: UserRole[];
}

export const userInfo = atom<userInfoType>({
  key: 'userInfo',
  default: {
    name: '',
    regCategory: '',
    role: [],
  },
});
