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

import { ExamFindUserDetailResponseDto, ExamUserRequestDto, ExamUserResponseDto } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class ExamUser<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description 관리자 페이지에서 유저가 제출한 시험 채점여부 Y 대한 전체 조회
   *
   * @tags [관리자] 유저 시험 채점 API
   * @name FindAllExamUserConfirmCompleteUsingGet
   * @summary [관리자] 유저 시험 채점여부 Y (전체) 조회 API
   * @request GET:/exam-user/adm/complete
   */
  findAllExamUserConfirmCompleteUsingGet = (query: { elementCnt?: number; page: number }, params: RequestParams = {}) =>
    this.request<ExamUserResponseDto, void>({
      path: `/exam-user/adm/complete`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * @description 관리자 페이지에서 유저가 제출한 시험 채점여부 N 대한 전체 조회
   *
   * @tags [관리자] 유저 시험 채점 API
   * @name FindAllExamUserTemporaryUsingGet
   * @summary [관리자] 유저 시험 채점여부 N (전체) 조회 API
   * @request GET:/exam-user/adm/temporary
   */
  findAllExamUserTemporaryUsingGet = (query: { elementCnt?: number; page: number }, params: RequestParams = {}) =>
    this.request<ExamUserResponseDto, void>({
      path: `/exam-user/adm/temporary`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * @description 관리자 페이지에서 유저가 제출한 시험에 관리자가 채점을 하기위한 단건 조회 제출한 시험의 채첨을 위한 상세 내역 조회
   *
   * @tags [관리자] 유저 시험 채점 API
   * @name FindExamUserDetailUsingGet
   * @summary [관리자] 유저 시험 채점 제출시험지 조회 API
   * @request GET:/exam-user/adm/{courseUserSeq}
   */
  findExamUserDetailUsingGet = (courseUserSeq: number, params: RequestParams = {}) =>
    this.request<ExamFindUserDetailResponseDto, void>({
      path: `/exam-user/adm/${courseUserSeq}`,
      method: "GET",
      ...params,
    });
  /**
   * @description 관리자 페이지에서 유저가 제출한 시험 채점을 위한 단건 조회
   *
   * @tags [관리자] 유저 시험 채점 API
   * @name FindExamUserUsingGet1
   * @summary [관리자] 유저 시험 채점 (단건) 조회 API
   * @request GET:/exam-user/adm/{examUserSeq}
   */
  findExamUserUsingGet1 = (examUserSeq: number, params: RequestParams = {}) =>
    this.request<ExamUserResponseDto, void>({
      path: `/exam-user/adm/${examUserSeq}`,
      method: "GET",
      ...params,
    });
  /**
   * @description 관리자 페이지에서 유저가 제출한 시험에 관리자가 채점
   *
   * @tags [관리자] 유저 시험 채점 API
   * @name ExamManagerGradingUsingPut
   * @summary [관리자] 유저 시험 채점 API
   * @request PUT:/exam-user/adm/{examUserSeq}
   */
  examManagerGradingUsingPut = (
    examUserSeq: number,
    examUserRequestDto: ExamUserRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<ExamFindUserDetailResponseDto, void>({
      path: `/exam-user/adm/${examUserSeq}`,
      method: "PUT",
      body: examUserRequestDto,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 관리자 페이지에서 제출한 유저시험에 대한 관리자의 평가 삭제
   *
   * @tags [관리자] 유저 시험 채점 API
   * @name DeleteExamUserDetailUsingDelete
   * @summary [관리자] 유저 시험 채점 삭제 API
   * @request DELETE:/exam-user/adm/{examUserSeq}
   */
  deleteExamUserDetailUsingDelete = (examUserSeq: number, params: RequestParams = {}) =>
    this.request<ExamFindUserDetailResponseDto, void>({
      path: `/exam-user/adm/${examUserSeq}`,
      method: "DELETE",
      ...params,
    });
}
