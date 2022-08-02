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
  ExamDetailResponseDto,
  ExamMultiSubjectUpdateResponseDto,
  ExamQuestionBankSaveRequestDto,
  ExamQuestionResponseDto,
  ExamResponseDto,
  ExamSaveRequestDto,
  ExamTestResponseDto,
  ExamTestTemporaryResponseDto,
  ExamUpdateRequestDto,
  InputStream,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Exam<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description 관리자 페이지에서 contentSeq 를 Request Param 으로 전달받아 전체 시험 데이터를 조회한다.
   *
   * @tags [관리자] 시험 API
   * @name FindExamsUsingGet
   * @summary 시험 전체 조회 API - Pagination
   * @request GET:/exam/adm
   */
  findExamsUsingGet = (query: { contentSeq: number; elementCnt?: number; page: number }, params: RequestParams = {}) =>
    this.request<ExamResponseDto[], void>({
      path: `/exam/adm`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * @description 관리자 페이지에서 DTO 를 전달받아 시험을 생성한다.
   *
   * @tags [관리자] 시험 API
   * @name CreateExamUsingPost
   * @summary 시험 생성 API
   * @request POST:/exam/adm
   */
  createExamUsingPost = (examSaveRequestDto: ExamSaveRequestDto, params: RequestParams = {}) =>
    this.request<ExamResponseDto, void>({
      path: `/exam/adm`,
      method: "POST",
      body: examSaveRequestDto,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 관리자 페이지에서 시험 시퀀스에 해당하는 examSeq 를 Path Var 로 전달받아 현재 시험에 등록된 문제 은행 목록을 조회한다.
   *
   * @tags [관리자] 시험 API
   * @name FindEnrolledQuestionOntoExamUsingGet
   * @summary [관리자] 시험 내 등록된 문제 은행 조회 API - 문항관리
   * @request GET:/exam/adm/question-bank/{examSeq}
   */
  findEnrolledQuestionOntoExamUsingGet = (examSeq: number, params: RequestParams = {}) =>
    this.request<ExamQuestionResponseDto[], void>({
      path: `/exam/adm/question-bank/${examSeq}`,
      method: "GET",
      ...params,
    });
  /**
   * @description 관리자 페이지에서 시험 시퀀스에 해당하는 examSeq 를 Path Var 로 전달받아 문제 은행을 등록한다.<br/>문제 은행에 대한 DTO 내 문제 시퀀스를 리스트로 전달받아 수행한다
   *
   * @tags [관리자] 시험 API
   * @name EnrollQuestionOntoExamUsingPost
   * @summary [관리자] 시험 내 문제 은행 등록 API - 문항관리
   * @request POST:/exam/adm/question-bank/{examSeq}
   */
  enrollQuestionOntoExamUsingPost = (
    examSeq: number,
    requestDto: ExamQuestionBankSaveRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<InputStream, any>({
      path: `/exam/adm/question-bank/${examSeq}`,
      method: "POST",
      body: requestDto,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 관리자 페이지에서 시험 시퀀스에 해당하는 examSeq 를 Path Var 로, 삭제할 문제은행 시퀀스를 리스트로 전달받아 등록된 문제 은행을 제거한다.
   *
   * @tags [관리자] 시험 API
   * @name DeleteEnrolledQuestionOnExamUsingDelete
   * @summary [관리자] 시험 내 등록된 특정 문제 은행 제거 API - 문항관리
   * @request DELETE:/exam/adm/question-bank/{examSeq}
   */
  deleteEnrolledQuestionOnExamUsingDelete = (
    examSeq: number,
    query: { questionSeqList: number[] },
    params: RequestParams = {},
  ) =>
    this.request<InputStream, any>({
      path: `/exam/adm/question-bank/${examSeq}`,
      method: "DELETE",
      query: query,
      ...params,
    });
  /**
   * @description 관리자 페이지에서 examSeq 를 Path Var 로 전달받아 해당하는 데이터를 가져온다.
   *
   * @tags [관리자] 시험 API
   * @name FindExamDetailUsingGet
   * @summary [관리자] 시험 단건 조회 API
   * @request GET:/exam/adm/{examSeq}
   */
  findExamDetailUsingGet = (examSeq: number, params: RequestParams = {}) =>
    this.request<ExamDetailResponseDto, void>({
      path: `/exam/adm/${examSeq}`,
      method: "GET",
      ...params,
    });
  /**
   * @description 관리자 페이지에서 examSeq 를 Path Variable 로, 수정을 위한 DTO 를 전달받아 해당하는 시험을 수정한다.
   *
   * @tags [관리자] 시험 API
   * @name UpdateExamUsingPut
   * @summary 시험 수정 API
   * @request PUT:/exam/adm/{examSeq}
   */
  updateExamUsingPut = (examSeq: number, examUpdateRequestDto: ExamUpdateRequestDto, params: RequestParams = {}) =>
    this.request<ExamResponseDto, void>({
      path: `/exam/adm/${examSeq}`,
      method: "PUT",
      body: examUpdateRequestDto,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 관리자 페이지에서 exam 에 대한 seq 를 Path Variable 로 전달받아 해당하는 시험을 삭제한다.
   *
   * @tags [관리자] 시험 API
   * @name DeleteExamUsingDelete
   * @summary 시험 삭제 API
   * @request DELETE:/exam/adm/{examSeq}
   */
  deleteExamUsingDelete = (examSeq: number, params: RequestParams = {}) =>
    this.request<ExamResponseDto, void>({
      path: `/exam/adm/${examSeq}`,
      method: "DELETE",
      ...params,
    });
  /**
   * @description 유저-과정 시퀀스를 받아 유저가 시험을 제출할때 호출되는 API
   *
   * @tags [관리자] 시험 API
   * @name FindExamUsingPut
   * @summary 유저 시험 제출 API
   * @request PUT:/exam/submission/{courseUserSeq}
   */
  findExamUsingPut = (
    courseUserSeq: string,
    query: { courseUserSeq: number; examSeq: number },
    params: RequestParams = {},
  ) =>
    this.request<ExamMultiSubjectUpdateResponseDto, void>({
      path: `/exam/submission/${courseUserSeq}`,
      method: "PUT",
      query: query,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 유저가 시험을 시작하면 해당 시험리스트를 뿌려주고 임시 저장이 시작되는 API
   *
   * @tags [관리자] 시험 API
   * @name FindTestListUsingGet
   * @summary 시험 테스트 API
   * @request GET:/exam/test
   */
  findTestListUsingGet = (query: { courseUserSeq: number; examSeq: number }, params: RequestParams = {}) =>
    this.request<ExamTestResponseDto, void>({
      path: `/exam/test`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * @description 유저가 입력 하던 시험에 관한 정보를 보여주는 API * 임시 저장된 값을 불러온다 * 시간이 지났다면 재응시 해야한다.
   *
   * @tags [관리자] 시험 API
   * @name FindTestListTemporaryUsingGet
   * @summary 시험 임시 저장화면 조회 API
   * @request GET:/exam/test/temporary
   */
  findTestListTemporaryUsingGet = (query: { courseUserSeq: number; examSeq: number }, params: RequestParams = {}) =>
    this.request<ExamTestTemporaryResponseDto, void>({
      path: `/exam/test/temporary`,
      method: "GET",
      query: query,
      ...params,
    });
}
