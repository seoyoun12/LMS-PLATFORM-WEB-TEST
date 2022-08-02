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
  QuestionResponseDto,
  QuestionSaveRequestDto,
  QuestionUpdateRequestDto,
  SpecificQuestionInExamTabResponseDto,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Question<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description 관리자 페이지에서 contentSeq 를 Request Param 으로 전달받아 전체 문제 데이터를 조회한다.
   *
   * @tags [관리자] 문제은행 API
   * @name FindQuestionsUsingGet
   * @summary [관리자] 문제은행 전체 조회 API - Pagination
   * @request GET:/question/adm
   */
  findQuestionsUsingGet = (
    query: { contentSeq: number; elementCnt?: number; page: number },
    params: RequestParams = {},
  ) =>
    this.request<QuestionResponseDto[], void>({
      path: `/question/adm`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * @description 관리자 페이지에서 DTO 를 전달받아 문제를 생성한다.
   *
   * @tags [관리자] 문제은행 API
   * @name CreateQuestionUsingPost
   * @summary [관리자] 문제은행 생성 API
   * @request POST:/question/adm
   */
  createQuestionUsingPost = (questionSaveRequestDto: QuestionSaveRequestDto, params: RequestParams = {}) =>
    this.request<QuestionResponseDto, void>({
      path: `/question/adm`,
      method: "POST",
      body: questionSaveRequestDto,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 관리자 페이지에서 콘텐츠의 시험 탭 내 문제은행에 대한 문항 등록 시 문항 검색을 수행한다.<br/>현재 콘텐츠의 seq 를 Path Var 로 전달받고, 문항의 제목을 Optional 하게 Request Param 으로 전달받아 검색을 수행한다. 또한, 현재 Page 또한 Request param 으로 전달받아 페이지네이션을 수행한다.<br/>반환되는 결과는 해당하는 문항에 대한 정보들이다.<br/><b>이때, 문제 은행에서 사용 중지인 상태의 데이터는 조회되지 않는다.<b/>
   *
   * @tags [관리자] 문제은행 API
   * @name FindSpecificQuestionInExamTabUsingGet
   * @summary [관리자] 콘텐츠 내 시험 탭 내 문제은행->문항등록 검색 API
   * @request GET:/question/adm/exam/{contentSeq}
   */
  findSpecificQuestionInExamTabUsingGet = (
    contentSeq: number,
    query: { elementCnt?: number; page: number; questionTitle?: string },
    params: RequestParams = {},
  ) =>
    this.request<SpecificQuestionInExamTabResponseDto, void>({
      path: `/question/adm/exam/${contentSeq}`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * @description 관리자 페이지에서 contentSeq 를 Path Var 로, Body 로 DTO 리스트를 전달받아 문제를 일괄 생성한다.<br/><b>일괄 생성의 경우, DTO 내의 contentSeq 는 비우거나 삭제해도 무관하다.</b>
   *
   * @tags [관리자] 문제은행 API
   * @name CreateQuestionsUsingPost
   * @summary [관리자] 문제은행 일괄 생성 API
   * @request POST:/question/adm/{contentSeq}
   */
  createQuestionsUsingPost = (
    contentSeq: number,
    requestDtoList: QuestionSaveRequestDto[],
    params: RequestParams = {},
  ) =>
    this.request<QuestionResponseDto[], void>({
      path: `/question/adm/${contentSeq}`,
      method: "POST",
      body: requestDtoList,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 관리자 페이지에서 특정 questionSeq 를 Path Variable 로 전달받아 해당하는 문제은행 데이터를 단건 조회한다.
   *
   * @tags [관리자] 문제은행 API
   * @name FindQuestionUsingGet
   * @summary [관리자] 문제은행 단건 조회 API
   * @request GET:/question/adm/{questionSeq}
   */
  findQuestionUsingGet = (questionSeq: number, params: RequestParams = {}) =>
    this.request<QuestionResponseDto, void>({
      path: `/question/adm/${questionSeq}`,
      method: "GET",
      ...params,
    });
  /**
   * @description 관리자 페이지에서 Update DTO 와 questionSeq 를 Path Var 로 전달받아 문제은행 데이터를 수정한다.
   *
   * @tags [관리자] 문제은행 API
   * @name UpdateQuestionUsingPut
   * @summary [관리자] 문제은행 수정 API
   * @request PUT:/question/adm/{questionSeq}
   */
  updateQuestionUsingPut = (
    questionSeq: number,
    questionUpdateRequestDto: QuestionUpdateRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<InputStream, any>({
      path: `/question/adm/${questionSeq}`,
      method: "PUT",
      body: questionUpdateRequestDto,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 관리자 페이지에서 특정 questionSeq 를 Path Variable 로 전달받아 해당 문제은행을 삭제한다.
   *
   * @tags [관리자] 문제은행 API
   * @name DeleteQuestionUsingDelete
   * @summary [관리자] 문제은행 삭제 API
   * @request DELETE:/question/adm/{questionSeq}
   */
  deleteQuestionUsingDelete = (questionSeq: number, params: RequestParams = {}) =>
    this.request<QuestionResponseDto, void>({
      path: `/question/adm/${questionSeq}`,
      method: "DELETE",
      ...params,
    });
}
