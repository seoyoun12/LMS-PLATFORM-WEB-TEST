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
  ExamMultipleChoiceResultRequestDto,
  ExamMultipleChoiceResultResponseDto,
  ExamMultipleChoiceResultUpdateRequestDto,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class ExamMultipleChoice<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description 유저-과정 시퀀스와 시험문제 시퀀스를 받아 해당과정의 유저가 시험을 푼 결과값 저장
   *
   * @tags [관리자] 시험 질문 테이블 객관식 API
   * @name CreateExamMultipleChoiceUsingPost
   * @summary 시험 문제 결과 테이블 객관식 생성 API
   * @request POST:/exam-multiple-choice
   */
  createExamMultipleChoiceUsingPost = (
    examMultipleChoiceResultRequestDto: ExamMultipleChoiceResultRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<ExamMultipleChoiceResultResponseDto, void>({
      path: `/exam-multiple-choice`,
      method: "POST",
      body: examMultipleChoiceResultRequestDto,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 해당 객관식의 시퀀스로 유저가 답안을 선택할때마다 실행되는 API
   *
   * @tags [관리자] 시험 질문 테이블 객관식 API
   * @name UpdateExamMultipleChoiceUsingPut
   * @summary 시험 문제 선택답안 API
   * @request PUT:/exam-multiple-choice/{examMultiSeq}
   */
  updateExamMultipleChoiceUsingPut = (
    examMultiSeq: number,
    examMultipleChoiceResultUpdateRequestDto: ExamMultipleChoiceResultUpdateRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<ExamMultipleChoiceResultResponseDto, void>({
      path: `/exam-multiple-choice/${examMultiSeq}`,
      method: "PUT",
      body: examMultipleChoiceResultUpdateRequestDto,
      type: ContentType.Json,
      ...params,
    });
}
