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
  HomeworkDetailResponseDto,
  HomeworkResponseDto,
  HomeworkSaveRequestDto,
  HomeworkUpdateRequestDto,
  InputStream,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Homework<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description 관리자 페이지의 콘텐츠 내 과제 탭에서 전체 과제를 조회한다. RequestParam 으로 contentSeq 와 페이징에 관련된 인자를 전달받는다.
   *
   * @tags [App & 관리자] 과제 API
   * @name FindHomeworksUsingGet
   * @summary [관리자] 과제 전체 조회 API - pagination
   * @request GET:/homework/adm
   */
  findHomeworksUsingGet = (
    query: { contentSeq: number; elementCnt?: number; page: number },
    params: RequestParams = {},
  ) =>
    this.request<HomeworkResponseDto[], void>({
      path: `/homework/adm`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * @description 관리자 페이지의 콘텐츠 내 과제 탭에서 DTO 와 파일 리스트를 전달받아 과제를 생성한다.{ "bestAnswer": "모범답안", "content": "내용 마크다운", "contentSeq": 1, "markingRole": "채점기준", "status": 1, "subject": "제목" }
   *
   * @tags [App & 관리자] 과제 API
   * @name CreateHomeworkUsingPost
   * @summary [관리자] 과제 생성 API
   * @request POST:/homework/adm
   */
  createHomeworkUsingPost = (requestDto: HomeworkSaveRequestDto, params: RequestParams = {}) =>
    this.request<HomeworkResponseDto, any>({
      path: `/homework/adm`,
      method: "POST",
      body: requestDto,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 관리자 페이지의 콘텐츠 내 과제 탭에서 콘텐츠 시퀀스인 contentSeq 를 PathVariable 로 전달받고, DTO 리스트를 전달받아 과제를 생성한다.<br/><b>일괄 생성의 경우, DTO 내의 contentSeq 는 비우거나 삭제해도 무관하다.</b><br/>일괄 등록 시 파일은 업로드 할 수없다.
   *
   * @tags [App & 관리자] 과제 API
   * @name CreateHomeworksUsingPost
   * @summary [관리자] 과제 일괄 생성 API
   * @request POST:/homework/adm/{contentSeq}
   */
  createHomeworksUsingPost = (
    contentSeq: number,
    requestDtoList: HomeworkSaveRequestDto[],
    params: RequestParams = {},
  ) =>
    this.request<HomeworkResponseDto[], void>({
      path: `/homework/adm/${contentSeq}`,
      method: "POST",
      body: requestDtoList,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 관리자 페이지의 콘텐츠 내 과제 탭에서 특정 과제를 조회한다. 이때, homeworkSeq 를 Path Var 로 전달받아 조회한다.
   *
   * @tags [App & 관리자] 과제 API
   * @name FindHomeworkUsingGet
   * @summary [관리자] 과제 단건 조회 API
   * @request GET:/homework/adm/{homeworkSeq}
   */
  findHomeworkUsingGet = (homeworkSeq: number, params: RequestParams = {}) =>
    this.request<HomeworkDetailResponseDto, void>({
      path: `/homework/adm/${homeworkSeq}`,
      method: "GET",
      ...params,
    });
  /**
   * @description 관리자 페이지의 콘텐츠 내 특정 과제에서 수정할 DTO 와 파일 리스트를 RequestPart 로, 그리고 homeworkSeq 를 Path Var 로 전달받아 과제를 수정한다.{ "bestAnswer": "string", "content": "string", "contentSeq": 0, "markingRole": "string", "status": 0, "subject": "string" }
   *
   * @tags [App & 관리자] 과제 API
   * @name UpdateHomeworkUsingPut
   * @summary [관리자] 과제 수정 API
   * @request PUT:/homework/adm/{homeworkSeq}
   */
  updateHomeworkUsingPut = (homeworkSeq: number, requestDto: HomeworkUpdateRequestDto, params: RequestParams = {}) =>
    this.request<InputStream, any>({
      path: `/homework/adm/${homeworkSeq}`,
      method: "PUT",
      body: requestDto,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 관리자 페이지의 콘텐츠 내 과제 탭에서 특정 과제를 제거한다. 이때, homewworkSeq 를 Path Var 로 전달받아 삭제한다.
   *
   * @tags [App & 관리자] 과제 API
   * @name DeleteHomeworkUsingDelete
   * @summary [관리자] 과제 삭제 API
   * @request DELETE:/homework/adm/{homeworkSeq}
   */
  deleteHomeworkUsingDelete = (homeworkSeq: number, params: RequestParams = {}) =>
    this.request<HomeworkResponseDto, void>({
      path: `/homework/adm/${homeworkSeq}`,
      method: "DELETE",
      ...params,
    });
}
