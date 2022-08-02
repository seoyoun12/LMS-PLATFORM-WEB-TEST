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
  PostCommentResponseDto,
  PostCommentSaveRequestDto,
  PostCommentUpdateRequestDto,
  PostDetailResponseDto,
  PostResponseDto,
  PostSaveRequestDto,
  PostUpdateRequestDto,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Post<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description 앱에서 게시글의 타입을 전달받아 해당하는 타입의 전체 게시글을 조회한다.
   *
   * @tags [App & 관리자] 게시글 API
   * @name FindPostsUsingGet
   * @summary [App] 게시글 전체 조회 - Pagination
   * @request GET:/post
   */
  findPostsUsingGet = (
    query: {
      boardType:
        | "TYPE_NOTICE"
        | "TYPE_REVIEW"
        | "TYPE_FAQ"
        | "TYPE_GUIDE_AUTH"
        | "TYPE_GUIDE_EDU_REGI"
        | "TYPE_GUIDE_EDU_LEARNING";
      courseSeq?: number;
      elementCnt?: number;
      page: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<PostResponseDto, void>({
      path: `/post`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * @description 게시글을 작성한다. 이때, 공지, FAQ, 가이드 타입의 게시글은 관리자만 허용된다. 해당 타입에 대해서 관리자 권한이 없을 경우 예외를 발생시킨다. <b>courseSeq 가 0일 경우, 전체 공지 및 전체 자주묻는 질문, 전체 가이드로 등록된다.</b>
   *
   * @tags [App & 관리자] 게시글 API
   * @name CreatePostUsingPost
   * @summary [App & 관리자] 게시글 작성 API - JWT
   * @request POST:/post
   */
  createPostUsingPost = (requestDto: PostSaveRequestDto, params: RequestParams = {}) =>
    this.request<PostResponseDto, void>({
      path: `/post`,
      method: "POST",
      body: requestDto,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 관리자 페이지에서 게시글의 시퀀스를 Path Var 로 전달받아 해당 게시글을 단건 조회한다.
   *
   * @tags [App & 관리자] 게시글 API
   * @name AdmFindPostUsingGet
   * @summary [관리자] 게시글 단건 조회
   * @request GET:/post/adm/{postSeq}
   */
  admFindPostUsingGet = (postSeq: number, params: RequestParams = {}) =>
    this.request<PostDetailResponseDto, void>({
      path: `/post/adm/${postSeq}`,
      method: "GET",
      ...params,
    });
  /**
   * @description 특정 게시글 시퀀스에 대해 등록된 모든 댓글 데이터를 조회한다. 페이징을 위한 파라미터도 함께 RequestParam 으로 전달받는다.
   *
   * @tags [App] 게시글 댓글 API
   * @name FindPostCommentsUsingGet
   * @summary [App] 댓글 전체 조회 API - Pagination
   * @request GET:/post/comment
   */
  findPostCommentsUsingGet = (
    query: { elementCnt?: number; page: number; postSeq: number },
    params: RequestParams = {},
  ) =>
    this.request<PostCommentResponseDto[], void>({
      path: `/post/comment`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * @description 특정 게시글 시퀀스 postSeq 에 대해 댓글을 작성한다.<br/><b>부모 댓글일 경우, DTO 내 reference 가 null 이어야하며, 부모 댓글에 대한 대댓글일 경우 DTO 내 reference 는 부모 댓글 시퀀스를 가져야한다.</b>
   *
   * @tags [App] 게시글 댓글 API
   * @name CreatePostCommentUsingPost
   * @summary [App] 댓글 등록 API
   * @request POST:/post/comment
   */
  createPostCommentUsingPost = (requestDto: PostCommentSaveRequestDto, params: RequestParams = {}) =>
    this.request<PostCommentResponseDto, void>({
      path: `/post/comment`,
      method: "POST",
      body: requestDto,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 특정 댓글 시퀀스를 수정한다. 이때 요청한 사용자는 작성한 사용자와 동일한 사용자여야한다. 그렇지 않을 경우, 예외를 발생시킨다.
   *
   * @tags [App] 게시글 댓글 API
   * @name UpdatePostCommentUsingPut
   * @summary [App] 댓글 수정 API
   * @request PUT:/post/comment/{postCommentSeq}
   */
  updatePostCommentUsingPut = (
    postCommentSeq: number,
    requestDto: PostCommentUpdateRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<PostCommentResponseDto, void>({
      path: `/post/comment/${postCommentSeq}`,
      method: "PUT",
      body: requestDto,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 특정 댓글 시퀀스를 Path Var 로 전달받아 해당 댓글을 삭제한다. 이때 요청한 사용자는 작성한 사용자와 동일한 사용자여야한다. 그렇지 않을 경우, 예외를 발생시킨다.<br/>댓글 및 게시글 삭제의 경우, status 를 -1 로 변경시킨다.<br/>관리자는 댓글을 자유롭게 삭제할 수 있다.
   *
   * @tags [App] 게시글 댓글 API
   * @name DeletePostCommentUsingDelete
   * @summary [App] 댓글 삭제 API
   * @request DELETE:/post/comment/{postCommentSeq}
   */
  deletePostCommentUsingDelete = (postCommentSeq: number, params: RequestParams = {}) =>
    this.request<PostCommentResponseDto, void>({
      path: `/post/comment/${postCommentSeq}`,
      method: "DELETE",
      ...params,
    });
  /**
   * @description 앱에서 게시글의 시퀀스를 Path Var 로 전달받아 해당 게시글을 단건 조회한다.또한 게시글 상세조회가 호출되면 조회수를 증가시킨다.
   *
   * @tags [App & 관리자] 게시글 API
   * @name FindPostUsingGet
   * @summary [App] 게시글 단건 조회
   * @request GET:/post/{postSeq}
   */
  findPostUsingGet = (postSeq: number, params: RequestParams = {}) =>
    this.request<PostDetailResponseDto, void>({
      path: `/post/${postSeq}`,
      method: "GET",
      ...params,
    });
  /**
   * @description 앱에서 게시글 시퀀스를 Path Variable 로 전달받아 해당 게시글을 수정한다. 이때, 요청자는 작성자의 유저 시퀀스와 일치해야한다. 관리자 페이지에서 수정하는 게시글(공지, FAQ 등)은 요청자와 작성자의 시퀀스가 동일하지 않아도 동작한다.{ "content": "string", "noticeYn": "Y", "publicYn": "Y", "subject": "string" }
   *
   * @tags [App & 관리자] 게시글 API
   * @name UpdatePostUsingPut
   * @summary [App] 게시글 수정 API - JWT
   * @request PUT:/post/{postSeq}
   */
  updatePostUsingPut = (postSeq: number, requestDto: PostUpdateRequestDto, params: RequestParams = {}) =>
    this.request<PostResponseDto, void>({
      path: `/post/${postSeq}`,
      method: "PUT",
      body: requestDto,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 앱에서 특정 게시글에 대한 시퀀스를 Path variable 로 전달받아 해당 게시글을 제거한다. 이때, 요청자는 작성자와 일치해야하며, 관리자 권한의 경우 작성자에 관계 없이 게시글 제거가 가능하다. 바로 DB 에서 삭제되지 않으며, status 값이 -1 로 변경된다.
   *
   * @tags [App & 관리자] 게시글 API
   * @name DeletePostUsingDelete
   * @summary [App] 게시글 삭제 - JWT
   * @request DELETE:/post/{postSeq}
   */
  deletePostUsingDelete = (postSeq: number, params: RequestParams = {}) =>
    this.request<PostResponseDto, void>({
      path: `/post/${postSeq}`,
      method: "DELETE",
      ...params,
    });
}
