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
  ForumCommentResponseDto,
  ForumCommentSaveRequestDto,
  ForumCommentUpdateRequestDto,
  ForumDetailResponseDto,
  ForumResponseDto,
  ForumSaveRequestDto,
  ForumUpdateRequestDto,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Forum<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description 특정 토론 시퀀스에 대해 등록된 모든 댓글 데이터를 조회한다. 페이징을 위한 파라미터도 함께 RequestParam 으로 전달받는다.
   *
   * @tags [App] 토론 댓글 API
   * @name FindForumCommentsUsingGet
   * @summary [App] 댓글 전체 조회 API - Pagination
   * @request GET:/forum/comment
   */
  findForumCommentsUsingGet = (
    query: { elementCnt?: number; forumSeq: number; page: number },
    params: RequestParams = {},
  ) =>
    this.request<ForumCommentResponseDto[], void>({
      path: `/forum/comment`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * @description 특정 토론 시퀀스 forumSeq 에 대해 댓글을 작성한다.<br/><b>부모 댓글일 경우, DTO 내 reference 가 null 이어야하며, 부모 댓글에 대한 대댓글일 경우 DTO 내 reference 는 부모 댓글 시퀀스를 가져야한다.</b>
   *
   * @tags [App] 토론 댓글 API
   * @name CreateForumCommentUsingPost
   * @summary [App] 댓글 등록 API
   * @request POST:/forum/comment
   */
  createForumCommentUsingPost = (requestDto: ForumCommentSaveRequestDto, params: RequestParams = {}) =>
    this.request<ForumCommentResponseDto, void>({
      path: `/forum/comment`,
      method: "POST",
      body: requestDto,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 특정 댓글 시퀀스를 수정한다. 이때 요청한 사용자는 작성한 사용자와 동일한 사용자여야한다. 그렇지 않을 경우, 예외를 발생시킨다.
   *
   * @tags [App] 토론 댓글 API
   * @name UpdateForumCommentUsingPut
   * @summary [App] 댓글 수정 API
   * @request PUT:/forum/comment/{forumCommentSeq}
   */
  updateForumCommentUsingPut = (
    forumCommentSeq: number,
    requestDto: ForumCommentUpdateRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<ForumCommentResponseDto, void>({
      path: `/forum/comment/${forumCommentSeq}`,
      method: "PUT",
      body: requestDto,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 특정 댓글 시퀀스를 Path Var 로 전달받아 해당 댓글을 삭제한다. 이때 요청한 사용자는 작성한 사용자와 동일한 사용자여야한다. 그렇지 않을 경우, 예외를 발생시킨다.<br/>댓글 및 게시글 삭제의 경우, status 를 -1 로 변경시킨다.<br/>관리자는 댓글을 자유롭게 삭제할 수 있다.
   *
   * @tags [App] 토론 댓글 API
   * @name DeleteForumCommentUsingDelete
   * @summary [App] 댓글 삭제 API
   * @request DELETE:/forum/comment/{forumCommentSeq}
   */
  deleteForumCommentUsingDelete = (forumCommentSeq: number, params: RequestParams = {}) =>
    this.request<ForumCommentResponseDto, void>({
      path: `/forum/comment/${forumCommentSeq}`,
      method: "DELETE",
      ...params,
    });
  /**
   * @description 관리자 페이지 내 특정 강의에 대한 courseSeq 와 페이징 처리를 위한 인자를 RequestParam 으로 전달받아 해당하는 토론을 전체 조회한다.
   *
   * @tags [App & 관리자 & 튜터] 토론 API
   * @name FindForumsUsingGet
   * @summary [관리자 & 튜터] 토론 전체 조회 API - Pagination, JWT, 파일
   * @request GET:/forum/tutor
   */
  findForumsUsingGet = (query: { courseSeq: number; elementCnt?: number; page: number }, params: RequestParams = {}) =>
    this.request<ForumResponseDto, void>({
      path: `/forum/tutor`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * @description 관리자 페이지 내 강의에서 DTO 를 전달받아 토론을 생성한다.
   *
   * @tags [App & 관리자 & 튜터] 토론 API
   * @name CreateForumUsingPost
   * @summary [관리자 & 튜터] 토론 생성 API - JWT, 파일
   * @request POST:/forum/tutor
   */
  createForumUsingPost = (requestDto: ForumSaveRequestDto, params: RequestParams = {}) =>
    this.request<ForumResponseDto, void>({
      path: `/forum/tutor`,
      method: "POST",
      body: requestDto,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 관리자 페이지 내 특정 토론에 대한 forumSeq 를 PathVar 로 전달받아 해당 토론을 조회한다.
   *
   * @tags [App & 관리자 & 튜터] 토론 API
   * @name FindForumUsingGet
   * @summary [관리자 & 튜터] 토론 단건 조회 API
   * @request GET:/forum/tutor/{forumSeq}
   */
  findForumUsingGet = (forumSeq: number, params: RequestParams = {}) =>
    this.request<ForumDetailResponseDto, void>({
      path: `/forum/tutor/${forumSeq}`,
      method: "GET",
      ...params,
    });
  /**
   * @description 관리자 페이지에서 특정 forumSeq 를 PathVar 로 전달받아 해당하는 토론을 수정한다.{ "content": "string", "courseSeq": 0, "status": 0, "subject": "string", "userSeq": 0 }
   *
   * @tags [App & 관리자 & 튜터] 토론 API
   * @name UpdateForumUsingPut
   * @summary [관리자 & 튜터] 토론 수정 API
   * @request PUT:/forum/tutor/{forumSeq}
   */
  updateForumUsingPut = (forumSeq: number, requestDto: ForumUpdateRequestDto, params: RequestParams = {}) =>
    this.request<ForumResponseDto, void>({
      path: `/forum/tutor/${forumSeq}`,
      method: "PUT",
      body: requestDto,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 관리자 페이지 내 토론 시퀀스에 해당하는 forumSeq 를 전달받아 해당 토론을 DB 에서 제거한다.
   *
   * @tags [App & 관리자 & 튜터] 토론 API
   * @name DeleteForumUsingDelete
   * @summary [관리자 & 튜터] 토론 삭제 API
   * @request DELETE:/forum/tutor/{forumSeq}
   */
  deleteForumUsingDelete = (forumSeq: number, params: RequestParams = {}) =>
    this.request<ForumResponseDto, void>({
      path: `/forum/tutor/${forumSeq}`,
      method: "DELETE",
      ...params,
    });
}
