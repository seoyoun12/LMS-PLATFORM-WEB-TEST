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

import { InputStream, SurveyParticipateRequestDto, SurveyRequestDto, SurveyResponseDto } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Survey<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description 관리자 페이지에서 설문에 대하여 전체 조회를 수행한다. 쿼리 스트링으로 페이징 및 검색을 위한 데이터를 전달받는다.
   *
   * @tags [App & 관리자] 설문 API
   * @name AdmFindAllSurveysUsingGet
   * @summary [관리자] 설문 전체 조회 API
   * @request GET:/survey/adm
   */
  admFindAllSurveysUsingGet = (
    query?: { elementCnt?: number; page?: number; title?: string },
    params: RequestParams = {},
  ) =>
    this.request<SurveyResponseDto[], any>({
      path: `/survey/adm`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * @description 관리자 페이지에서 설문을 생성한다. Json 형태로 Request Body 를 전달받는다.
   *
   * @tags [App & 관리자] 설문 API
   * @name AdmCreateSurveyUsingPost
   * @summary [관리자] 설문 생성 API
   * @request POST:/survey/adm
   */
  admCreateSurveyUsingPost = (requestDto: SurveyRequestDto, params: RequestParams = {}) =>
    this.request<SurveyResponseDto, any>({
      path: `/survey/adm`,
      method: "POST",
      body: requestDto,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 관리자 페이지에서 특정 설문을 단건 조회한다.
   *
   * @tags [App & 관리자] 설문 API
   * @name AdmFindSurveyUsingGet
   * @summary [관리자] 설문 단건 조회 API
   * @request GET:/survey/adm/{surveySeq}
   */
  admFindSurveyUsingGet = (surveySeq: number, params: RequestParams = {}) =>
    this.request<InputStream, any>({
      path: `/survey/adm/${surveySeq}`,
      method: "GET",
      ...params,
    });
  /**
   * @description 관리자 페이지에서 특정 설문을 수정한다.
   *
   * @tags [App & 관리자] 설문 API
   * @name AdmModifySurveyUsingPut
   * @summary [관리자] 설문 수정 API
   * @request PUT:/survey/adm/{surveySeq}
   */
  admModifySurveyUsingPut = (surveySeq: number, requestDto: SurveyRequestDto, params: RequestParams = {}) =>
    this.request<SurveyResponseDto, void>({
      path: `/survey/adm/${surveySeq}`,
      method: "PUT",
      body: requestDto,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 관리자 페이지에서 특정 설문을 제거한다.
   *
   * @tags [App & 관리자] 설문 API
   * @name AdmDeleteSurveyUsingDelete
   * @summary [관리자] 특정 설문 삭제 API
   * @request DELETE:/survey/adm/{surveySeq}
   */
  admDeleteSurveyUsingDelete = (surveySeq: number, params: RequestParams = {}) =>
    this.request<SurveyResponseDto, void>({
      path: `/survey/adm/${surveySeq}`,
      method: "DELETE",
      ...params,
    });
  /**
   * @description 클라이언트 단에서 현재 유저가 수강중인 과정 신청 시퀀스를 전달받아 특정 설문을 조회한다. 설문 조회 시, 요청자의 유저 시퀀스에 대하여 현재 과정에 대한 전체 진도율이 100%인지 체크한다. 진도율이 100% 이 아닐 경우 예외를 발생시킨다.
   *
   * @tags [App & 관리자] 설문 API
   * @name FindSurveyUsingGet
   * @summary [App] 설문 조회 API
   * @request GET:/survey/course-class/{courseUserSeq}
   */
  findSurveyUsingGet = (courseUserSeq: number, params: RequestParams = {}) =>
    this.request<SurveyResponseDto, void>({
      path: `/survey/course-class/${courseUserSeq}`,
      method: "GET",
      ...params,
    });
  /**
   * @description 클라이언트에서 특정 surveySeq 에 대해 설문 참여 이후, 결과를 제출한다. 요청 데이터 중, answer 프로퍼티는 사용자가 선택한 문항 인덱스 또는 주관식에 대한 답변이다. (객관식의 경우 -> item1~item10) item1: 1 item2: 2 itemN: N then 'answer': '3' 주관식의 경우 'answer': '나는 집에 가고 싶다 등' <b>객관식의 '기타' 항목일 경우 etcAnswer 에 값을 포함하여 전송. 이외에는 반드시 null 혹은 공백이어야한다.</b>
   *
   * @tags [App & 관리자] 설문 API
   * @name ParticipateSurveyUsingPost
   * @summary [App] 설문 참여(제출) API
   * @request POST:/survey/participant
   */
  participateSurveyUsingPost = (requestDto: SurveyParticipateRequestDto, params: RequestParams = {}) =>
    this.request<InputStream, any>({
      path: `/survey/participant`,
      method: "POST",
      body: requestDto,
      type: ContentType.Json,
      ...params,
    });
}
