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
  ExamQuestionFindResponseDto,
  ExamQuestionResponseDto,
  ExamQuestionSaveRequestDto,
  ExamQuestionSaveResponseDto,
  ExamQuestionUpdateRequestDto,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class ExamQuestion<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description 문제은행에서 해당과정에 등록한 시험문제들 출력
   *
   * @tags [관리자] 시험 문제 API
   * @name FindExamUserUsingGet
   * @summary 시험 문제 조회 (문제은행에서 등록된 과정) API - Pagination
   * @request GET:/exam-question
   */
  findExamUserUsingGet = (query: { elementCnt?: number; examSeq: number; page: number }, params: RequestParams = {}) =>
    this.request<ExamQuestionFindResponseDto[], void>({
      path: `/exam-question`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * @description 관리자 페이지에서 examSeq 를 Request Param 으로 전달받아 전체 시험 문제 데이터를 조회한다.
   *
   * @tags [관리자] 시험 문제 API
   * @name FindExamUsingGet
   * @summary 시험 문제 전체 조회 API - Pagination
   * @request GET:/exam-question/adm
   */
  findExamUsingGet = (query: { elementCnt?: number; examSeq: number; page: number }, params: RequestParams = {}) =>
    this.request<ExamQuestionFindResponseDto[], void>({
      path: `/exam-question/adm`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * @description 관리자 페이지에서 시험 문제 생성 Enum QUESTION_OBJ : 객관식 QUESTION_SUBJ : 주관식 * 객관식일땐 정답 설명 컬럼에 값을 넣지않는다. * 주관식일땐 보기 컬럼에 값을 넣지않는다.
   *
   * @tags [관리자] 시험 문제 API
   * @name CreateExamQuestionUsingPost
   * @summary 시험 문제 생성 API
   * @request POST:/exam-question/adm
   */
  createExamQuestionUsingPost = (examQuestionSaveRequestDto: ExamQuestionSaveRequestDto, params: RequestParams = {}) =>
    this.request<ExamQuestionSaveResponseDto, void>({
      path: `/exam-question/adm`,
      method: "POST",
      body: examQuestionSaveRequestDto,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 관리자 페이지에서 examSeq 를 Path Var 로 전달받아 해당하는 데이터를 가져온다.
   *
   * @tags [관리자] 시험 문제 API
   * @name FindExamDetailUsingGet1
   * @summary [관리자] 시험 문제 단건 조회 API
   * @request GET:/exam-question/adm/{examQuestionSeq}
   */
  findExamDetailUsingGet1 = (examQuestionSeq: number, params: RequestParams = {}) =>
    this.request<ExamQuestionFindResponseDto, void>({
      path: `/exam-question/adm/${examQuestionSeq}`,
      method: "GET",
      ...params,
    });
  /**
   * @description 관리자 페이지에서 examSeq 를 Path Variable 로, 수정을 위한 DTO 를 전달받아 해당하는 시험 문제를 수정한다.
   *
   * @tags [관리자] 시험 문제 API
   * @name UpdateExamQuestionUsingPut
   * @summary 시험 문제 수정 API
   * @request PUT:/exam-question/adm/{examQuestionSeq}
   */
  updateExamQuestionUsingPut = (
    examQuestionSeq: number,
    examQuestionUpdateRequestDto: ExamQuestionUpdateRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<ExamQuestionResponseDto, void>({
      path: `/exam-question/adm/${examQuestionSeq}`,
      method: "PUT",
      body: examQuestionUpdateRequestDto,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 관리자 페이지에서 exam 에 대한 seq 를 Path Variable 로 전달받아 해당하는 시험 문제를 삭제한다.
   *
   * @tags [관리자] 시험 문제 API
   * @name DeleteExamUsingDelete1
   * @summary 시험 문제 삭제 API
   * @request DELETE:/exam-question/adm/{examQuestionSeq}
   */
  deleteExamUsingDelete1 = (examSeq: number, examQuestionSeq: string, params: RequestParams = {}) =>
    this.request<ExamQuestionResponseDto, void>({
      path: `/exam-question/adm/${examQuestionSeq}`,
      method: "DELETE",
      ...params,
    });
}
