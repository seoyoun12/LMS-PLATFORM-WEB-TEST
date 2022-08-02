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

import { BannerResponseDto, BannerSaveRequestDto, BannerUpdateRequestDto } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Banner<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description 사용자 인터페이스에서 전체 배너를 조회한다. 이때, 현재 일자와 배너의 게시 시작일, 게시 종료일 사이에 해당하는 데이터만 반환되며, 상태 여부가 -1인 데이터는 조회하지 않는다.
   *
   * @tags [App & 관리자] 배너 API
   * @name FindAllBannersUsingGet
   * @summary [App] 배너 전체 조회
   * @request GET:/banner
   */
  findAllBannersUsingGet = (params: RequestParams = {}) =>
    this.request<BannerResponseDto[], any>({
      path: `/banner`,
      method: "GET",
      ...params,
    });
  /**
   * @description 관리자 페이지에서 전체 배너를 조회한다. 이때, 상태 여부에 관계 없이 전체 데이터를 반환한다.
   *
   * @tags [App & 관리자] 배너 API
   * @name AdmFindAllBannersUsingGet
   * @summary [App & 관리자] 배너 전체 조회 API
   * @request GET:/banner/adm
   */
  admFindAllBannersUsingGet = (params: RequestParams = {}) =>
    this.request<BannerResponseDto[], any>({
      path: `/banner/adm`,
      method: "GET",
      ...params,
    });
  /**
   * @description 관리자 페이지에서 새로운 메인 배너를 등록한다.
   *
   * @tags [App & 관리자] 배너 API
   * @name AdmCreateBannerUsingPost
   * @summary [관리자] 배너 등록 API
   * @request POST:/banner/adm
   */
  admCreateBannerUsingPost = (requestDto: BannerSaveRequestDto, params: RequestParams = {}) =>
    this.request<BannerResponseDto, any>({
      path: `/banner/adm`,
      method: "POST",
      body: requestDto,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 관리자 페이지에서 배너에 대한 bannerSeq 를 PathVariable 로 전달받아 특정 배너 데이터를 반환한다.
   *
   * @tags [App & 관리자] 배너 API
   * @name AdmFindBannerUsingGet
   * @summary [관리자] 배너 단건 조회 API
   * @request GET:/banner/adm/{bannerSeq}
   */
  admFindBannerUsingGet = (bannerSeq: number, params: RequestParams = {}) =>
    this.request<BannerResponseDto, void>({
      path: `/banner/adm/${bannerSeq}`,
      method: "GET",
      ...params,
    });
  /**
   * @description 관리자 페이지에서 배너에 대한 시퀀스인 bannerSeq 를 PathVariable 로, 수정할 DTO 를 RequestBody 로 전달받아 특정 배너를 수정한다.
   *
   * @tags [App & 관리자] 배너 API
   * @name AdmUpdateBannerUsingPut
   * @summary [관리자] 배너 수정 API
   * @request PUT:/banner/adm/{bannerSeq}
   */
  admUpdateBannerUsingPut = (bannerSeq: number, requestDto: BannerUpdateRequestDto, params: RequestParams = {}) =>
    this.request<BannerResponseDto, void>({
      path: `/banner/adm/${bannerSeq}`,
      method: "PUT",
      body: requestDto,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 관리자 페이지에서 배너에 대한 시퀀스인 bannerSeq 를 PathVariable 로 전달받아 해당하는 배너를 제거한다.
   *
   * @tags [App & 관리자] 배너 API
   * @name AdmDeleteBannerUsingDelete
   * @summary [관리자] 배너 삭제 API
   * @request DELETE:/banner/adm/{bannerSeq}
   */
  admDeleteBannerUsingDelete = (bannerSeq: number, params: RequestParams = {}) =>
    this.request<BannerResponseDto, void>({
      path: `/banner/adm/${bannerSeq}`,
      method: "DELETE",
      ...params,
    });
}
