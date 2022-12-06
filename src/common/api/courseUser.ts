import { DELETE, GET, POST, PUT } from "@common/httpClient";
import useSWR, { SWRResponse } from "swr";
import {
  businessType,
  courseCategoryType,
  courseSubCategoryType,
  courseType,
  RegisterType,
  userBusinessType,
} from "./courseClass";
import { userRegistrationType } from "./user";

export interface CourseUserResDto {
  courseTitle: string;
  createdDtime: string;
  modifiedDtime: string;
  regType: RegisterType;
  regUserSeq: number;
  seq: number;
  thumbnailPath: string;
}

export function useCourseUser() {
  const { data, error, mutate } = useSWR<SWRResponse<CourseUserResDto[]>>(
    "/course-user",
    GET
  );
  return {
    data: data?.data,
    error,
    mutate,
  };
}

export enum RegType {
  TYPE_INDIVIDUAL = "individual",
  TYPE_ORGANIZATION = "organization",
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
  regDate: string;
  studyEndDate: string;
  studyStartDate: string;
  learningTime: string;
  courseType: courseType;
  courseClassSeq: number;
  firstChapterSeq: number;
  residence: string; //거주지
  enrolledPeopleCnt: number;
  limitPeople: number;
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

// 신청안했으면 treu , 중복신청이면 false
export function getIsExistUser(courseClassSeq: number) {
  return GET<{
    data: { available: boolean; duplicated: boolean; message: string | null };
  }>(`/course-user/exists/${courseClassSeq}`);
}

// 운수저상쪽 로직은 courseClass에 있음 여기로 가져와야함.
// export function enrollCourseUserProvincial(
//   requestDto: Partial<CourseUserProvincialSaveRequestDto>
// ) {
//   return POST(`/course-user/enroll/provincial`, requestDto);
// }
