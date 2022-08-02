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
  ExamExamSubjectiveResultUpdateRequestDto,
  ExamMultipleChoiceResultResponseDto,
  ExamSubjectiveResultRequestSaveDto,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class ExamSubject<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description 유저-과정 시퀀스와 시험문제 시퀀스를 받아 해당과정의 유저가 시험을 푼 결과값 저장
   *
   * @tags [관리자] 시험 문제 결과 테이블 주관식 API
   * @name CreateExamSubjectUsingPost
   * @summary 시험 문제 결과 테이블 주관식 생성 API
   * @request POST:/exam-subject
   */
  createExamSubjectUsingPost = (
    examSubjectiveResultRequestSaveDto: ExamSubjectiveResultRequestSaveDto,
    params: RequestParams = {},
  ) =>
    this.request<ExamSubjectiveResultRequestSaveDto, void>({
      path: `/exam-subject`,
      method: "POST",
      body: examSubjectiveResultRequestSaveDto,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 해당 주관식의 시퀀스로 유저가 Input 타입을 벗어날때 실행되는 API
   *
   * @tags [관리자] 시험 문제 결과 테이블 주관식 API
   * @name UpdateExamSubjectUsingPut
   * @summary 시험 문제 주관식답안 API
   * @request PUT:/exam-subject/{examSubjectSeq}
   */
  updateExamSubjectUsingPut = (
    examSubjectSeq: number,
    examExamSubjectiveResultUpdateRequestDto: ExamExamSubjectiveResultUpdateRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<ExamMultipleChoiceResultResponseDto, void>({
      path: `/exam-subject/${examSubjectSeq}`,
      method: "PUT",
      body: examExamSubjectiveResultUpdateRequestDto,
      type: ContentType.Json,
      ...params,
    });
}
