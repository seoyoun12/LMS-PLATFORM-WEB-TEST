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

import { MainDisplayResponseDto, MainDisplayUpdateRequestDto, MainDisplayUpdateResponseDto } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class MainDisplay<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description 유저페이지나 관리자페이지에서의 화면 조회
   *
   * @tags [App & 관리자] 메인 화면 API
   * @name FindMainDisplayUsingGet
   * @summary [App & 관리자] 메인 화면 조회 API
   * @request GET:/main-display
   */
  findMainDisplayUsingGet = (params: RequestParams = {}) =>
    this.request<MainDisplayResponseDto[], void>({
      path: `/main-display`,
      method: "GET",
      ...params,
    });
  /**
   * @description 관리자 페이지에서 해당 화면에 상태 수정 한다.
   *
   * @tags [App & 관리자] 메인 화면 API
   * @name UpdateMainDisplayUsingPut
   * @summary [관리자] 메인 화면 수정 API
   * @request PUT:/main-display/adm/{mainDisplaySeq}
   */
  updateMainDisplayUsingPut = (
    mainDisplaySeq: string,
    mainDisplayUpdateRequestDto: MainDisplayUpdateRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<MainDisplayUpdateResponseDto, void>({
      path: `/main-display/adm/${mainDisplaySeq}`,
      method: "PUT",
      body: mainDisplayUpdateRequestDto,
      type: ContentType.Json,
      ...params,
    });
}
