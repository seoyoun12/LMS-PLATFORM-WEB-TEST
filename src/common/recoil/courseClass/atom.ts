import { UserTransSaveInputDataType } from '@common/api/courseClass';
import { atom } from 'recoil';

export const isIndividual = atom({
  key: 'isIndividual',
  default: true,
});

export const courseClassOrganization = atom<UserTransSaveInputDataType[]>({
  key: 'courseClassOrganization',
  default: [],
});

export const courseClassIndividual = atom<UserTransSaveInputDataType[]>({
  key: 'courseClassIndividual',
  default: [],
});
