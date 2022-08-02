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
  InputStream,
  LibraryDetailResponseDto,
  LibraryResponseDto,
  LibrarySaveRequestDto,
  LibraryUpdateRequestDto,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Library<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description 관리자 페이지에서 과정에 해당하는 시퀀스와 페이징에 필요한 인자를 RequestParam 으로 전달받아 해당하는 강의 자료들을 전체 조회한다.
   *
   * @tags [관리자 & 튜터] 강의자료 API
   * @name FindLibrariesUsingGet
   * @summary [관리자 & 튜터] 강의 자료 전체 조회 - Pagination
   * @request GET:/library/tutor
   */
  findLibrariesUsingGet = (
    query: { courseSeq: number; elementCnt?: number; page: number },
    params: RequestParams = {},
  ) =>
    this.request<LibraryResponseDto, void>({
      path: `/library/tutor`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * @description 관리자 페이지에서 Request DTO 를 전달받아 강의 자료 등록을 수행한다.{ "subject": "string" -> 강의 자료 제목 "content": "string" -> 강의 자료 내용 마크다운, "courseSeq": 0 -> 과정 시퀀스, "status": 0 -> 사용 여부 1 or -1, }
   *
   * @tags [관리자 & 튜터] 강의자료 API
   * @name CreateLibraryUsingPost
   * @summary [관리자 & 튜터] 강의 자료 생성 API
   * @request POST:/library/tutor
   */
  createLibraryUsingPost = (requestDto: LibrarySaveRequestDto, params: RequestParams = {}) =>
    this.request<LibraryResponseDto, void>({
      path: `/library/tutor`,
      method: "POST",
      body: requestDto,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 관리자 페이지에서 강의자료에 해당하는 시퀀스를 Path Variable 로 전달받아 해당하는 강의 자료를 단건 조회한다.
   *
   * @tags [관리자 & 튜터] 강의자료 API
   * @name FindLibraryUsingGet
   * @summary [관리자 & 튜터] 강의 자료 상세조회 API
   * @request GET:/library/tutor/{librarySeq}
   */
  findLibraryUsingGet = (librarySeq: number, params: RequestParams = {}) =>
    this.request<LibraryDetailResponseDto, void>({
      path: `/library/tutor/${librarySeq}`,
      method: "GET",
      ...params,
    });
  /**
   * @description 관리자 페이지에서 강의자료에 해당하는 시퀀스를 Path Variable 로 전달받아 해당 강의 자료를 수정한다. { "subject": "강의 자료 제목" "content": "강의 자료 내용 마크다운" "status": "상태 1 or -1" }
   *
   * @tags [관리자 & 튜터] 강의자료 API
   * @name UpdateLibraryUsingPut
   * @summary [관리자 & 튜터] 강의 자료 수정 API
   * @request PUT:/library/tutor/{librarySeq}
   */
  updateLibraryUsingPut = (librarySeq: number, requestDto: LibraryUpdateRequestDto, params: RequestParams = {}) =>
    this.request<LibraryResponseDto, void>({
      path: `/library/tutor/${librarySeq}`,
      method: "PUT",
      body: requestDto,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 관리자 페이지에서 강의자료에 해당하는 시퀀스를 Path Var 로 전달받아 해당 강의 자료를 수정한다.
   *
   * @tags [관리자 & 튜터] 강의자료 API
   * @name DeleteLibraryUsingDelete
   * @summary [관리자 & 튜터] 강의 자료 삭제 API
   * @request DELETE:/library/tutor/{librarySeq}
   */
  deleteLibraryUsingDelete = (librarySeq: number, params: RequestParams = {}) =>
    this.request<InputStream, any>({
      path: `/library/tutor/${librarySeq}`,
      method: "DELETE",
      ...params,
    });
}
