import { GET, PUT } from '@common/httpClient';
import useSWR, { SWRResponse } from 'swr';
import { FaceCheckUpdateRequestDto } from '../Api';
import { MainDisplayRes } from '../mainDisplay';

export enum MainDisplayType {
  EDUCATION_TRANSPORT_WORKER = 'EDUCATION_TRANSPORT_WORKER',
  EDUCATION_GROUND_BUS_DRIVER = 'EDUCATION_GROUND_BUS_DRIVER',
  EDUCATION_PROVINCIAL_TRAFFIC_SAFETY = 'EDUCATION_PROVINCIAL_TRAFFIC_SAFETY',
}

export interface mainDisplayModifyDto {
  mainDisplayType: MainDisplayType;
  seq: number;
  status: number;
}


export function mainDisplayModify(mainDisplayModifyDto: mainDisplayModifyDto) {
  return PUT(`/main-display/adm/${mainDisplayModifyDto.seq}`, mainDisplayModifyDto);
}

export function faceCheckModify(faceCheckModifyDto : FaceCheckUpdateRequestDto ) {
  return PUT(`//face-check/adm/${faceCheckModifyDto.seq}`, faceCheckModifyDto)
}