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
  LearningMaterialResponseDto,
  LearningMaterialSaveRequestDto,
  LearningMaterialUpdateRequestDto,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class LearningMaterial<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description 클라이언트에서 전체 학습 자료를 조회한다. 이때, keyword 를 Query String 으로 전달받아 제목과 내용에 해당되는 데이터들을 검색한다.
   *
   * @tags [App & 관리자] 학습 자료 API
   * @name FindAllLearningMaterialsUsingGet
   * @summary [App] 학습자료 전체 조회 API - 검색(제목, 내용)
   * @request GET:/learning-material
   */
  findAllLearningMaterialsUsingGet = (
    query?: {
      keyword?: string;
      materialSubType?: "TYPE_CHILDREN" | "TYPE_TEENAGER" | "TYPE_ELDERLY" | "TYPE_SELF_DRIVING";
      materialType?: "TYPE_BY_AGE" | "TYPE_EDUCATIONAL" | "TYPE_VIDEO" | "TYPE_OTHER_ORGAN";
    },
    params: RequestParams = {},
  ) =>
    this.request<LearningMaterialResponseDto[], any>({
      path: `/learning-material`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * @description 관리자 페이지에서 등록된 전체 학습 자료를 조회한다.
   *
   * @tags [App & 관리자] 학습 자료 API
   * @name AdmFindAllLearningMaterialUsingGet
   * @summary [관리자] 학습 자료 전체 조회 API - JWT, Pagination
   * @request GET:/learning-material/adm
   */
  admFindAllLearningMaterialUsingGet = (
    query: {
      elementCnt?: number;
      keyword?: string;
      materialSubType?: "TYPE_CHILDREN" | "TYPE_TEENAGER" | "TYPE_ELDERLY" | "TYPE_SELF_DRIVING";
      materialType?: "TYPE_BY_AGE" | "TYPE_EDUCATIONAL" | "TYPE_VIDEO" | "TYPE_OTHER_ORGAN";
      page: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<LearningMaterialResponseDto[], any>({
      path: `/learning-material/adm`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * @description 관리자 페이지에서 학습 자료를 등록한다. 파일은 File API 를 호출하여 따로 생성한다.
   *
   * @tags [App & 관리자] 학습 자료 API
   * @name AdmCreateLearningMaterialUsingPost
   * @summary [관리자] 학습 자료 생성 API - JWT, 파일
   * @request POST:/learning-material/adm
   */
  admCreateLearningMaterialUsingPost = (requestDto: LearningMaterialSaveRequestDto, params: RequestParams = {}) =>
    this.request<LearningMaterialResponseDto, any>({
      path: `/learning-material/adm`,
      method: "POST",
      body: requestDto,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 관리자 페이지에서 특정 학습자료를 조회한다.
   *
   * @tags [App & 관리자] 학습 자료 API
   * @name AdmFindLearningMaterialUsingGet
   * @summary [관리자] 학습자료 단건 조회 API - JWT
   * @request GET:/learning-material/adm/{learningMaterialSeq}
   */
  admFindLearningMaterialUsingGet = (learningMaterialSeq: number, params: RequestParams = {}) =>
    this.request<LearningMaterialResponseDto, void>({
      path: `/learning-material/adm/${learningMaterialSeq}`,
      method: "GET",
      ...params,
    });
  /**
   * @description 관리자 페이지에서 특정 학습자료를 수정한다.
   *
   * @tags [App & 관리자] 학습 자료 API
   * @name AdmUpdateLearningMaterialUsingPut
   * @summary [관리자] 학습자료 수정 API - JWT
   * @request PUT:/learning-material/adm/{learningMaterialSeq}
   */
  admUpdateLearningMaterialUsingPut = (
    learningMaterialSeq: number,
    requestDto: LearningMaterialUpdateRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<LearningMaterialResponseDto, void>({
      path: `/learning-material/adm/${learningMaterialSeq}`,
      method: "PUT",
      body: requestDto,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 관리자 페이지에서 특정 학습자료를 삭제한다.
   *
   * @tags [App & 관리자] 학습 자료 API
   * @name AdmDeleteLearningMaterialUsingDelete
   * @summary [관리자] 학습자료 삭제 API - JWT
   * @request DELETE:/learning-material/adm/{learningMaterialSeq}
   */
  admDeleteLearningMaterialUsingDelete = (learningMaterialSeq: number, params: RequestParams = {}) =>
    this.request<LearningMaterialResponseDto, void>({
      path: `/learning-material/adm/${learningMaterialSeq}`,
      method: "DELETE",
      ...params,
    });
}
