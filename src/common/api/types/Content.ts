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
  ContentDetailResponseDto,
  ContentResponseDto,
  ContentSaveRequestDto,
  ContentUpdateRequestDto,
  InputStream,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Content<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description 관리자 페이지 내에서 콘텐츠 전체 데이터를 조회한다.
   *
   * @tags [관리자] 콘텐츠 API
   * @name FindContentsUsingGet
   * @summary [관리자] 콘텐츠 전체 조회 API - JWT, Pagination
   * @request GET:/content/adm
   */
  findContentsUsingGet = (
    query: { contentName?: string; elementCnt?: number; page: number },
    params: RequestParams = {},
  ) =>
    this.request<ContentResponseDto, any>({
      path: `/content/adm`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * @description Course 에 탑재하기 위한 Content 를 생성한다.
   *
   * @tags [관리자] 콘텐츠 API
   * @name CreateContentUsingPost
   * @summary [관리자] 콘텐츠 생성 API - JWT 필요
   * @request POST:/content/adm
   */
  createContentUsingPost = (contentSaveRequestDto: ContentSaveRequestDto, params: RequestParams = {}) =>
    this.request<ContentResponseDto, any>({
      path: `/content/adm`,
      method: "POST",
      body: contentSaveRequestDto,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 관리자 페이지 내에서 콘텐츠에 대한 상세 정보를 조회한다.
   *
   * @tags [관리자] 콘텐츠 API
   * @name FindContentUsingGet
   * @summary [관리자] 콘텐츠 단건 조회 API
   * @request GET:/content/adm/{contentSeq}
   */
  findContentUsingGet = (contentSeq: number, params: RequestParams = {}) =>
    this.request<ContentDetailResponseDto, void>({
      path: `/content/adm/${contentSeq}`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags [관리자] 콘텐츠 API
   * @name UpdateContentUsingPut
   * @summary [관리자] 콘텐츠 수정 API - JWT 필요
   * @request PUT:/content/adm/{seq}
   */
  updateContentUsingPut = (seq: number, contentUpdateRequestDto: ContentUpdateRequestDto, params: RequestParams = {}) =>
    this.request<InputStream, any>({
      path: `/content/adm/${seq}`,
      method: "PUT",
      body: contentUpdateRequestDto,
      type: ContentType.Json,
      ...params,
    });
}
