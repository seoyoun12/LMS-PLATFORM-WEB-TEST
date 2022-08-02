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
  CourseClassResponseDto,
  CourseClassSaveRequestDto,
  CourseClassStepResponseDto,
  CourseClassUpdateRequestDto,
  InputStream,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class CourseClass<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description 클라이언트의 캘린더에서 과정 클래스에 대한 전체 데이터를 조회한다. status 가 -1인 데이터는 조회하지 않는다.
   *
   * @tags [App & 관리자] 과정 클래스(기수) API
   * @name FindAllCourseClassesUsingGet
   * @summary [App] 과정 클래스 전체 조회 API
   * @request GET:/course-class
   */
  findAllCourseClassesUsingGet = (
    query: { businessType: "TYPE_ALL" | "TYPE_PASSENGER" | "TYPE_CARGO"; date?: string },
    params: RequestParams = {},
  ) =>
    this.request<CourseClassResponseDto[], any>({
      path: `/course-class`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * @description 관리자 페이지의 클래스 관리 캘린더에서 전체 과정 클래스 정보를 조회한다.
   *
   * @tags [App & 관리자] 과정 클래스(기수) API
   * @name AdmFindAllCourseClassesUsingGet
   * @summary [관리자] 과정 클래스 전체 조회 API
   * @request GET:/course-class/adm
   */
  admFindAllCourseClassesUsingGet = (
    query: { businessType: "TYPE_ALL" | "TYPE_PASSENGER" | "TYPE_CARGO"; date?: string },
    params: RequestParams = {},
  ) =>
    this.request<CourseClassResponseDto[], any>({
      path: `/course-class/adm`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * @description 관리자 페이지에서 과정에 대한 클래스를 생성한다.
   *
   * @tags [App & 관리자] 과정 클래스(기수) API
   * @name AdmCreateCourseClassUsingPost
   * @summary [관리자] 과정 클래스 생성 API
   * @request POST:/course-class/adm
   */
  admCreateCourseClassUsingPost = (requestDto: CourseClassSaveRequestDto, params: RequestParams = {}) =>
    this.request<CourseClassResponseDto, void>({
      path: `/course-class/adm`,
      method: "POST",
      body: requestDto,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 관리자 페이지의 클래스 관리 캘린더에서 특정 과정에 대한 클래스 정보를 단건 조회한다.
   *
   * @tags [App & 관리자] 과정 클래스(기수) API
   * @name AdmFindCourseClassUsingGet
   * @summary [관리자] 과정 클래스 단건 조회 API
   * @request GET:/course-class/adm/{courseClassSeq}
   */
  admFindCourseClassUsingGet = (courseClassSeq: number, params: RequestParams = {}) =>
    this.request<CourseClassResponseDto, void>({
      path: `/course-class/adm/${courseClassSeq}`,
      method: "GET",
      ...params,
    });
  /**
   * @description 특정 과정 클래스를 수정한다.
   *
   * @tags [App & 관리자] 과정 클래스(기수) API
   * @name AdmModifyCourseClassUsingPut
   * @summary [관리자] 과정 클래스 수정 API
   * @request PUT:/course-class/adm/{courseClassSeq}
   */
  admModifyCourseClassUsingPut = (
    courseClassSeq: number,
    requestDto: CourseClassUpdateRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<InputStream, any>({
      path: `/course-class/adm/${courseClassSeq}`,
      method: "PUT",
      body: requestDto,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 특정 과정 클래스를 제거한다. 이때, 만일 한 명이라도 수강 중일 경우 제거가 불가능하다. 실제로 DB 내에서 제거되지는 않으며, status 값만 -1로 변경한다.
   *
   * @tags [App & 관리자] 과정 클래스(기수) API
   * @name AdmDeleteCourseClassUsingDelete
   * @summary [관리자] 과정 클래스 삭제 API
   * @request DELETE:/course-class/adm/{courseClassSeq}
   */
  admDeleteCourseClassUsingDelete = (courseClassSeq: number, params: RequestParams = {}) =>
    this.request<CourseClassResponseDto, void>({
      path: `/course-class/adm/${courseClassSeq}`,
      method: "DELETE",
      ...params,
    });
  /**
   * @description 교육 과정과 업종 구분 Enum 을 쿼리 스트링으로 전달받아 해당하는 과정 클래스(기수) 정보를 조회한다. 조회 이후, 일치하는 클래스의 정보를 리스트로 반환한다. 검색 시, 현재 일자를 기준으로 신청이 가능한 클래스만 조회한다. [courseCategoryType Enum] * TYPE_SUP_COMMON -> 보수일반 * TYPE_SUP_CONSTANT -> 보수 수시 * TYPE_CONSTANT -> 수시 * TYPE_NEW -> 신규 * TYPE_ILLEGAL -> 법령위반자 * TYPE_HANDICAPPED -> 교통약자 이동편의 증진 * TYPE_DANGEROUS -> 위험물진 운송차량 운전자 [CourseClassBusinessTypeEnum Enum] TYPE_ALL: 전체 (여기서는 사용하지 말 것.) TYPE_PASSENGER: 여객 TYPE_CARGO: 화물
   *
   * @tags [App & 관리자] 과정 클래스(기수) API
   * @name FindClassStepUsingGet
   * @summary [App] 과정 클래수(기수) 검색 API
   * @request GET:/course-class/step
   */
  findClassStepUsingGet = (
    query: {
      courseBusinessType: "TYPE_ALL" | "TYPE_PASSENGER" | "TYPE_CARGO";
      courseCategoryType:
        | "TYPE_SUP_COMMON"
        | "TYPE_SUP_CONSTANT"
        | "TYPE_CONSTANT"
        | "TYPE_NEW"
        | "TYPE_ILLEGAL"
        | "TYPE_HANDICAPPED"
        | "TYPE_DANGEROUS";
    },
    params: RequestParams = {},
  ) =>
    this.request<CourseClassStepResponseDto[], any>({
      path: `/course-class/step`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * @description 클라이언트의 캘린더에서 특정 과정 클래스에 대해 단건 조회한다.
   *
   * @tags [App & 관리자] 과정 클래스(기수) API
   * @name FindCourseClassUsingGet
   * @summary [App] 과정 클래스 단건 조회 API
   * @request GET:/course-class/{courseClassSeq}
   */
  findCourseClassUsingGet = (courseClassSeq: number, params: RequestParams = {}) =>
    this.request<CourseClassResponseDto, void>({
      path: `/course-class/${courseClassSeq}`,
      method: "GET",
      ...params,
    });
}
