import { DELETE, GET, PUT } from '@common/httpClient';
import useSWR, { SWRResponse } from 'swr';
import {
  businessType,
  courseCategoryType,
  courseSubCategoryType,
  RegisterType,
  userBusinessType,
} from './courseClass';
import { userRegistrationType } from './user';

export interface CourseUserResDto {
  courseTitle: string;
  createdDtime: string;
  modifiedDtime: string;
  regType: RegisterType;
  regUserSeq: number;
  seq: number;
}

export function useCourseUser() {
  const { data, error, mutate } = useSWR<SWRResponse<CourseUserResDto[]>>(
    '/course-user',
    GET
  );
  return {
    data: data?.data,
    error,
    mutate,
  };
}

export enum RegType {
  TYPE_INDIVIDUAL = 'individual',
  TYPE_ORGANIZATION = 'organization',
}

export interface FindCourseUserRes {
  seq: number;
  step: number;
  categoryType: courseCategoryType;
  businessType: businessType;
  studyDate: string;
  userBusinessType: userBusinessType;
  userSubBusinessType: courseSubCategoryType;
  userCompanyName: string;
  regType: RegisterType;
  name: string;
  identityNumber: string;
  carNumber: string;
  carRegisteredRegion: userRegistrationType;
  phone: string;
}

export function getSingleCourseUser(courseUserSeq: number, regType: RegType) {
  return GET<{ data: FindCourseUserRes }>(
    `/course-user/find/${regType}/${courseUserSeq}`
  );
}

export interface ModifyCourseUserReqDto {
  businessName: string;
  businessSubType: courseSubCategoryType;
  businessType: userBusinessType;
  carNumber: string;
  carRegisteredRegion: userRegistrationType;
  phone: string;
}

export function modifyCourseUserIndi(
  courseUserSeq: number,
  reqDto: ModifyCourseUserReqDto
) {
  return PUT(`/course-user/modify/individual/${courseUserSeq}`, reqDto);
}

export function modifyCourseUserOrga(
  courseUserSeq: number,
  reqDto: ModifyCourseUserReqDto
) {
  return PUT(`/course-user/modify/organization/${courseUserSeq}`, reqDto);
}

export function delelteCourseUserIndi(courseUserSeq: number) {
  return DELETE(`/course-user/cancel/individual/${courseUserSeq}`);
}
export function delelteCourseUserOrga(courseUserSeq: number) {
  return DELETE(`/course-user/cancel/organization/${courseUserSeq}`);
}
