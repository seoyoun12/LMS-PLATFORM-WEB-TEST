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
  CourseModuleFindResponseDto,
  CourseModuleSaveRequestDto,
  CourseModuleSaveResponseDto,
  CourseModuleUpdateRequestDto,
  CourseModuleUpdateResponseDto,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class CourseModule<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description 관리자 페이지에서 과정에 대한 모듈을 전체조회
   *
   * @tags [App & 관리자] 과정 모듈 API
   * @name FindAllCourseModulesUsingGet
   * @summary [관리자] 과정 모듈 전체 조회 API - JWT 사용
   * @request GET:/course-module/adm
   */
  findAllCourseModulesUsingGet = (query: { courseSeq: number }, params: RequestParams = {}) =>
    this.request<CourseModuleFindResponseDto, void>({
      path: `/course-module/adm`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * @description 관리자 페이지에서 과정에 대한 모듈을 상세 조회
   *
   * @tags [App & 관리자] 과정 모듈 API
   * @name FindByCourseModulesUsingGet
   * @summary [관리자] 과정 모듈 상세 조회 API - JWT 사용
   * @request GET:/course-module/adm/{courseModuleSeq}
   */
  findByCourseModulesUsingGet = (courseModuleSeq: number, params: RequestParams = {}) =>
    this.request<CourseModuleFindResponseDto, void>({
      path: `/course-module/adm/${courseModuleSeq}`,
      method: "GET",
      ...params,
    });
  /**
   * @description 관리자 페이지에서 과정에 대한 모듈을 수정
   *
   * @tags [App & 관리자] 과정 모듈 API
   * @name UpdateCourseModulesUsingPut
   * @summary [관리자] 과정 모듈 수정 API - JWT 사용
   * @request PUT:/course-module/adm/{courseModuleSeq}
   */
  updateCourseModulesUsingPut = (
    courseModuleSeq: number,
    courseModuleUpdateRequestDto: CourseModuleUpdateRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<CourseModuleUpdateResponseDto, void>({
      path: `/course-module/adm/${courseModuleSeq}`,
      method: "PUT",
      body: courseModuleUpdateRequestDto,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 관리자 페이지에서 과정에 대한 모듈을 삭제
   *
   * @tags [App & 관리자] 과정 모듈 API
   * @name UpdateCourseModulesUsingDelete
   * @summary [관리자] 과정 모듈 삭제 API - JWT 사용
   * @request DELETE:/course-module/adm/{courseModuleSeq}
   */
  updateCourseModulesUsingDelete = (courseModuleSeq: number, params: RequestParams = {}) =>
    this.request<CourseModuleUpdateResponseDto, void>({
      path: `/course-module/adm/${courseModuleSeq}`,
      method: "DELETE",
      ...params,
    });
  /**
   * @description 관리자 페이지에서 과정에 대한 모듈을 입력
   *
   * @tags [App & 관리자] 과정 모듈 API
   * @name CreateCourseModulesUsingPost
   * @summary [관리자] 과정 모듈 생성 API - JWT 사용
   * @request POST:/course-module/adm/{courseSeq}
   */
  createCourseModulesUsingPost = (
    courseSeq: number,
    courseModuleSaveRequestDto: CourseModuleSaveRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<CourseModuleSaveResponseDto, void>({
      path: `/course-module/adm/${courseSeq}`,
      method: "POST",
      body: courseModuleSaveRequestDto,
      type: ContentType.Json,
      ...params,
    });
}
