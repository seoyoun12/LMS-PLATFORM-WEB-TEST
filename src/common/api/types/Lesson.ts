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
  LessonDetailResponseDto,
  LessonResponseDto,
  LessonSaveRequestDto,
  LessonUpdateRequestDto,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Lesson<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description 관리자 권한으로 Lesson 의 시퀀스를 Path Variable 로 전달받아 해당 Lesson 을 DB 에서 영구 제거한다.
   *
   * @tags [관리자] 레슨 API
   * @name DeleteLessonUsingDelete
   * @summary [관리자] 레슨 삭제 API
   * @request DELETE:/lesson/adm/delete/{lessonSeq}
   */
  deleteLessonUsingDelete = (lessonSeq: number, params: RequestParams = {}) =>
    this.request<LessonDetailResponseDto, void>({
      path: `/lesson/adm/delete/${lessonSeq}`,
      method: "DELETE",
      ...params,
    });
  /**
   * @description 관리자 권한으로 Lesson 의 시퀀스를 전달받아 해당 Lesson 을 단건 조회한다.
   *
   * @tags [관리자] 레슨 API
   * @name FindLessonUsingGet
   * @summary [관리자] 레슨 단건 조회 API
   * @request GET:/lesson/adm/detail/{lessonSeq}
   */
  findLessonUsingGet = (lessonSeq: number, params: RequestParams = {}) =>
    this.request<LessonDetailResponseDto, void>({
      path: `/lesson/adm/detail/${lessonSeq}`,
      method: "GET",
      ...params,
    });
  /**
   * @description 관리자 권한으로 Lesson 의 시퀀스를 Path Variable 로 전달받아 해당 Lesson 을 수정한다.{ "completeTime": 1532 -> 수료시간, "lessonNm": "string" -> 레슨 이름, "lessonType": 0 -> 레슨 타입 Enum, "chapter": 3 -> 차시, "status": 1 -> 사용 여부, "totalPage": 12 -> 전체 페이지, "totalTime": 1532 -> 총 시간 }
   *
   * @tags [관리자] 레슨 API
   * @name UpdateLessonUsingPut
   * @summary [관리자] 레슨 수정 API
   * @request PUT:/lesson/adm/modification/{lessonSeq}
   */
  updateLessonUsingPut = (
    lessonSeq: number,
    lessonUpdateRequestDto: LessonUpdateRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<LessonResponseDto, void>({
      path: `/lesson/adm/modification/${lessonSeq}`,
      method: "PUT",
      body: lessonUpdateRequestDto,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 관리자 권한으로 콘텐트의 seq 를 Path Variable 로 전달받아 해당 콘텐트에 해당하는 전체 Lesson 을 chapter(차시) 순으로 조회한다.
   *
   * @tags [관리자] 레슨 API
   * @name FindLessonsUsingGet
   * @summary [관리자] 레슨 전체 조회 API
   * @request GET:/lesson/adm/{contentSeq}
   */
  findLessonsUsingGet = (contentSeq: number, params: RequestParams = {}) =>
    this.request<LessonResponseDto[], void>({
      path: `/lesson/adm/${contentSeq}`,
      method: "GET",
      ...params,
    });
  /**
   * @description 관리자 권한으로 contentSeq 를 PathVar 로, DTO를 Body 로 전달받아 Lesson 을 일괄 생성한다.<br/><b>일괄 생성의 경우, DTO 내의 contentSeq 는 비우거나 삭제해도 무관하다.</b>
   *
   * @tags [관리자] 레슨 API
   * @name CreateLessonUsingPost
   * @summary [관리자] 레슨 일괄 생성 API
   * @request POST:/lesson/adm/{contentSeq}
   */
  createLessonUsingPost = (
    contentSeq: number,
    lessonSaveRequestDtoList: LessonSaveRequestDto[],
    params: RequestParams = {},
  ) =>
    this.request<LessonResponseDto[], any>({
      path: `/lesson/adm/${contentSeq}`,
      method: "POST",
      body: lessonSaveRequestDtoList,
      type: ContentType.Json,
      ...params,
    });
}
