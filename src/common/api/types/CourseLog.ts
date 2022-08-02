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

import { CourseUserLogRequestDto, CourseUserLogResponseDto } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class CourseLog<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description 관리자 페이지에서 과정 학습로그 생성 수강생이 강의를 들을때마다 기본값 ( 0 ) API 입력 5분에 한번씩 API 입력 수강생이 강의를 나갈때 API 입력수강을 완료해도 API 입력
   *
   * @tags [관리자] 과정 학습 로그 API
   * @name CreateCourseModulesUsingPost1
   * @summary [관리자] 과정 학습로그 생성 API - JWT 사용
   * @request POST:/course-log/adm
   */
  createCourseModulesUsingPost1 = (courseUserLogRequestDto: CourseUserLogRequestDto, params: RequestParams = {}) =>
    this.request<CourseUserLogResponseDto, void>({
      path: `/course-log/adm`,
      method: "POST",
      body: courseUserLogRequestDto,
      type: ContentType.Json,
      ...params,
    });
}
