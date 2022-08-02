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
  ExampleHtmlSaveRequestDto,
  ExampleMultipartCompleteResponseDto,
  ExampleMultipartEtagResponseDto,
  ExampleResponseDto,
  ExampleSaveRequestDto,
  FileMultipartCompleteRequestDto,
  InputStream,
  MultipartUpload,
  MultipartUploadListing,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Example<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags 실험장 API
   * @name CreateExampleUsingPost
   * @summary createExample
   * @request POST:/example
   */
  createExampleUsingPost = (requestDto: ExampleSaveRequestDto, params: RequestParams = {}) =>
    this.request<ExampleResponseDto, any>({
      path: `/example`,
      method: "POST",
      body: requestDto,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags 실험장 API
   * @name PostFileUsingPost
   * @summary 파일 업로드 테스트
   * @request POST:/example/file
   */
  postFileUsingPost = (data: any, params: RequestParams = {}) =>
    this.request<boolean, any>({
      path: `/example/file`,
      method: "POST",
      body: data,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * No description
   *
   * @tags 실험장 API
   * @name UploadHtmlUsingPost
   * @summary HTML 업로드
   * @request POST:/example/html
   */
  uploadHtmlUsingPost = (requestDto: ExampleHtmlSaveRequestDto, params: RequestParams = {}) =>
    this.request<InputStream, any>({
      path: `/example/html`,
      method: "POST",
      body: requestDto,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description identity 를 Path Variable 로 전달받아 해당하는 HTML String 을 전송한다.
   *
   * @tags 실험장 API
   * @name GetHtmlUsingGet
   * @summary HTML 조회
   * @request GET:/example/html/{identity}
   */
  getHtmlUsingGet = (identity: number, params: RequestParams = {}) =>
    this.request<InputStream, any>({
      path: `/example/html/${identity}`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags 실험장 API
   * @name DoNothingUsingGet
   * @summary doNothing
   * @request GET:/example/none
   */
  doNothingUsingGet = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/example/none`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags 실험장 API
   * @name FindAllMultipartRequestsUsingGet
   * @summary [실험] 멀티파트 전체 요청 조회 API
   * @request GET:/example/s3/multipart/all
   */
  findAllMultipartRequestsUsingGet = (params: RequestParams = {}) =>
    this.request<MultipartUploadListing, any>({
      path: `/example/s3/multipart/all`,
      method: "GET",
      ...params,
    });
  /**
   * @description 처리 이후, 삭제된 요청들을 반환한다.
   *
   * @tags 실험장 API
   * @name DeleteAllMultipartRequestsUsingDelete
   * @summary [실험] 전체 멀티파트 삭제 API
   * @request DELETE:/example/s3/multipart/all
   */
  deleteAllMultipartRequestsUsingDelete = (params: RequestParams = {}) =>
    this.request<MultipartUpload[], any>({
      path: `/example/s3/multipart/all`,
      method: "DELETE",
      ...params,
    });
  /**
   * @description 멀티파트 S3 에 대한 업로드가 모두 완료되었음을 S3 에 알린 후, 지금까지 업로드한 청크 파일을 최종적으로 하나로 합쳐 버킷에 업로드한다.
   *
   * @tags 실험장 API
   * @name CompleteMultipartFileUsingPost
   * @summary [실험] 멀티파트 업로드 완료 API
   * @request POST:/example/s3/multipart/complete
   */
  completeMultipartFileUsingPost = (requestDto: FileMultipartCompleteRequestDto, params: RequestParams = {}) =>
    this.request<ExampleMultipartCompleteResponseDto, any>({
      path: `/example/s3/multipart/complete`,
      method: "POST",
      body: requestDto,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description S3 에 멀티파트 업로드를 위한 요청을 생성한다. 반환되는 값은 인코딩된 파일 이름과 업로드 키이다.
   *
   * @tags 실험장 API
   * @name CreateMultipartRequestUsingPost
   * @summary [실험] 멀티파트 업로드 요청 생성 API
   * @request POST:/example/s3/multipart/init
   */
  createMultipartRequestUsingPost = (
    query: {
      dirType?:
        | "RESOURCE_COURSE_IMAGE"
        | "RESOURCE_COURSE_VIDEO"
        | "RESOURCE_IMAGE"
        | "RESOURCE_VIDEO"
        | "RESOURCE_HOMEWORK_FILE"
        | "RESOURCE_FORUM_FILE"
        | "RESOURCE_LIBRARY_FILE"
        | "RESOURCE_LESSON_FILE"
        | "RESOURCE_POST_NOTICE_FILE"
        | "RESOURCE_POST_QUESTION_FILE"
        | "RESOURCE_POST_FAQ_FILE"
        | "RESOURCE_POST_REVIEW_FILE"
        | "RESOURCE_BANNER_FILE"
        | "RESOURCE_QNA_FILE"
        | "RESOURCE_QNA_ANSWER_FILE"
        | "RESOURCE_LEARNING_MATERIAL_FILE"
        | "RESOURCE_USER_PROFILE_FILE";
      fileContentType: string;
      fileOriginalName: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<InputStream, any>({
      path: `/example/s3/multipart/init`,
      method: "POST",
      query: query,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 청크 파일과 업로드 키를 전달받아 청크파일을 S3 에 업로드한다. 업로드 이후, 식별가능한 청크 고유 키인 eTag 를 반환한다.
   *
   * @tags 실험장 API
   * @name UploadMultipartUsingPost
   * @summary [실험] 멀티파트 업로드 API
   * @request POST:/example/s3/multipart/upload
   */
  uploadMultipartUsingPost = (data: any, params: RequestParams = {}) =>
    this.request<ExampleMultipartEtagResponseDto, any>({
      path: `/example/s3/multipart/upload`,
      method: "POST",
      body: data,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * @description 처리 이후, 삭제된 요청을 반환한다.
   *
   * @tags 실험장 API
   * @name DeleteMultipartRequestUsingDelete
   * @summary [실험] 특정 멀티파트 요청 삭제 API
   * @request DELETE:/example/s3/multipart/{uploadRequestId}
   */
  deleteMultipartRequestUsingDelete = (uploadRequestId: string, params: RequestParams = {}) =>
    this.request<InputStream, any>({
      path: `/example/s3/multipart/${uploadRequestId}`,
      method: "DELETE",
      ...params,
    });
}
