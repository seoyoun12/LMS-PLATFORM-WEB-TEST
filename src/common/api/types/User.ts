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
  CourseUserMyInfoResponseDto,
  RoleUpdateRequestDto,
  UserDetailsImpl,
  UserFindChangeRequestDto,
  UserFindIdRequestDto,
  UserFindIdResponseDto,
  UserFindPasswordRequestDto,
  UserFindPasswordResponseDto,
  UserInfoUpdateRequestDto,
  UserLoginHistoryResponseDto,
  UserModifyRequestDto,
  UserModifyResponseDto,
  UserMyinfoCertificatesResponseDto,
  UserPasswordModifyRequestDto,
  UserProvincialFindResponseDto,
  UserProvincialUpdateRequestDto,
  UserProvincialUpdateResponseDto,
  UserResponseDto,
  UserTransportFindResponseDto,
  UserTransportUpdateRequestDto,
  UserTransportUpdateResponseDto,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class User<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Access Token 을 헤더로 전달받아 해당하는 유저를 DB 에서 영구 제거한다.
   *
   * @tags [관리자 & App] 유저 API
   * @name DeleteUserUsingDelete
   * @summary [App] 특정 유저 삭제 API - JWT 사용
   * @request DELETE:/user
   */
  deleteUserUsingDelete = (params: RequestParams = {}) =>
    this.request<UserDetailsImpl, any>({
      path: `/user`,
      method: "DELETE",
      ...params,
    });
  /**
   * @description 관리자 페이지에서 전체 유저 리스트를 조회한다. 이때, 페이징을 위한 인자를 Request Param 으로 전달받는다.
   *
   * @tags [관리자 & App] 유저 API
   * @name AdmFindUsersUsingGet
   * @summary [관리자] 전체 유저 API - JWT | Pagination
   * @request GET:/user/adm
   */
  admFindUsersUsingGet = (query: { elementCnt?: number; page: number }, params: RequestParams = {}) =>
    this.request<UserResponseDto[], any>({
      path: `/user/adm`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * @description 유저의 시퀀스를 RequestParam 으로 전달받아 해당하는 유저의 계정 잠금을 해제한다.
   *
   * @tags [관리자 & App] 유저 API
   * @name AdmReleaseAccountLockUsingPost
   * @summary [관리자] 유저 계정 잠김 해제 API - JWT
   * @request POST:/user/adm/account/release
   */
  admReleaseAccountLockUsingPost = (query: { userSeq: number }, params: RequestParams = {}) =>
    this.request<boolean, void>({
      path: `/user/adm/account/release`,
      method: "POST",
      query: query,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 사용자의 접근 권한을 추가한다.
   *
   * @tags [관리자 & App] 유저 API
   * @name AdmAddRoleUsingPut
   * @summary [관리자] 유저 권한 수정(추가) API - JWT 사용
   * @request PUT:/user/adm/role/add
   */
  admAddRoleUsingPut = (roleUpdateRequestDto: RoleUpdateRequestDto, params: RequestParams = {}) =>
    this.request<RoleUpdateRequestDto, any>({
      path: `/user/adm/role/add`,
      method: "PUT",
      body: roleUpdateRequestDto,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 사용자의 접근 권한을 삭제한다.
   *
   * @tags [관리자 & App] 유저 API
   * @name AdmDeleteRoleUsingPut
   * @summary [관리자] 유저 권한 수정(삭제) API - JWT 사용
   * @request PUT:/user/adm/role/delete
   */
  admDeleteRoleUsingPut = (roleUpdateRequestDto: RoleUpdateRequestDto, params: RequestParams = {}) =>
    this.request<RoleUpdateRequestDto, any>({
      path: `/user/adm/role/delete`,
      method: "PUT",
      body: roleUpdateRequestDto,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 관리자페이지에서 특정 유저에 대한 시퀀스를 Path Variable 로 전달받아 해당하는 사용자의 상세 정보를 조회한다.
   *
   * @tags [관리자 & App] 유저 API
   * @name AdmFindUserUsingGet
   * @summary [관리자] 유저 단건 조회 API - JWT
   * @request GET:/user/adm/{userSeq}
   */
  admFindUserUsingGet = (userSeq: number, params: RequestParams = {}) =>
    this.request<UserResponseDto, void>({
      path: `/user/adm/${userSeq}`,
      method: "GET",
      ...params,
    });
  /**
   * @description 관리자 페이지에서 수정할 유저의 시퀀스를 PathVar 로 전달받아 해당하는 유저를 수정한다.
   *
   * @tags [관리자 & App] 유저 API
   * @name AdmUpdateUserInfoUsingPut
   * @summary [관리자] 유저 수정 API - JWT
   * @request PUT:/user/adm/{userSeq}
   */
  admUpdateUserInfoUsingPut = (userSeq: number, requestDto: UserInfoUpdateRequestDto, params: RequestParams = {}) =>
    this.request<UserResponseDto, void>({
      path: `/user/adm/${userSeq}`,
      method: "PUT",
      body: requestDto,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 관리자 페이지에서 삭제할 유저의 시퀀스를 PathVar 으로 전달받아 해당하는 유저를 제거한다.
   *
   * @tags [관리자 & App] 유저 API
   * @name AdmDeleteUserUsingDelete
   * @summary [관리자] 유저 제거 API
   * @request DELETE:/user/adm/{userSeq}
   */
  admDeleteUserUsingDelete = (userSeq: number, params: RequestParams = {}) =>
    this.request<UserResponseDto, void>({
      path: `/user/adm/${userSeq}`,
      method: "DELETE",
      ...params,
    });
  /**
   * @description 받아온 인증정보로 유저가 있는지 확인한다.
   *
   * @tags [관리자 & App] 유저 API
   * @name ChangePasswordUsingPut
   * @summary [App] 유저 비밀번호 찾기로 비밀번호 변경 API
   * @request PUT:/user/change-password
   */
  changePasswordUsingPut = (userFindChangeRequestDto: UserFindChangeRequestDto, params: RequestParams = {}) =>
    this.request<UserFindChangeRequestDto, void>({
      path: `/user/change-password`,
      method: "PUT",
      body: userFindChangeRequestDto,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 받아온 인증정보로 유저가 있는지 확인한다.
   *
   * @tags [관리자 & App] 유저 API
   * @name ExistsIdUsingPost
   * @summary [App] 비밀번호 찾기 API
   * @request POST:/user/exists-id
   */
  existsIdUsingPost = (userFIndPasswordRequestDto: UserFindPasswordRequestDto, params: RequestParams = {}) =>
    this.request<UserFindPasswordResponseDto, void>({
      path: `/user/exists-id`,
      method: "POST",
      body: userFIndPasswordRequestDto,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 받아온 인증정보로 유저 아이디를 찾아 보여준다
   *
   * @tags [관리자 & App] 유저 API
   * @name FindUserIdUsingPost
   * @summary [App] 아이디 찾기 API
   * @request POST:/user/find-id
   */
  findUserIdUsingPost = (userFindIdRequestDto: UserFindIdRequestDto, params: RequestParams = {}) =>
    this.request<UserFindIdResponseDto, void>({
      path: `/user/find-id`,
      method: "POST",
      body: userFindIdRequestDto,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Access Token 을 헤더로 전달받아 해당 유저의 로그인 히스토리를 등록한다.
   *
   * @tags [관리자 & App] 유저 API
   * @name CreateLoginHistoryUsingPost
   * @summary [App] 유저 로그인 히스토리 등록 API - JWT 사용
   * @request POST:/user/login-history
   */
  createLoginHistoryUsingPost = (params: RequestParams = {}) =>
    this.request<UserLoginHistoryResponseDto, any>({
      path: `/user/login-history`,
      method: "POST",
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 특정 유저의 aT 를 헤더로 전달받아 해당하는 유저의 정보를 반환한다.
   *
   * @tags [관리자 & App] 유저 API
   * @name FindMyInfoUsingGet
   * @summary [App] 특정 유저 조회 API - JWT 사용
   * @request GET:/user/myinfo
   */
  findMyInfoUsingGet = (params: RequestParams = {}) =>
    this.request<UserDetailsImpl, any>({
      path: `/user/myinfo`,
      method: "GET",
      ...params,
    });
  /**
   * @description 해당하는 유저가 증명서 발급을 위해 수강중인 모든 과정에 대한 전체 조회.
   *
   * @tags [관리자 & App] 유저 API
   * @name FindAllMyCourseListUsingGet
   * @summary [App] 유저 마이페이지 증명서 발급을 위한 과정 전체조회 API
   * @request GET:/user/myinfo/certificates
   */
  findAllMyCourseListUsingGet = (params: RequestParams = {}) =>
    this.request<UserMyinfoCertificatesResponseDto, void>({
      path: `/user/myinfo/certificates`,
      method: "GET",
      ...params,
    });
  /**
   * @description 해당하는 유저가 증명서 발급을 위해 수강중인 모든 과정에 대한 확인.
   *
   * @tags [관리자 & App] 유저 API
   * @name FindCertificatesConfirmUsingGet
   * @summary [App] 유저 마이페이지 증명서 발급을 위한 확인 API
   * @request GET:/user/myinfo/certificates/confirm/{courseUserSeq}
   */
  findCertificatesConfirmUsingGet = (courseUserSeq: number, params: RequestParams = {}) =>
    this.request<UserMyinfoCertificatesResponseDto, void>({
      path: `/user/myinfo/certificates/confirm/${courseUserSeq}`,
      method: "GET",
      ...params,
    });
  /**
   * @description 클라이언트에서 현재 유저에 대한 aT 를 헤더로 전달받아 학습 중인 과정, 학습 종료 과정을 조회한다. 학습 중인 과정과 종료된 과정은 수강 가능 기간에 따라 구분된다.
   *
   * @tags [관리자 & App] 유저 API
   * @name FindLearningStatusUsingGet
   * @summary [App] 학습현황 조회 API - JWT
   * @request GET:/user/myinfo/learning-status
   */
  findLearningStatusUsingGet = (params: RequestParams = {}) =>
    this.request<CourseUserMyInfoResponseDto[], any>({
      path: `/user/myinfo/learning-status`,
      method: "GET",
      ...params,
    });
  /**
   * @description Access Token 을 헤더로 전달받아 해당하는 유저의 정보를 수정한다.
   *
   * @tags [관리자 & App] 유저 API
   * @name ModifyMyInfoUsingPut
   * @summary [App] 특정 유저 수정 API - JWT 사용
   * @request PUT:/user/myinfo/modify
   */
  modifyMyInfoUsingPut = (userModifyRequestDto: UserModifyRequestDto, params: RequestParams = {}) =>
    this.request<UserModifyResponseDto, any>({
      path: `/user/myinfo/modify`,
      method: "PUT",
      body: userModifyRequestDto,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Access Token 을 헤더로 전달받아 해당하는 유저의 비밀번호를 변경한다.
   *
   * @tags [관리자 & App] 유저 API
   * @name ModifyMyPasswordUsingPut
   * @summary [App] 특정 유저 패스워드 변경 API - JWT 사용
   * @request PUT:/user/myinfo/modify/password
   */
  modifyMyPasswordUsingPut = (userPasswordModifyRequestDto: UserPasswordModifyRequestDto, params: RequestParams = {}) =>
    this.request<UserDetailsImpl, void>({
      path: `/user/myinfo/modify/password`,
      method: "PUT",
      body: userPasswordModifyRequestDto,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 해당하는 유저 (도민교통 안전교육자)의 정보를 조회한다.
   *
   * @tags [관리자 & App] 유저 API
   * @name ProvincialFindUserUsingGet
   * @summary [App] 유저 (도민교통 안전교육자) 조회 API
   * @request GET:/user/provincial
   */
  provincialFindUserUsingGet = (params: RequestParams = {}) =>
    this.request<UserProvincialFindResponseDto, void>({
      path: `/user/provincial`,
      method: "GET",
      ...params,
    });
  /**
   * @description 해당(로그인한)하는 유저 (도민교통 안전교육자)의 정보를 수정한다.
   *
   * @tags [관리자 & App] 유저 API
   * @name ProvincialTrafficSafetyUpdateUserUsingPut
   * @summary [App] 유저 (도민교통 안전교육자) 수정 API, 파일
   * @request PUT:/user/provincial
   */
  provincialTrafficSafetyUpdateUserUsingPut = (
    userProvincialUpdateRequestDto: UserProvincialUpdateRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<UserProvincialUpdateResponseDto, void>({
      path: `/user/provincial`,
      method: "PUT",
      body: userProvincialUpdateRequestDto,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 해당하는 유저 (운수종사자 / 저상버스운전자)의 정보를 조회한다.
   *
   * @tags [관리자 & App] 유저 API
   * @name TransportFindUserUsingGet
   * @summary [App] 유저 (운수종사자 / 저상버스운전자) 조회 API
   * @request GET:/user/transport
   */
  transportFindUserUsingGet = (params: RequestParams = {}) =>
    this.request<UserTransportFindResponseDto, void>({
      path: `/user/transport`,
      method: "GET",
      ...params,
    });
  /**
   * @description 해당(로그인한)하는 유저 (운수종사자 / 저상버스운전자)의 정보를 수정한다.
   *
   * @tags [관리자 & App] 유저 API
   * @name TransWorkerUpdateUserUsingPut
   * @summary [App] 유저 (운수종사자 / 저상버스운전자) 수정 API, 파일
   * @request PUT:/user/transport
   */
  transWorkerUpdateUserUsingPut = (
    userTransportUpdateRequestDto: UserTransportUpdateRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<UserTransportUpdateResponseDto, void>({
      path: `/user/transport`,
      method: "PUT",
      body: userTransportUpdateRequestDto,
      type: ContentType.Json,
      ...params,
    });
}
