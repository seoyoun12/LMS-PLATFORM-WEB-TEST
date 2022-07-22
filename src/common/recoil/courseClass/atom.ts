import { UserTransSaveInputDataType } from '@common/api/courseClass';
import { atom } from 'recoil';

export const courseClassOrganization = atom<UserTransSaveInputDataType[]>({
  key: 'courseClassOrganization',
  default: [],
});
