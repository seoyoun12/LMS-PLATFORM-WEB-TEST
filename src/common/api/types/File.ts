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
  CompleteMultipartUploadResult,
  File,
  FileMultipartCompleteRequestDto,
  FileMultipartCreateRequestDto,
  FileMultipartCreateResponseDto,
  FileResponseDto,
  FileSeqListRequestDto,
  InputStream,
  MultipartUpload,
  MultipartUploadListing,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class File<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags [관리자] 파일 API
   * @name FindAllMultipartRequestsUsingGet1
   * @summary [관리자] 멀티파트 전체 요청 조회 API
   * @request GET:/file/multipart/all
   */
  findAllMultipartRequestsUsingGet1 = (params: RequestParams = {}) =>
    this.request<MultipartUploadListing, any>({
      path: `/file/multipart/all`,
      method: "GET",
      ...params,
    });
  /**
   * @description 처리 이후, 삭제된 요청들을 반환한다.
   *
   * @tags [관리자] 파일 API
   * @name DeleteAllMultipartRequestsUsingDelete1
   * @summary [관리자] 전체 멀티파트 삭제 API
   * @request DELETE:/file/multipart/all
   */
  deleteAllMultipartRequestsUsingDelete1 = (params: RequestParams = {}) =>
    this.request<MultipartUpload[], any>({
      path: `/file/multipart/all`,
      method: "DELETE",
      ...params,
    });
  /**
   * @description 멀티파트 S3 에 대한 업로드가 모두 완료되었음을 S3 에 알린 후, 지금까지 업로드한 청크 파일을 최종적으로 하나로 합쳐 버킷에 업로드한다.
   *
   * @tags [관리자] 파일 API
   * @name CompleteMultipartRequestUsingPost
   * @summary [관리자] 멀티파트 업로드 완료 API
   * @request POST:/file/multipart/complete
   */
  completeMultipartRequestUsingPost = (requestDto: FileMultipartCompleteRequestDto, params: RequestParams = {}) =>
    this.request<CompleteMultipartUploadResult, any>({
      path: `/file/multipart/complete`,
      method: "POST",
      body: requestDto,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description S3 에 멀티파트 업로드를 위한 요청을 생성한다. 반환되는 값은 인코딩된 파일 이름과 업로드 키이다.
   *
   * @tags [관리자] 파일 API
   * @name CreateMultipartRequestUsingPost1
   * @summary [관리자] 멀티파트 업로드 요청 생성 API
   * @request POST:/file/multipart/init
   */
  createMultipartRequestUsingPost1 = (requestDto: FileMultipartCreateRequestDto, params: RequestParams = {}) =>
    this.request<FileMultipartCreateResponseDto, void>({
      path: `/file/multipart/init`,
      method: "POST",
      body: requestDto,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 청크 파일과 업로드 키를 전달받아 청크파일을 S3 에 업로드한다. 업로드 이후, 식별가능한 청크 고유 키인 eTag 를 반환한다. { uploadRequestKey: "업로드 키" encFileName: "인코딩 파일 이름" }
   *
   * @tags [관리자] 파일 API
   * @name UploadMultipartUsingPost1
   * @summary [관리자] 멀티파트 업로드 API
   * @request POST:/file/multipart/upload
   */
  uploadMultipartUsingPost1 = (data: any, params: RequestParams = {}) =>
    this.request<InputStream, any>({
      path: `/file/multipart/upload`,
      method: "POST",
      body: data,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * @description 처리 이후, 삭제된 요청을 반환한다.
   *
   * @tags [관리자] 파일 API
   * @name DeleteMultipartRequestUsingDelete1
   * @summary [관리자] 특정 멀티파트 요청 삭제 API
   * @request DELETE:/file/multipart/{uploadRequestId}
   */
  deleteMultipartRequestUsingDelete1 = (uploadRequestId: string, params: RequestParams = {}) =>
    this.request<InputStream, any>({
      path: `/file/multipart/${uploadRequestId}`,
      method: "DELETE",
      ...params,
    });
  /**
   * @description 업로드하고자하는 bbsType Enum(TYPE_FORUM, TYPE_CONTENT 등)과 특정 시퀀스를(토론, 과정 시퀀스 등) Path Varialble 로 전달받고, 업로드 하고자하는 파일을 전달받아 해당하는 S3 에 단일파일 업로드를 수행한다. 50MB 를 초과하는 파일은 업로드할 수 없다. .exe, .ico, .link 파일은 업로드할 수 없다.
   *
   * @tags [관리자] 파일 API
   * @name UploadFilesUsingPost
   * @summary [App & 관리자] 파일 업로드
   * @request POST:/file/{bbsType}/{bbsSeq}
   */
  uploadFilesUsingPost = (
    bbsSeq: number,
    bbsType:
      | "TYPE_FORUM"
      | "TYPE_POST_FAQ"
      | "TYPE_POST_REVIEW"
      | "TYPE_POST_NOTICE"
      | "TYPE_COURSE"
      | "TYPE_HOMEWORK"
      | "TYPE_LIBRARY"
      | "TYPE_LESSON"
      | "TYPE_BANNER"
      | "TYPE_QNA"
      | "TYPE_QNA_ANSWER"
      | "TYPE_LEARNING_MATERIAL"
      | "TYPE_USER_PROFILE",
    data: { files: File[] },
    params: RequestParams = {},
  ) =>
    this.request<FileResponseDto[], void>({
      path: `/file/${bbsType}/${bbsSeq}`,
      method: "POST",
      body: data,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * @description bbsType Enum(TYPE_FORUM, TYPE_CONTENT 등)과 특정 시퀀스를(토론, 과정 시퀀스 등)을 Path Variable 로, 삭제하고자하는 파일 시퀀스 리스트를 RequestBody 로 전달받아 해당하는 시퀀스의 파일을 제거한다.
   *
   * @tags [관리자] 파일 API
   * @name DeleteFilesUsingDelete
   * @summary [App & 관리자] 파일 삭제
   * @request DELETE:/file/{bbsType}/{bbsSeq}
   */
  deleteFilesUsingDelete = (
    bbsSeq: number,
    bbsType:
      | "TYPE_FORUM"
      | "TYPE_POST_FAQ"
      | "TYPE_POST_REVIEW"
      | "TYPE_POST_NOTICE"
      | "TYPE_COURSE"
      | "TYPE_HOMEWORK"
      | "TYPE_LIBRARY"
      | "TYPE_LESSON"
      | "TYPE_BANNER"
      | "TYPE_QNA"
      | "TYPE_QNA_ANSWER"
      | "TYPE_LEARNING_MATERIAL"
      | "TYPE_USER_PROFILE",
    requestDto: FileSeqListRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<InputStream, any>({
      path: `/file/${bbsType}/${bbsSeq}`,
      method: "DELETE",
      body: requestDto,
      type: ContentType.Json,
      ...params,
    });
}
