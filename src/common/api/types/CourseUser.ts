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
  CourseResponseDto,
  CourseUserCompletionResponseDto,
  CourseUserResponseDto,
  CourseUserTransDetailsResponseDto,
  CourseUserTransResponseDto,
  CourseUserTransSaveRequestDto,
  CourseUserTransUpdateRequestDto,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class CourseUser<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description 클라이언트에서 특정 사용자가 신청한 과정 클래스 정보를 조회한다.
   *
   * @tags [App & 관리자] 과정 교육 신청 API
   * @name FindAllTransCourseUsersUsingGet
   * @summary [App] 운수/저상 교육 전체 조회 API - JWT
   * @request GET:/course-user
   */
  findAllTransCourseUsersUsingGet = (params: RequestParams = {}) =>
    this.request<CourseUserTransResponseDto[], void>({
      path: `/course-user`,
      method: "GET",
      ...params,
    });
  /**
   * @description 특정 교육 신청 건에 대한 시퀀스를 전달받아 해당하는 교육을 제거(취소)한다. 데이터베이스에서 outYn 과 관련된 데이터를 수정하고, status 를 -1로 수정한다. 제거 시, 제거하려는 대상(courseUser)의 신청자 시퀀스가 요청자의 시퀀스와 다를 경우 오류를 발생시킨다.
   *
   * @tags [App & 관리자] 과정 교육 신청 API
   * @name CancelTransIndvUsingDelete
   * @summary [App] 운수/저상 교육 취소 API (개인) - JWT
   * @request DELETE:/course-user/cancel/individual/{courseUserSeq}
   */
  cancelTransIndvUsingDelete = (courseUserSeq: number, params: RequestParams = {}) =>
    this.request<CourseUserResponseDto, void>({
      path: `/course-user/cancel/individual/${courseUserSeq}`,
      method: "DELETE",
      ...params,
    });
  /**
   * @description 운수/저상 관리자가 특정 사용자에 대한 특정 교육 신청 건을 취소한다. 데이터베이스에서 outYn 과 관련된 데이터를 수정하고, status 를 -1로 수정한다. 제거 시, 제거하려는 대상(courseUser)의 regUserSeq 가 요청자(관리자)의 시퀀스와 다를 경우 오류를 발생시킨다.
   *
   * @tags [App & 관리자] 과정 교육 신청 API
   * @name CancelTransOrganUsingDelete
   * @summary [App] 운수/저상 교육 취소 API (단체) - JWT
   * @request DELETE:/course-user/cancel/organization/{courseUserSeq}
   */
  cancelTransOrganUsingDelete = (courseUserSeq: number, params: RequestParams = {}) =>
    this.request<CourseUserResponseDto, void>({
      path: `/course-user/cancel/organization/${courseUserSeq}`,
      method: "DELETE",
      ...params,
    });
  /**
   * @description 해당 과정에 대한 수료 여부 체크
   *
   * @tags [App & 관리자] 과정 교육 신청 API
   * @name UserCourseCompletionUsingGet
   * @summary 과정 수료 여부 API - JWT 사용
   * @request GET:/course-user/complete/{courseUserSeq}
   */
  userCourseCompletionUsingGet = (courseUserSeq: number, params: RequestParams = {}) =>
    this.request<CourseUserCompletionResponseDto, void>({
      path: `/course-user/complete/${courseUserSeq}`,
      method: "GET",
      ...params,
    });
  /**
   * @description 클라이언트에서 운수/저상에 대한 <b>개인 교육</b>을 신청한다. 교육신청자 정보 란에서, 이름과 주민등록번호와 같은 개인정보는 유저 API 의 회원정보 조회 API 를 통해 가져온다. 개인 신청의 경우, 이름과 주민등록번호 란은 Read-only 이다. 업체 정보 혹은 차량 정보와 같은 추가 정보는 유저 (운수종사자 / 저상버스운전자) 조회 API 를 통해 가져온다. 교육신청자 정보 중, 차량 번호에 대한 정규식은 체크하지 않는다. 기입한 정보를 바탕으로 해당 유저의 추가정보(예. 업종, 차량번호 등. 마이페이지 내 정보 수정에서도 기입 가능)를 DB 에 업데이트 시켜준다. 최종적으로 신청된 과정 정보를 반환한다.
   *
   * @tags [App & 관리자] 과정 교육 신청 API
   * @name EnrollTransIndvUsingPost
   * @summary [App] 운수/저상 교육신청 API (개인) - JWT
   * @request POST:/course-user/enroll/individual
   */
  enrollTransIndvUsingPost = (requestDto: CourseUserTransSaveRequestDto, params: RequestParams = {}) =>
    this.request<CourseUserResponseDto, void>({
      path: `/course-user/enroll/individual`,
      method: "POST",
      body: requestDto,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 클라이언트에서 운수/저상에 대한 <b>단체 교육</b>을 신청한다. 단체 신청의 경우, 이름과 주민등록번호 입력란은 쓰기 작업이 가능하다. 운수/저상에 대한 관리자만 신청이 가능하며, 교육신청자 정보 란은 유저 API 의 회원정보 조회 API 를 통해 가져온다. 교육신청자 정보는 화면 상에서 N 개의 개수만큼 추가할 수 있으며, <b>새로운 폼을 추가할 때마다(신청 버튼 클릭 시) 입력한 데이터가 실제 데이터베이스에 즉각 저장된다.(단건 신청)</b> 입력한 교육신청자 정보에 대하여 이미 DB 에 존재하는 운수/저상 회원일 경우, 바로 과정이 신청되며 해당 유저에 대한 추가정보 데이터가 업데이트 된다. DB 에 존재하지 않는 사람인 경우 회원가입 진행 후 과정이 신청된다. 매 신청 시마다, 신청된 과정 정보가 리턴된다.
   *
   * @tags [App & 관리자] 과정 교육 신청 API
   * @name EnrollTransOrganUsingPost
   * @summary [App] 운수/저상 교육신청 API (단체, 단건 신청) - JWT
   * @request POST:/course-user/enroll/organization
   */
  enrollTransOrganUsingPost = (requestDto: CourseUserTransSaveRequestDto, params: RequestParams = {}) =>
    this.request<CourseResponseDto, void>({
      path: `/course-user/enroll/organization`,
      method: "POST",
      body: requestDto,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 클라이언트에서 개인에 대한 특정 교육 신청 건에 대한 내용을 조회한다. outYn 이 'Y' 데이터는 조회되지 않는다. 요청자의 JWT 내 유저 시퀀스와 반환될 데이터의 userSeq 가 자기 자신이 아닐 경우 예외를 호출한다.
   *
   * @tags [App & 관리자] 과정 교육 신청 API
   * @name FindTransCourseUserIndvUsingGet
   * @summary [App] 운수/저상 교육 신청 단건 조회 API (개인) - JWT
   * @request GET:/course-user/find/individual/{courseUserSeq}
   */
  findTransCourseUserIndvUsingGet = (courseUserSeq: number, params: RequestParams = {}) =>
    this.request<CourseUserTransDetailsResponseDto, void>({
      path: `/course-user/find/individual/${courseUserSeq}`,
      method: "GET",
      ...params,
    });
  /**
   * @description 클라이언트에서 개인에 대한 특정 교육 신청 건에 대한 내용을 조회한다. outYn 이 'Y' 데이터는 조회되지 않는다. 요청자의 유저 시퀀스가 실제 교육 신청 정보자의 유저 시퀀스와 다르더라도 조회가 가능하다. 다만, regUserSeq(단체 신청해준 사람의 시퀀스) 로 요청자의 시퀀스와 비교하고, 다를 경우 예외를 발생시킨다.
   *
   * @tags [App & 관리자] 과정 교육 신청 API
   * @name FindTransCourseUserOrganUsingGet
   * @summary [App] 운수/저상 교육 신청 단건 조회 API (단체) - JWT
   * @request GET:/course-user/find/organization/{courseUserSeq}
   */
  findTransCourseUserOrganUsingGet = (courseUserSeq: number, params: RequestParams = {}) =>
    this.request<CourseUserTransDetailsResponseDto, void>({
      path: `/course-user/find/organization/${courseUserSeq}`,
      method: "GET",
      ...params,
    });
  /**
   * @description 개인의 특정 교육 신청 건에 대한 정보를 수정한다. 이름과 주민번호를 제외한 모든 정보를 수정 가능하다. 수정된 개인정보/추가정보는 유저 DB 데이터에 반영된다. 개인이 신청한 courseUserSeq 의 userSeq 와 요청자의 userSeq 를 비교하여 서로 일치하지 않을 경우 예외를 발생시킨다.
   *
   * @tags [App & 관리자] 과정 교육 신청 API
   * @name ModifyTransCourseUserIndvUsingPut
   * @summary [App] 운수/저상 교육 수정 API (개인) - JWT
   * @request PUT:/course-user/modify/individual/{courseUserSeq}
   */
  modifyTransCourseUserIndvUsingPut = (
    courseUserSeq: number,
    requestDto: CourseUserTransUpdateRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<CourseUserTransDetailsResponseDto, void>({
      path: `/course-user/modify/individual/${courseUserSeq}`,
      method: "PUT",
      body: requestDto,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 단체의 특정 교육 신청 건에 대한 정보를 수정한다. 이름과 주민번호를 제외한 모든 정보를 수정 가능하다. 수정된 개인정보/추가정보는 유저 DB 데이터에 반영된다. 단체의 관리자가 신청한 courseUserSeq 의 regUserSeq 와 요청자의 userSeq 를 비교하여 서로 일치하지 않을 경우 예외를 발생시킨다.
   *
   * @tags [App & 관리자] 과정 교육 신청 API
   * @name ModifyTransCourseUserOrganUsingPut
   * @summary [App] 운수/저상 교육 수정 API (단체) - JWT
   * @request PUT:/course-user/modify/organization/{courseUserSeq}
   */
  modifyTransCourseUserOrganUsingPut = (
    courseUserSeq: number,
    requestDto: CourseUserTransUpdateRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<CourseUserTransDetailsResponseDto, void>({
      path: `/course-user/modify/organization/${courseUserSeq}`,
      method: "PUT",
      body: requestDto,
      type: ContentType.Json,
      ...params,
    });
}
