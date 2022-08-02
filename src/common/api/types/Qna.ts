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

import { QnaAnswerResponseDto, QnaAnswerSaveRequestDto, QnaResponseDto, QnaSaveRequestDto } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Qna<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description 클라이언트로부터 현재 유저의 Access Token 을 Header 로 전달받아 해당하는 사용자의 1:1 문의 내역을 전체 조회한다.
   *
   * @tags [App & 관리자] 1:1 문의 API
   * @name FindAllQnaUsingGet
   * @summary [App] 1:1 문의 내역 전체 조회 API - JWT
   * @request GET:/qna
   */
  findAllQnaUsingGet = (params: RequestParams = {}) =>
    this.request<QnaResponseDto[], any>({
      path: `/qna`,
      method: "GET",
      ...params,
    });
  /**
   * @description 사용자 페이지에서 1:1 문의를 등록한다. 파일 첨부가 필요할 경우 별도의 파일 API 를 사용하여 등록한다. 첨부파일은 50MB 이내 첨부불가 타입: .exe, .link, .ico
   *
   * @tags [App & 관리자] 1:1 문의 API
   * @name CreateQnaUsingPost
   * @summary [App] 1:1 문의 등록 - JWT, 파일[별도 API 이용]
   * @request POST:/qna
   */
  createQnaUsingPost = (requestDto: QnaSaveRequestDto, params: RequestParams = {}) =>
    this.request<QnaResponseDto, any>({
      path: `/qna`,
      method: "POST",
      body: requestDto,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 관리자 페이지에서 등록된 1:1 문의를 전체 조회한다.
   *
   * @tags [App & 관리자] 1:1 문의 API
   * @name AdmFindAllQnaUsingGet
   * @summary [관리자] 1:1 문의 전체 조회 - JWT, Pagination
   * @request GET:/qna/adm
   */
  admFindAllQnaUsingGet = (query?: { elementCnt?: number; page?: number }, params: RequestParams = {}) =>
    this.request<QnaResponseDto[], any>({
      path: `/qna/adm`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * @description 관리자 페이지에서 특정 1:1 문의를 조회한다.
   *
   * @tags [App & 관리자] 1:1 문의 API
   * @name AdmFindQnaUsingGet
   * @summary [관리자] 1:1 문의 단건 조회 - JWT
   * @request GET:/qna/adm/{qnaSeq}
   */
  admFindQnaUsingGet = (qnaSeq: number, params: RequestParams = {}) =>
    this.request<QnaResponseDto, void>({
      path: `/qna/adm/${qnaSeq}`,
      method: "GET",
      ...params,
    });
  /**
   * @description 관리자 페이지에서 특정 1:1 문의에 대한 답변을 작성한다.
   *
   * @tags [App & 관리자] 1:1 문의 API
   * @name AdmCreateQnaAnswerUsingPost
   * @summary [관리자] 1:1 문의 답변 - JWT, 파일[별도 API 이용]
   * @request POST:/qna/adm/{qnaSeq}
   */
  admCreateQnaAnswerUsingPost = (qnaSeq: number, requestDto: QnaAnswerSaveRequestDto, params: RequestParams = {}) =>
    this.request<QnaAnswerResponseDto, void>({
      path: `/qna/adm/${qnaSeq}`,
      method: "POST",
      body: requestDto,
      type: ContentType.Json,
      ...params,
    });
}
