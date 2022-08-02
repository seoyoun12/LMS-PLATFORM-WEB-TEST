/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import {
  CourseContentLinkRequestDto,
  CourseDetailClientResponseDto,
  CourseDetailResponseDto,
  CourseResponseDto,
  CourseSaveRequestDto,
  CourseSurveyLinkRequestDto,
  CourseUpdateRequestDto,
  InputStream,
  SurveyResponseDto,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Course<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description 검색에 필요한 키워드를 전달받아 현재 등록된 모든 과정에 대한 정보를 elementCnt 개수 만큼 조회한다.
   *
   * @tags [App & 관리자] 과정 API
   * @name FindCoursesUsingGet
   * @summary [App] 과정 전체 조회 API - Pagination
   * @request GET:/course
   */
  findCoursesUsingGet = (
    query: { contentTitle?: string; elementCnt?: number; page: number; sort?: string },
    params: RequestParams = {},
  ) =>
    this.request<CourseResponseDto[], any>({
      path: `/course`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * @description 관리자 페이지에서 검색에 필요한 키워드를 전달받아 현재 등록된 모든 과정에 대한 정보를 elementCnt 개수 만큼 조회한다.<br/>이때, status 가 -1인 데이터들도 모두 조회한다.
   *
   * @tags [App & 관리자] 과정 API
   * @name FindCoursesAdminUsingGet
   * @summary [관리자] 과정 전체 조회 API - JWT 사용/Pagination
   * @request GET:/course/adm
   */
  findCoursesAdminUsingGet = (
    query: { courseTitle?: string; elementCnt?: number; page: number; sort?: string },
    params: RequestParams = {},
  ) =>
    this.request<CourseResponseDto[], any>({
      path: `/course/adm`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * @description 관리자의 Access Token 을 통해 과정을 생성한다.<br/>data 명세<br/>{ "content1": "과정설명 마크다운", "courseName": "과정제목", "courseSubName": "과정부제목", "displayYn": "노출여부 Y/N", "fullScore": 0, "lessonTerm": 0, "lessonTime": 0, "limitPeople": 0, "limitPeopleYn": "수강제한인원 설정 Y/N", "limitTotalScore": 0, "price": 0, "restudyDay": 0, "restudyYn": "복습허용여부 Y/N", "saleYn": "판매여부 Y/N" "status": "사용 여부 1 or -1" }
   *
   * @tags [App & 관리자] 과정 API
   * @name CreateCourseUsingPost
   * @summary [관리자] 과정 생성 API - JWT 사용
   * @request POST:/course/adm
   */
  createCourseUsingPost = (courseSaveRequestDto: CourseSaveRequestDto, params: RequestParams = {}) =>
    this.request<CourseResponseDto, any>({
      path: `/course/adm`,
      method: "POST",
      body: courseSaveRequestDto,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 과정 시퀀스와 연결할 콘텐츠 시퀀스를 전달받아 해당하는 콘텐츠를 과정에 연결한다.
   *
   * @tags [App & 관리자] 과정 API
   * @name LinkCourseAndContentUsingPost
   * @summary [관리자] 과정-콘텐츠 연동 API
   * @request POST:/course/adm/link/content
   */
  linkCourseAndContentUsingPost = (requestDto: CourseContentLinkRequestDto, params: RequestParams = {}) =>
    this.request<CourseDetailResponseDto, void>({
      path: `/course/adm/link/content`,
      method: "POST",
      body: requestDto,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 과정 시퀀스를 Path Variable 로 전달받아 해당하는 과정과 연결된 콘텐츠의 연결을 해제한다.
   *
   * @tags [App & 관리자] 과정 API
   * @name DeleteLinkedContentUsingDelete
   * @summary [관리자] 과정-콘텐츠 연동 해제 API
   * @request DELETE:/course/adm/link/content/{courseSeq}
   */
  deleteLinkedContentUsingDelete = (courseSeq: number, params: RequestParams = {}) =>
    this.request<CourseDetailResponseDto, void>({
      path: `/course/adm/link/content/${courseSeq}`,
      method: "DELETE",
      ...params,
    });
  /**
   * @description 과정 시퀀스와 특정 설문을 시퀀스로 전달받아 설문을 연결한다. 연결에 성공하면 설문에 대한 ResponseDTO 를 반환한다.
   *
   * @tags [App & 관리자] 과정 API
   * @name LinkCourseAndSurveyUsingPut
   * @summary [관리자] 과정-설문 연결 API
   * @request PUT:/course/adm/link/survey
   */
  linkCourseAndSurveyUsingPut = (requestDto: CourseSurveyLinkRequestDto, params: RequestParams = {}) =>
    this.request<SurveyResponseDto, void>({
      path: `/course/adm/link/survey`,
      method: "PUT",
      body: requestDto,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 과정 시퀀스를 시퀀스로 전달받아 연결되어있는 설문을 제거한다. 해제에 성공하면 설문에 대한 ResponseDTO 를 반환한다.
   *
   * @tags [App & 관리자] 과정 API
   * @name DeleteLinkedSurveyUsingDelete
   * @summary [관리자] 과정-설문 연결 해제 API
   * @request DELETE:/course/adm/link/survey/{courseSeq}
   */
  deleteLinkedSurveyUsingDelete = (courseSeq: number, params: RequestParams = {}) =>
    this.request<SurveyResponseDto, void>({
      path: `/course/adm/link/survey/${courseSeq}`,
      method: "DELETE",
      ...params,
    });
  /**
   * @description 관리자 페이지에서 특정 과정의 seq 를 Path Variable 로 전달받아 해당 과정에 대한 정보를 조회한다
   *
   * @tags [App & 관리자] 과정 API
   * @name AdmFindCourseUsingGet
   * @summary [관리자] 특정 과정 조회 API
   * @request GET:/course/adm/{seq}
   */
  admFindCourseUsingGet = (seq: number, params: RequestParams = {}) =>
    this.request<CourseDetailResponseDto, void>({
      path: `/course/adm/${seq}`,
      method: "GET",
      ...params,
    });
  /**
   * @description 관리자의 Access Token 을 통해 과정을 생성한다.<br/>data 명세<br/>{ "content1": "과정설명 마크다운", "courseName": "과정제목", "courseSubName": "과정부제목", "displayYn": "노출여부 Y/N", "fullScore": 0 -> 총 점수, "lessonTerm": 0 -> 과정 수강일, "lessonTime": 0 -> 과정 수료 인정시간, "limitPeople": 0 -> 수강제한인원 수, "limitPeopleYn": "수강제한인원 설정 Y/N", "limitTotalScore": 0 -> 최소 수료 점수, "price": 0 -> 가격, "restudyDay": 0 -> 복습기간, "restudyYn": "복습허용여부 Y/N", "saleYn": "판매여부 Y/N" "status": "사용 여부 1 or -1" }
   *
   * @tags [App & 관리자] 과정 API
   * @name UpdateCourseUsingPut
   * @summary [관리자] 과정 수정 API - JWT 사용
   * @request PUT:/course/adm/{seq}
   */
  updateCourseUsingPut = (seq: number, courseUpdateRequestDto: CourseUpdateRequestDto, params: RequestParams = {}) =>
    this.request<CourseResponseDto, void>({
      path: `/course/adm/${seq}`,
      method: "PUT",
      body: courseUpdateRequestDto,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description <b>현재는 과정 수강생에 관계 없이 삭제되나, 추후 업데이트 예정</b><br/>관리자의 Access Token 을 통해 과정를 삭제한다. 과정을 수강 중인 사람이 한 명이라도 존재할 경우 삭제 할 수 없으며, S3 내에서 오브젝트가 삭제되지는 않는다.
   *
   * @tags [App & 관리자] 과정 API
   * @name DeleteCourseUsingDelete
   * @summary [관리자] 과정 삭제 API - JWT 사용
   * @request DELETE:/course/adm/{seq}
   */
  deleteCourseUsingDelete = (seq: number, params: RequestParams = {}) =>
    this.request<InputStream, any>({
      path: `/course/adm/${seq}`,
      method: "DELETE",
      ...params,
    });
  /**
   * @description 유저의 과정 신청 시퀀스인 courseUserSeq 를 Path Variable 로 전달받아 해당 과정에 대한 정보를 조회한다 이때, 사용자의 학습 진행 상황도 함께 포함하여 DTO 로 반환한다.
   *
   * @tags [App & 관리자] 과정 API
   * @name FindCourseUsingGet
   * @summary [App] 특정 과정 조회 API
   * @request GET:/course/{courseUserSeq}
   */
  findCourseUsingGet = (courseUserSeq: number, params: RequestParams = {}) =>
    this.request<CourseDetailClientResponseDto, any>({
      path: `/course/${courseUserSeq}`,
      method: "GET",
      ...params,
    });
}
