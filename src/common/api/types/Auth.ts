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
  AccessTokenRefreshRequestDto,
  InputStream,
  SignInRequestDto,
  SignInResponseDto,
  SignUpRequestDto,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Auth<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Request DTO 를 전달받아 로그인을 수행한다. 이때, aT 와 rT, 간략한 사용자의 정보와 ROLE 등을 전달한다. <b>로그인 타입이 운수/저상</b>의 경우, loginType, name, username, password 를 필요로 하며, name 은 사용자의 실명을, 주민등록번호는 username 과 password 에 동일하게 입력한다. <b>로그인 타입이 도민교통</b>인 경우, loginType, username, password 만 필요로 하며, 이때 username 은 도민교통 타입의 유저가 회원가입 시 입력한 아이디, password 는 회원가입시 기입한 Plain text 로 이루어진 password 를 입력한다.
   *
   * @tags [App & 관리자] 인증 API
   * @name SignInUsingPost
   * @summary 로그인 API
   * @request POST:/auth/signin
   */
  signInUsingPost = (signInRequestDto: SignInRequestDto, params: RequestParams = {}) =>
    this.request<SignInResponseDto, void>({
      path: `/auth/signin`,
      method: "POST",
      body: signInRequestDto,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Access Token 을 전달받아 특정 사용자의 로그아웃을 수행한다.
   *
   * @tags [App & 관리자] 인증 API
   * @name SignOutUsingPost
   * @summary [App] 로그아웃 API - JWT 사용
   * @request POST:/auth/signout
   */
  signOutUsingPost = (params: RequestParams = {}) =>
    this.request<InputStream, any>({
      path: `/auth/signout`,
      method: "POST",
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 관리자 전용 계정을 생성한다.
   *
   * @tags [App & 관리자] 인증 API
   * @name SignUpAdminUsingPost
   * @summary [관리자] 관리자 계정 생성 - JWT 사용
   * @request POST:/auth/signup/admin
   */
  signUpAdminUsingPost = (signUpRequestDto: SignUpRequestDto, params: RequestParams = {}) =>
    this.request<InputStream, any>({
      path: `/auth/signup/admin`,
      method: "POST",
      body: signUpRequestDto,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Request DTO 를 전달받아 일반 회원가입을 수행한다. <b>운수/저상의 경우 username 과 password 는 주민번호로 저장한다.</b>
   *
   * @tags [App & 관리자] 인증 API
   * @name SignUpCommonUsingPost
   * @summary 일반 회원가입 API
   * @request POST:/auth/signup/common
   */
  signUpCommonUsingPost = (signUpRequestDto: SignUpRequestDto, params: RequestParams = {}) =>
    this.request<boolean, void>({
      path: `/auth/signup/common`,
      method: "POST",
      body: signUpRequestDto,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 사용자의 aT 와 rT 를 전달받아 새 aT 를 발급한다. <br/>이때, rT 가 만료되었을 경우, DB 내 해당 사용자의 토큰 정보를 제거하며, rT 만료를 알리는 998번 커스텀 예외를 발생시킨다.
   *
   * @tags [App & 관리자] 인증 API
   * @name AccessTokenRefreshUsingPost
   * @summary Access Token 재발급 API
   * @request POST:/auth/token/refresh
   */
  accessTokenRefreshUsingPost = (
    accessTokenRefreshRequestDto: AccessTokenRefreshRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<InputStream, void>({
      path: `/auth/token/refresh`,
      method: "POST",
      body: accessTokenRefreshRequestDto,
      type: ContentType.Json,
      ...params,
    });
}
