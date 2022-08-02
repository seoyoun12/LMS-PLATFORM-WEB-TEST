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

import { CourseProgressRequestDto, CourseProgressResponseDto, CourseProgressUpdateRequestDto } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class CourseProgress<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description 과정 진도율 생성
   *
   * @tags [App & 관리자] 과정 진도율 API - * 관리자는 추후 논의
   * @name CreateCourseProgressUsingPost
   * @summary [App & 관리자] 과정 진도율 API - JWT 사용
   * @request POST:/course-progress
   */
  createCourseProgressUsingPost = (courseProgressRequestDto: CourseProgressRequestDto, params: RequestParams = {}) =>
    this.request<CourseProgressResponseDto, void>({
      path: `/course-progress`,
      method: "POST",
      body: courseProgressRequestDto,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 과정 진도율 수정 수강생이 강의를 듣고 페이지를 나갈때 실행되는 API
   *
   * @tags [App & 관리자] 과정 진도율 API - * 관리자는 추후 논의
   * @name UpdateCourseProgressUsingPut
   * @summary [App & 관리자] 과정 진도율 수정  API - JWT 사용
   * @request PUT:/course-progress
   */
  updateCourseProgressUsingPut = (
    courseProgressRequestDto: CourseProgressUpdateRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<CourseProgressResponseDto, void>({
      path: `/course-progress`,
      method: "PUT",
      body: courseProgressRequestDto,
      type: ContentType.Json,
      ...params,
    });
}
