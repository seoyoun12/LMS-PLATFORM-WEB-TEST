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

export interface AccessTokenRefreshRequestDto {
  accessToken?: string;
  refreshToken?: string;
}

export interface BannerResponseDto {
  /**
   * 생성일
   * @format date-time
   */
  createdDtime?: string;

  /**
   * 게시기간 종료일
   * @format date-time
   */
  endDate?: string;

  /**
   * 수정일
   * @format date-time
   */
  modifiedDtime?: string;

  /** s3 파일 */
  s3Files?: FileResponseDto[];

  /**
   * 시퀀스
   * @format int64
   */
  seq?: number;

  /**
   * 게시기간 시작일
   * @format date-time
   */
  startDate?: string;

  /**
   * 사용 여부
   * @format int32
   */
  status?: number;

  /** 배너 제목 */
  title?: string;

  /** 이동 URL */
  toUrl?: string;
}

export interface BannerSaveRequestDto {
  /**
   * 게시기간 종료일 (yyyy-MM-dd)
   * @format date
   */
  endDate?: string;

  /**
   * 게시기간 시작일 (yyyy-MM-dd)
   * @format date
   */
  startDate?: string;

  /**
   * 사용 여부
   * @format int32
   */
  status?: 1 | -1;

  /** 배너 제목 */
  title?: string;

  /** 이동 URL */
  toUrl?: string;
}

export interface BannerUpdateRequestDto {
  /**
   * 게시기간 종료일 (yyyy-MM-dd)
   * @format date
   */
  endDate?: string;

  /**
   * 게시기간 시작일 (yyyy-MM-dd)
   * @format date
   */
  startDate?: string;

  /**
   * 사용 여부
   * @format int32
   */
  status?: 1 | -1;

  /** 배너 제목 */
  title?: string;

  /** 이동 URL */
  toUrl?: string;
}

export interface CompleteMultipartUploadResult {
  bucketName?: string;
  etag?: string;

  /** @format date-time */
  expirationTime?: string;
  expirationTimeRuleId?: string;
  key?: string;
  location?: string;
  requesterCharged?: boolean;
  serverSideEncryption?: string;
  ssealgorithm?: string;
  ssecustomerAlgorithm?: string;
  ssecustomerKeyMd5?: string;
  versionId?: string;
}

export interface Content {
  code?: string;

  /** @format int32 */
  contentHeight?: number;
  contentName?: string;
  contentType?: "CONTENT_HTML" | "CONTENT_MP4" | "CONTENT_EXTERNAL";

  /** @format int32 */
  contentWidth?: number;
  course?: Course;

  /** @format date-time */
  createdDtime?: string;
  examList?: Exam[];

  /** @format date-time */
  modifiedDtime?: string;

  /** @format int64 */
  seq?: number;

  /** @format int32 */
  status?: number;
}

export interface ContentDetailResponseDto {
  /** 폴더명/코드 */
  code?: string;

  /**
   * 콘텐츠 높이
   * @format int32
   */
  contentHeight?: number;

  /** 콘텐츠 이름 */
  contentName?: string;

  /** 콘텐트 타입 */
  contentType?: string;

  /**
   * 콘텐츠 넓이
   * @format int32
   */
  contentWidth?: number;

  /** 연결된 과정 이름 */
  courseName?: string;

  /**
   * 연결된 과정 시퀀스
   * @format int64
   */
  courseSeq?: number;

  /**
   * 생성일
   * @format date-time
   */
  createdDtime?: string;

  /**
   * 수정일
   * @format date-time
   */
  modifiedDtime?: string;

  /**
   * 콘텐츠 시퀀스
   * @format int64
   */
  seq?: number;

  /**
   * 상태
   * @format int32
   */
  status?: number;
}

export interface ContentResponseDto {
  /** 폴더명/코드 */
  code?: string;

  /**
   * 콘텐츠 높이
   * @format int32
   */
  contentHeight?: number;

  /** 콘텐츠 이름 */
  contentName?: string;

  /** 콘텐트 타입 */
  contentType?: string;

  /**
   * 콘텐츠 넓이
   * @format int32
   */
  contentWidth?: number;

  /** 연결된 과정명 */
  courseName?: string;

  /**
   * 연결된 과정 시퀀스
   * @format int64
   */
  courseSeq?: number;

  /**
   * 생성일
   * @format date-time
   */
  createdDtime?: string;

  /**
   * 시험 개수
   * @format int32
   */
  examCnt?: number;

  /**
   * 과제 개수
   * @format int32
   */
  homeworkCnt?: number;

  /**
   * 강의 개수
   * @format int32
   */
  lessonCnt?: number;

  /**
   * 수정일
   * @format date-time
   */
  modifiedDtime?: string;

  /**
   * 문제은행 개수
   * @format int32
   */
  questionCnt?: number;

  /**
   * 콘텐츠 시퀀스
   * @format int64
   */
  seq?: number;

  /**
   * 상태
   * @format int32
   */
  status?: number;
}

export interface ContentSaveRequestDto {
  /** 폴더명/코드 */
  code?: string;

  /**
   * 콘텐트 높이
   * @format int32
   */
  contentHeight?: number;

  /** 콘텐트 이름 */
  contentName?: string;

  /** 콘텐트 타입 */
  contentType?: "CONTENT_HTML" | "CONTENT_MP4" | "CONTENT_EXTERNAL";

  /**
   * 콘텐트 넓이
   * @format int32
   */
  contentWidth?: number;

  /**
   * 사용 상태 여부 1/-1
   * @format int32
   */
  status?: number;
}

export interface ContentUpdateRequestDto {
  /** 폴더명/코드 */
  code?: string;

  /**
   * 콘텐트 높이
   * @format int32
   */
  contentHeight?: number;

  /** 콘텐트 이름 */
  contentName?: string;

  /** 콘텐트 타입 */
  contentType?: "CONTENT_HTML" | "CONTENT_MP4" | "CONTENT_EXTERNAL";

  /**
   * 콘텐트 넓이
   * @format int32
   */
  contentWidth?: number;

  /**
   * 사용 상태 여부 1 or -1
   * @format int32
   */
  status?: number;
}

export interface Course {
  content?: Content;
  courseCategoryType?:
    | "TYPE_SUP_COMMON"
    | "TYPE_SUP_CONSTANT"
    | "TYPE_CONSTANT"
    | "TYPE_NEW"
    | "TYPE_ILLEGAL"
    | "TYPE_HANDICAPPED"
    | "TYPE_DANGEROUS";
  courseClass?: CourseClass[];
  courseFile?: string;
  courseFileName?: string;
  courseModules?: CourseModules[];
  courseName?: string;
  courseSubCategoryType?:
    | "BUS"
    | "CHARTER_BUS"
    | "SPECIAL_PASSENGER"
    | "CORPORATE_TAXI"
    | "GENERAL_CARGO"
    | "PRIVATE_TAXI"
    | "INDIVIDUAL_CARGO"
    | "CONSIGNMENT"
    | "SPECIAL_TRANSPORTATION"
    | "KNEELING_BUS"
    | "DANGEROUS_GOODS"
    | "DESIGNATED_WASTE"
    | "HAZARDOUS_CHEMICALS"
    | "HIGH_PRESSURE_GAS_FLAMMABLE"
    | "HIGH_PRESSURE_GAS_TOXIC";
  courseThumbLink?: string;
  courseThumbLinkName?: string;
  courseType?: "TYPE_TRANS_WORKER" | "TYPE_LOW_FLOOR_BUS" | "TYPE_PROVINCIAL";

  /** @format date-time */
  createdDtime?: string;
  displayYn?: string;
  files?: File[];

  /** @format int32 */
  lessonTime?: number;

  /** @format date-time */
  modifiedDtime?: string;

  /** @format int64 */
  seq?: number;

  /** @format int32 */
  status?: number;
  survey?: Survey;
}

export interface CourseClass {
  /** @format date-time */
  cancelAvailEndDate?: string;

  /** @format date-time */
  cancelAvailStartDate?: string;
  course?: Course;
  courseUser?: CourseUser[];

  /** @format date-time */
  createdDtime?: string;

  /** @format int32 */
  limitPeople?: number;
  limitPeopleYn?: string;

  /** @format date-time */
  modifiedDtime?: string;

  /** @format date-time */
  requestEndDate?: string;

  /** @format date-time */
  requestStartDate?: string;

  /** @format int64 */
  seq?: number;

  /** @format int32 */
  status?: number;

  /** @format int32 */
  step?: number;

  /** @format date-time */
  studyEndDate?: string;

  /** @format date-time */
  studyStartDate?: string;

  /** @format int32 */
  year?: number;
}

export interface CourseClassResponseDto {
  /** 과정 엔티티 */
  course?: CourseResponseDto;

  /**
   * 생성일
   * @format date-time
   */
  createdDtime?: string;

  /**
   * 현재 수강 신청 인원
   * @format int32
   */
  enrolledPeopleCnt?: number;

  /**
   * 수강인원제한 인원수 / 0은 무제한
   * @format int32
   */
  limitPeople?: number;

  /** 수강인원제한여부 */
  limitPeopleYn?: "Y" | "N";

  /**
   * 수정일
   * @format date-time
   */
  modifiedDtime?: string;

  /**
   * 수강신청종료일자
   * @format date-time
   */
  requestEndDate?: string;

  /**
   * 수강신청시작일자
   * @format date-time
   */
  requestStartDate?: string;

  /**
   * 시퀀스
   * @format int64
   */
  seq?: number;

  /**
   * 상태
   * @format int32
   */
  status?: number;

  /**
   * 기수
   * @format int32
   */
  step?: number;

  /**
   * 학습종료일자
   * @format date-time
   */
  studyEndDate?: string;

  /**
   * 학습시작일자
   * @format date-time
   */
  studyStartDate?: string;

  /**
   * 연도
   * @format int32
   */
  year?: number;
}

export interface CourseClassSaveRequestDto {
  /**
   * 과정 시퀀스
   * @format int64
   * @example 1
   */
  courseSeq?: number;

  /**
   * 수강인원제한 인원수 / 0은 무제한
   * @format int32
   */
  limitPeople?: number;

  /** 수강인원제한여부 */
  limitPeopleYn?: "Y" | "N";

  /**
   * 수강신청종료일자
   * @format date
   * @example 2022-07-03
   */
  requestEndDate?: string;

  /**
   * 수강신청시작일자
   * @format date
   * @example 2022-07-01
   */
  requestStartDate?: string;

  /**
   * 기수
   * @format int32
   */
  step?: number;

  /**
   * 학습종료일자
   * @format date
   * @example 2022-07-30
   */
  studyEndDate?: string;

  /**
   * 학습시작일자
   * @format date
   * @example 2022-07-04
   */
  studyStartDate?: string;

  /**
   * 연도
   * @format int32
   * @example 2022
   */
  year?: number;
}

export interface CourseClassStepResponseDto {
  /**
   * 현재 수강신청인원
   * @format int32
   */
  enrolledPeopleCnt?: number;

  /**
   * 수강인원제한 인원수 - 0은 무제한
   * @format int32
   */
  limitPeople?: number;

  /** 수강인원제한여부 */
  limitPeopleYn?: "Y" | "N";

  /**
   * 수강신청종료일자
   * @format date-time
   */
  requestEndDate?: string;

  /**
   * 수강신청시작일자
   * @format date-time
   */
  requestStartDate?: string;

  /**
   * 클래스 시퀀스
   * @format int64
   */
  seq?: number;

  /**
   * 기수
   * @format int32
   */
  step?: number;

  /**
   * 학습종료일자
   * @format date-time
   */
  studyEndDate?: string;

  /**
   * 학습시작일자
   * @format date-time
   */
  studyStartDate?: string;
}

export interface CourseClassUpdateRequestDto {
  /**
   * 수강인원제한 인원수 / 0은 무제한
   * @format int32
   */
  limitPeople?: number;

  /** 수강인원제한여부 */
  limitPeopleYn?: "Y" | "N";

  /**
   * 수강신청종료일자
   * @format date
   * @example 2022-07-03
   */
  requestEndDate?: string;

  /**
   * 수강신청시작일자
   * @format date
   * @example 2022-07-01
   */
  requestStartDate?: string;

  /**
   * 기수
   * @format int32
   */
  step?: number;

  /**
   * 학습종료일자
   * @format date
   * @example 2022-07-30
   */
  studyEndDate?: string;

  /**
   * 학습시작일자
   * @format date
   * @example 2022-07-04
   */
  studyStartDate?: string;

  /**
   * 연도
   * @format int32
   * @example 2022
   */
  year?: number;
}

export interface CourseContentLinkRequestDto {
  /**
   * 콘텐츠 시퀀스
   * @format int64
   */
  contentSeq?: number;

  /**
   * 과정 시퀀스
   * @format int64
   */
  courseSeq?: number;
}

export interface CourseDetailClientResponseDto {
  /** 연결된 콘텐츠 */
  content?: ContentDetailResponseDto;

  /**
   * 교육 분류, 보수/양성/신규 등
   *  * TYPE_SUP_COMMON -> 보수일반
   *  * TYPE_SUP_CONSTANT -> 보수수시
   *  * TYPE_CONSTANT -> 수시
   *  * TYPE_NEW -> 신규
   *  * TYPE_ILLEGAL -> 법령위반자
   *  * TYPE_HANDICAPPED -> 교통약자 이동편의 증진
   *  * TYPE_DANGEROUS -> 위험물진 운송차량 운전자
   */
  courseCategoryType?:
    | "TYPE_SUP_COMMON"
    | "TYPE_SUP_CONSTANT"
    | "TYPE_CONSTANT"
    | "TYPE_NEW"
    | "TYPE_ILLEGAL"
    | "TYPE_HANDICAPPED"
    | "TYPE_DANGEROUS";

  /** 과정 이름 */
  courseName?: string;

  /**
   * 업종*   버스 - BUS
   *     전세버스 - CHARTER_BUS
   *     특수여객 - SPECIAL_PASSENGER
   *     법인택시 - CORPORATE_TAXI
   *     일반화물 - GENERAL_CARGO
   *     개인택시 - PRIVATE_TAXI
   *     개별화물 - INDIVIDUAL_CARGO
   *     용달화물 - CONSIGNMENT
   *     특별교통수단 - SPECIAL_TRANSPORTATION
   *     저상버스 - KNEELING_BUS
   *     위험물 - DANGEROUS_GOODS
   *     지정폐기물 - DESIGNATED_WASTE
   *     유해화학물질 - HAZARDOUS_CHEMICALS
   *     고압가스(가연성) - HIGH_PRESSURE_GAS_FLAMMABLE
   *     고압가스(독성) - HIGH_PRESSURE_GAS_TOXIC
   */
  courseSubCategoryType?:
    | "BUS"
    | "CHARTER_BUS"
    | "SPECIAL_PASSENGER"
    | "CORPORATE_TAXI"
    | "GENERAL_CARGO"
    | "PRIVATE_TAXI"
    | "INDIVIDUAL_CARGO"
    | "CONSIGNMENT"
    | "SPECIAL_TRANSPORTATION"
    | "KNEELING_BUS"
    | "DANGEROUS_GOODS"
    | "DESIGNATED_WASTE"
    | "HAZARDOUS_CHEMICALS"
    | "HIGH_PRESSURE_GAS_FLAMMABLE"
    | "HIGH_PRESSURE_GAS_TOXIC";

  /**
   * 과정분류 운수종사자 / 저상버스
   *  * TYPE_TRANS_WOKER: 운수종사자
   *  * TYPE_LOW_FLOOR_BUS: 저상버스
   */
  courseType?: "TYPE_TRANS_WORKER" | "TYPE_LOW_FLOOR_BUS" | "TYPE_PROVINCIAL";

  /**
   * 과정 신청 시퀀스
   * @format int64
   */
  courseUserSeq?: number;

  /**
   * 생성일
   * @format date-time
   */
  createdDtime?: string;

  /** 노출여부 */
  displayYn?: string;

  /**
   * 과정 수료 시간
   * @format int32
   */
  lessonTime?: number;

  /** 연결된 차시 */
  lessons?: LessonDetailClientResponseDto[];

  /**
   * 수정일
   * @format date-time
   */
  modifiedDtime?: string;

  /** s3 파일 */
  s3Files?: FileResponseDto[];

  /**
   * 과정 시퀀스
   * @format int64
   */
  seq?: number;

  /**
   * 사용 상태
   * @format int32
   */
  status?: number;

  /** 유저의 설문 완료 여부 */
  surveyCompletedYn?: "Y" | "N";

  /**
   * 설문 시퀀스
   * @format int64
   */
  surveySeq?: number;

  /**
   * 과정 전체 진도율
   * @format double
   */
  totalProgress?: number;
}

export interface CourseDetailResponseDto {
  /** 연결된 콘텐츠 */
  content?: ContentDetailResponseDto;

  /**
   * 교육 분류, 보수/양성/신규 등
   *  * TYPE_SUP_COMMON -> 보수일반
   *  * TYPE_SUP_CONSTANT -> 보수수시
   *  * TYPE_CONSTANT -> 수시
   *  * TYPE_NEW -> 신규
   *  * TYPE_ILLEGAL -> 법령위반자
   *  * TYPE_HANDICAPPED -> 교통약자 이동편의 증진
   *  * TYPE_DANGEROUS -> 위험물진 운송차량 운전자
   */
  courseCategoryType?:
    | "TYPE_SUP_COMMON"
    | "TYPE_SUP_CONSTANT"
    | "TYPE_CONSTANT"
    | "TYPE_NEW"
    | "TYPE_ILLEGAL"
    | "TYPE_HANDICAPPED"
    | "TYPE_DANGEROUS";

  /** 과정 이름 */
  courseName?: string;

  /**
   * 업종*   버스 - BUS
   *     전세버스 - CHARTER_BUS
   *     특수여객 - SPECIAL_PASSENGER
   *     법인택시 - CORPORATE_TAXI
   *     일반화물 - GENERAL_CARGO
   *     개인택시 - PRIVATE_TAXI
   *     개별화물 - INDIVIDUAL_CARGO
   *     용달화물 - CONSIGNMENT
   *     특별교통수단 - SPECIAL_TRANSPORTATION
   *     저상버스 - KNEELING_BUS
   *     위험물 - DANGEROUS_GOODS
   *     지정폐기물 - DESIGNATED_WASTE
   *     유해화학물질 - HAZARDOUS_CHEMICALS
   *     고압가스(가연성) - HIGH_PRESSURE_GAS_FLAMMABLE
   *     고압가스(독성) - HIGH_PRESSURE_GAS_TOXIC
   */
  courseSubCategoryType?:
    | "BUS"
    | "CHARTER_BUS"
    | "SPECIAL_PASSENGER"
    | "CORPORATE_TAXI"
    | "GENERAL_CARGO"
    | "PRIVATE_TAXI"
    | "INDIVIDUAL_CARGO"
    | "CONSIGNMENT"
    | "SPECIAL_TRANSPORTATION"
    | "KNEELING_BUS"
    | "DANGEROUS_GOODS"
    | "DESIGNATED_WASTE"
    | "HAZARDOUS_CHEMICALS"
    | "HIGH_PRESSURE_GAS_FLAMMABLE"
    | "HIGH_PRESSURE_GAS_TOXIC";

  /**
   * 과정분류 운수종사자 / 저상버스
   *  * TYPE_TRANS_WOKER: 운수종사자
   *  * TYPE_LOW_FLOOR_BUS: 저상버스
   */
  courseType?: "TYPE_TRANS_WORKER" | "TYPE_LOW_FLOOR_BUS" | "TYPE_PROVINCIAL";

  /**
   * 생성일
   * @format date-time
   */
  createdDtime?: string;

  /** 노출여부 */
  displayYn?: string;

  /**
   * 과정 수료 시간
   * @format int32
   */
  lessonTime?: number;

  /** 연결된 차시 */
  lessons?: LessonDetailResponseDto[];

  /**
   * 수정일
   * @format date-time
   */
  modifiedDtime?: string;

  /** s3 파일 */
  s3Files?: FileResponseDto[];

  /**
   * 과정 시퀀스
   * @format int64
   */
  seq?: number;

  /**
   * 사용 상태
   * @format int32
   */
  status?: number;
}

export interface CourseModuleFindResponseDto {
  /**
   * 최소점수
   * @format double
   */
  assignScore?: number;

  /**
   * 과정 모듈 시퀀스
   * @format int64
   */
  courseModuleSeq?: number;

  /**
   * 과정 시퀀스
   * @format int64
   */
  courseSeq?: number;

  /**
   * 최소진도율 0=>상관없음
   * @format int32
   */
  limitProgress?: number;

  /**
   * 최소진도율
   * @format int32
   */
  limitScore?: number;

  /** 모듈 명 */
  moduleName?: string;

  /**
   * 모듈 분류
   *  COURSE_MODULE_PROGRESS_RATE: 진도율
   *  COURSE_MODULE_TEST: 시험
   */
  moduleType?: "COURSE_MODULE_PROGRESS_RATE" | "COURSE_MODULE_TEST" | "COURSE_MODULE_SURVEY";

  /**
   * 상태코드 1 = 사용,-1 = 오류
   * @format int32
   */
  status?: number;
}

export interface CourseModuleSaveRequestDto {
  /**
   * 반영 비율
   * @format double
   */
  assignScore?: number;

  /**
   * 최소 진도율 0=>상관없음
   * @format int32
   */
  limitProgress?: number;

  /**
   * 최소 점수
   * @format int32
   */
  limitScore?: number;

  /** 모듈 명 */
  moduleName?: string;

  /**
   * 모듈 분류
   * * 진도율 :: COURSE_MODULE_PROGRESS_RATE
   * * 시험 :: COURSE_MODULE_TEST
   * * 설문 :: COURSE_MODULE_SURVEY
   */
  moduleType?: "COURSE_MODULE_PROGRESS_RATE" | "COURSE_MODULE_TEST" | "COURSE_MODULE_SURVEY";

  /**
   * 상태 코드 1 = 사용,-1 = 오류
   * @format int32
   */
  status?: number;

  /** 제출여부 */
  submitYn?: "Y" | "N";

  /**
   * 모듈 타입이 설문일 경우 설문지 시퀀스
   * 이외 모듈분류에서는 NULL
   * @format int64
   */
  surveySeq?: number;
}

export interface CourseModuleSaveResponseDto {
  /**
   * 반영 비율
   * @format double
   */
  assignScore?: number;

  /**
   * 과정 모듈 시퀀스
   * @format int64
   */
  courseModuleSeq?: number;

  /**
   * 과정 시퀀스
   * @format int64
   */
  courseSeq?: number;

  /**
   * 최소 진도율 0=>상관없음
   * @format int32
   */
  limitProgress?: number;

  /**
   * 최소 점수
   * @format int32
   */
  limitScore?: number;

  /** 모듈 명 */
  moduleName?: string;

  /**
   * 모듈 분류
   *  COURSE_MODULE_PROGRESS_RATE: 진도율
   *  COURSE_MODULE_TEST: 시험
   */
  moduleType?: "COURSE_MODULE_PROGRESS_RATE" | "COURSE_MODULE_TEST" | "COURSE_MODULE_SURVEY";

  /**
   * 상태 코드 1 = 사용,-1 = 오류
   * @format int32
   */
  status?: number;

  /** 제출 여부 */
  submitYn?: string;

  /**
   * 설문지 시퀀스
   * @format int64
   */
  surveySeq?: number;
}

export interface CourseModuleUpdateRequestDto {
  /**
   * 반영 비율
   * @format double
   */
  assignScore?: number;

  /**
   * 최소 진도율 0=>상관없음
   * @format int32
   */
  limitProgress?: number;

  /**
   * 최소 점수
   * @format int32
   */
  limitScore?: number;

  /** 모듈 명 */
  moduleName?: string;

  /**
   * 모듈 분류
   *  COURSE_MODULE_PROGRESS_RATE: 진도율
   *  COURSE_MODULE_TEST: 시험
   */
  moduleType?: "COURSE_MODULE_PROGRESS_RATE" | "COURSE_MODULE_TEST" | "COURSE_MODULE_SURVEY";

  /**
   * 상태 코드 1 = 사용,-1 = 오류
   * @format int32
   */
  status?: number;

  /** 제출여부 */
  submitYn?: "Y" | "N";

  /**
   * 설문지 시퀀스
   * @format int64
   */
  surveySeq?: number;
}

export interface CourseModuleUpdateResponseDto {
  /**
   * 반영 비율
   * @format double
   */
  assignScore?: number;

  /**
   * 과정 모듈 시퀀스
   * @format int64
   */
  courseModuleSeq?: number;

  /**
   * 과정 시퀀스
   * @format int64
   */
  courseSeq?: number;

  /**
   * 최소 진도율 0=>상관없음
   * @format int32
   */
  limitProgress?: number;

  /**
   * 최소 점수
   * @format int32
   */
  limitScore?: number;

  /** 모듈 명 */
  moduleName?: string;

  /**
   * 모듈 분류
   *  COURSE_MODULE_PROGRESS_RATE: 진도율
   *  COURSE_MODULE_TEST: 시험
   */
  moduleType?: "COURSE_MODULE_PROGRESS_RATE" | "COURSE_MODULE_TEST" | "COURSE_MODULE_SURVEY";

  /**
   * 상태 코드 1 = 사용,-1 = 오류
   * @format int32
   */
  status?: number;
}

export interface CourseModules {
  /** @format double */
  assignScore?: number;
  course?: Course;

  /** @format date-time */
  createdDtime?: string;

  /** @format int32 */
  limitProgress?: number;

  /** @format int32 */
  limitScore?: number;

  /** @format date-time */
  modifiedDtime?: string;
  moduleName?: string;
  moduleType?: "COURSE_MODULE_PROGRESS_RATE" | "COURSE_MODULE_TEST" | "COURSE_MODULE_SURVEY";

  /** @format int64 */
  seq?: number;

  /** @format int32 */
  status?: number;
  submitYn?: string;
  survey?: Survey;
}

export interface CourseProgress {
  /** @format date-time */
  completeDtime?: string;
  completeYn?: string;
  courseUser?: CourseUser;

  /** @format date-time */
  createdDtime?: string;

  /** @format date-time */
  lastViewDtime?: string;
  lesson?: Lesson;

  /** @format date-time */
  modifiedDtime?: string;

  /** @format double */
  ratio?: number;

  /** @format int64 */
  seq?: number;

  /** @format int32 */
  status?: number;

  /** @format double */
  studyLastTime?: number;

  /** @format double */
  studyTime?: number;

  /** @format int32 */
  viewCnt?: number;
}

export interface CourseProgressRequestDto {
  /**
   * 유저-과정 시퀀스
   * @format int64
   */
  courseUserSeq?: number;

  /**
   * 마지막 수강 날짜
   * @format date-time
   */
  lastViewDtime?: string;

  /**
   * 레슨 시퀀스
   * @format int64
   */
  lessonSeq?: number;

  /**
   * 마지막 학습 시간
   * @format double
   */
  studyLastTime?: number;

  /**
   * 총 학습 시간
   * @format double
   */
  studyTime?: number;

  /**
   * 조회수
   * @format int32
   */
  viewCnt?: number;
}

export interface CourseProgressResponseDto {
  /**
   * 챕터 수료 일자
   * @format date-time
   */
  completeDtime?: string;

  /** 챕터수료여부 */
  completeYn?: string;

  /**
   * 유저 진도율 시퀀스
   * @format int64
   */
  courseProgressSeq?: number;

  /**
   * 유저-과정 시퀀스
   * @format int64
   */
  courseUserSeq?: number;

  /**
   * 생성 날짜
   * @format date-time
   */
  createdDtime?: string;

  /**
   * 마지막 수강 날짜
   * @format date-time
   */
  lastViewDtime?: string;

  /**
   * 레슨 시퀀스
   * @format int64
   */
  lessonSeq?: number;

  /**
   * 수정 날짜
   * @format date-time
   */
  modifiedDtime?: string;

  /**
   * 진도율
   * @format double
   */
  ratio?: number;

  /**
   * 마지막 학습 시간
   * @format double
   */
  studyLastTime?: number;

  /**
   * 총 학습 시간
   * @format double
   */
  studyTime?: number;

  /**
   * 조회수
   * @format int32
   */
  viewCnt?: number;
}

export interface CourseProgressUpdateRequestDto {
  /**
   * 유저 진도율 시퀀스
   * @format int64
   */
  courseProgressSeq?: number;

  /**
   * 유저-과정 시퀀스
   * @format int64
   */
  courseUserSeq?: number;

  /**
   * 레슨 시퀀스
   * @format int64
   */
  lessonSeq?: number;

  /**
   * 마지막 학습시간
   * @format double
   */
  studyLastTime?: number;
}

export interface CourseResponseDto {
  /** 연결된 콘텐츠 이름 */
  contentName?: string;

  /**
   * 연결된 콘텐츠 시퀀스
   * @format int64
   */
  contentSeq?: number;

  /**
   * 운수사업 타입
   * TYPE_ALL: 전체 But 사용하지 말 것
   * TYPE_PASSENGER: 여객
   * TYPE_CARGO: 운수
   */
  courseBusinessType?: "TYPE_ALL" | "TYPE_PASSENGER" | "TYPE_CARGO";

  /**
   * 교육 분류, 보수/양성/신규 등
   *  * TYPE_SUP_COMMON -> 보수일반
   *  * TYPE_SUP_CONSTANT -> 보수수시
   *  * TYPE_CONSTANT -> 수시
   *  * TYPE_NEW -> 신규
   *  * TYPE_ILLEGAL -> 법령위반자
   *  * TYPE_HANDICAPPED -> 교통약자 이동편의 증진
   *  * TYPE_DANGEROUS -> 위험물진 운송차량 운전자
   */
  courseCategoryType?:
    | "TYPE_SUP_COMMON"
    | "TYPE_SUP_CONSTANT"
    | "TYPE_CONSTANT"
    | "TYPE_NEW"
    | "TYPE_ILLEGAL"
    | "TYPE_HANDICAPPED"
    | "TYPE_DANGEROUS";

  /** 과정 이름 */
  courseName?: string;

  /**
   * 업종*   버스 - BUS
   *     전세버스 - CHARTER_BUS
   *     특수여객 - SPECIAL_PASSENGER
   *     법인택시 - CORPORATE_TAXI
   *     일반화물 - GENERAL_CARGO
   *     개인택시 - PRIVATE_TAXI
   *     개별화물 - INDIVIDUAL_CARGO
   *     용달화물 - CONSIGNMENT
   *     특별교통수단 - SPECIAL_TRANSPORTATION
   *     저상버스 - KNEELING_BUS
   *     위험물 - DANGEROUS_GOODS
   *     지정폐기물 - DESIGNATED_WASTE
   *     유해화학물질 - HAZARDOUS_CHEMICALS
   *     고압가스(가연성) - HIGH_PRESSURE_GAS_FLAMMABLE
   *     고압가스(독성) - HIGH_PRESSURE_GAS_TOXIC
   */
  courseSubCategoryType?:
    | "BUS"
    | "CHARTER_BUS"
    | "SPECIAL_PASSENGER"
    | "CORPORATE_TAXI"
    | "GENERAL_CARGO"
    | "PRIVATE_TAXI"
    | "INDIVIDUAL_CARGO"
    | "CONSIGNMENT"
    | "SPECIAL_TRANSPORTATION"
    | "KNEELING_BUS"
    | "DANGEROUS_GOODS"
    | "DESIGNATED_WASTE"
    | "HAZARDOUS_CHEMICALS"
    | "HIGH_PRESSURE_GAS_FLAMMABLE"
    | "HIGH_PRESSURE_GAS_TOXIC";

  /**
   * 과정분류 운수종사자 / 저상버스
   *  * TYPE_TRANS_WOKER: 운수종사자
   *  * TYPE_LOW_FLOOR_BUS: 저상버스
   */
  courseType?: "TYPE_TRANS_WORKER" | "TYPE_LOW_FLOOR_BUS" | "TYPE_PROVINCIAL";

  /**
   * 생성일
   * @format date-time
   */
  createdDtime?: string;

  /** 노출여부 */
  displayYn?: string;

  /** 파일 이름 */
  fileName?: string;

  /**
   * 과정 수료 시간
   * @format int32
   */
  lessonTime?: number;

  /**
   * 수정일
   * @format date-time
   */
  modifiedDtime?: string;

  /** s3 파일 */
  s3Files?: FileResponseDto[];

  /**
   * 과정 시퀀스
   * @format int64
   */
  seq?: number;

  /**
   * 사용 상태
   * @format int32
   */
  status?: number;
}

export interface CourseSaveRequestDto {
  /**
   * 교육 분류, 보수/양성/신규 등 * TYPE_SUP_COMMON -> 보수일반
   *  * TYPE_SUP_CONSTANT -> 보수수시
   *  * TYPE_CONSTANT -> 수시
   *  * TYPE_NEW -> 신규
   *  * TYPE_ILLEGAL -> 법령위반자
   *  * TYPE_HANDICAPPED -> 교통약자 이동편의 증진
   *  * TYPE_DANGEROUS -> 위험물진 운송차량 운전자
   */
  courseCategoryType?:
    | "TYPE_SUP_COMMON"
    | "TYPE_SUP_CONSTANT"
    | "TYPE_CONSTANT"
    | "TYPE_NEW"
    | "TYPE_ILLEGAL"
    | "TYPE_HANDICAPPED"
    | "TYPE_DANGEROUS";

  /** 과정 이름 */
  courseName?: string;

  /**
   * 업종*   버스 - BUS
   *     전세버스 - CHARTER_BUS
   *     특수여객 - SPECIAL_PASSENGER
   *     법인택시 - CORPORATE_TAXI
   *     일반화물 - GENERAL_CARGO
   *     개인택시 - PRIVATE_TAXI
   *     개별화물 - INDIVIDUAL_CARGO
   *     용달화물 - CONSIGNMENT
   *     특별교통수단 - SPECIAL_TRANSPORTATION
   *     저상버스 - KNEELING_BUS
   *     위험물 - DANGEROUS_GOODS
   *     지정폐기물 - DESIGNATED_WASTE
   *     유해화학물질 - HAZARDOUS_CHEMICALS
   *     고압가스(가연성) - HIGH_PRESSURE_GAS_FLAMMABLE
   *     고압가스(독성) - HIGH_PRESSURE_GAS_TOXIC
   */
  courseSubCategoryType?:
    | "BUS"
    | "CHARTER_BUS"
    | "SPECIAL_PASSENGER"
    | "CORPORATE_TAXI"
    | "GENERAL_CARGO"
    | "PRIVATE_TAXI"
    | "INDIVIDUAL_CARGO"
    | "CONSIGNMENT"
    | "SPECIAL_TRANSPORTATION"
    | "KNEELING_BUS"
    | "DANGEROUS_GOODS"
    | "DESIGNATED_WASTE"
    | "HAZARDOUS_CHEMICALS"
    | "HIGH_PRESSURE_GAS_FLAMMABLE"
    | "HIGH_PRESSURE_GAS_TOXIC";

  /**
   * 과정분류 운수종사자 / 저상버스 * TYPE_TRANS_WOKER: 운수종사자
   *  * TYPE_LOW_FLOOR_BUS: 저상버스
   */
  courseType?: "TYPE_TRANS_WORKER" | "TYPE_LOW_FLOOR_BUS" | "TYPE_PROVINCIAL";

  /** 노출여부 */
  displayYn?: string;

  /**
   * 과정 수료 인정 시간
   * @format int32
   */
  lessonTime?: number;

  /**
   * 사용 여부
   * @format int32
   */
  status?: 1 | -1;
}

export interface CourseSurveyLinkRequestDto {
  /**
   * 과정 시퀀스
   * @format int64
   */
  courseSeq?: number;

  /**
   * 설문 시퀀스
   * @format int64
   */
  surveySeq?: number;
}

export interface CourseUpdateRequestDto {
  /** 교육 분류, 보수/양성/신규 등 */
  courseCategoryType?:
    | "TYPE_SUP_COMMON"
    | "TYPE_SUP_CONSTANT"
    | "TYPE_CONSTANT"
    | "TYPE_NEW"
    | "TYPE_ILLEGAL"
    | "TYPE_HANDICAPPED"
    | "TYPE_DANGEROUS";

  /** 과정 이름 */
  courseName?: string;

  /** 업종 */
  courseSubCategoryType?:
    | "BUS"
    | "CHARTER_BUS"
    | "SPECIAL_PASSENGER"
    | "CORPORATE_TAXI"
    | "GENERAL_CARGO"
    | "PRIVATE_TAXI"
    | "INDIVIDUAL_CARGO"
    | "CONSIGNMENT"
    | "SPECIAL_TRANSPORTATION"
    | "KNEELING_BUS"
    | "DANGEROUS_GOODS"
    | "DESIGNATED_WASTE"
    | "HAZARDOUS_CHEMICALS"
    | "HIGH_PRESSURE_GAS_FLAMMABLE"
    | "HIGH_PRESSURE_GAS_TOXIC";

  /** 과정분류 운수종사자 / 저상버스 */
  courseType?: "TYPE_TRANS_WORKER" | "TYPE_LOW_FLOOR_BUS" | "TYPE_PROVINCIAL";

  /** 노출여부 */
  displayYn?: string;

  /**
   * 과정 수료 인정 시간
   * @format int32
   */
  lessonTime?: number;

  /** S3 파일 */
  s3Files?: FileRequestDto[];

  /**
   * 사용 여부
   * @format int32
   */
  status?: 1 | -1;
}

export interface CourseUser {
  /** @format date-time */
  completeDtime?: string;
  completeNo?: string;
  completeYn?: string;
  courseClass?: CourseClass;
  courseProgressList?: CourseProgress[];
  courseUserSurvey?: CourseUserSurvey;

  /** @format date-time */
  createdDtime?: string;
  examMultipleChoiceResultList?: ExamMultipleChoiceResult[];

  /** @format double */
  examScore?: number;
  examSubjectiveResultList?: ExamSubjectiveResult[];
  examUser?: ExamUser;

  /** @format double */
  examValue?: number;
  failReason?: string;

  /** @format date-time */
  modifiedDtime?: string;

  /** @format date-time */
  outDtime?: string;
  outReason?: string;
  outYn?: string;

  /** @format double */
  progressRatio?: number;

  /** @format double */
  progressScore?: number;
  regType?: "TYPE_INDIVIDUAL" | "TYPE_ORGANIZATION";

  /** @format int64 */
  regUserSeq?: number;

  /** @format int64 */
  seq?: number;

  /** @format int32 */
  status?: number;

  /** @format double */
  totalScore?: number;
  user?: User;
}

export interface CourseUserCompletionResponseDto {
  message?: string;
}

export interface CourseUserLogRequestDto {
  /**
   * 유저-과정 시퀀스
   * @format int64
   */
  courseUserSeq?: number;

  /**
   * 레슨 시퀀스
   * @format int64
   */
  lessonSeq?: number;

  /**
   * 학습시간
   * @format double
   */
  studyTime?: number;
}

export interface CourseUserLogResponseDto {
  /**
   * 유저-과정 시퀀스
   * @format int64
   */
  courseUserSeq?: number;

  /**
   * 레슨 시퀀스
   * @format int64
   */
  lessonSeq?: number;

  /** 유저 에이전트 */
  regAgent?: string;

  /** 유저 아이피 */
  regIp?: string;

  /**
   * 학습시간
   * @format double
   */
  studyTime?: number;

  /**
   * 유저 시퀀스
   * @format int64
   */
  userSeq?: number;
}

export interface CourseUserMyInfoResponseDto {
  /**
   * 과정 클래스 시퀀스
   * @format int64
   * @example 1
   */
  courseClassSeq?: number;

  /**
   * 과정 시퀀스
   * @format int64
   * @example 1
   */
  courseSeq?: number;

  /**
   * 과정 제목
   * @example 과정 제목
   */
  courseTitle?: string;

  /**
   * 과정 신청 시퀀스
   * @format int64
   * @example 1
   */
  courseUserSeq?: number;

  /**
   * 교육 만료까지 남은 기한
   * @format int64
   * @example 180
   */
  leftDays?: number;

  /**
   * 진도율
   * @format double
   * @example 0
   */
  progress?: number;

  /**
   * 학습 중인 과정/학습 종료 과정 구분
   *  * TYPE_PROGRESSING: 학습 진행 중인 과정
   *  * TYPE_ENDED: 학습 종료된 과정
   */
  progressStatus?: "TYPE_PROGRESSING" | "TYPE_ENDED";

  /**
   * 기수
   * @format int32
   * @example 1
   */
  step?: number;

  /**
   * 교육 만료일
   * @format date-time
   */
  studyEndDate?: string;

  /**
   * 썸네일 이미지 S3 경로
   * @example https://...
   */
  thumbnailImage?: string;
}

export interface CourseUserResponseDto {
  /**
   * 수료일
   * @format date-time
   */
  completeDtime?: string;

  /** 수료 넘버 */
  completeNo?: string;

  /** 수료 여부 */
  completeYn?: string;

  /** 과정 엔티티 */
  courseClass?: CourseClassResponseDto;

  /**
   * 생성일
   * @format date-time
   */
  createdDtime?: string;

  /** 수료 실패 여부 */
  failReason?: string;

  /**
   * 수정일
   * @format date-time
   */
  modifiedDtime?: string;

  /** @format date-time */
  outDtime?: string;
  outReason?: string;
  outYn?: string;

  /**
   * 진도율 %
   * @format double
   */
  progressRatio?: number;

  /**
   * 진도율 점수
   * @format double
   */
  progressScore?: number;
  regType?: "TYPE_INDIVIDUAL" | "TYPE_ORGANIZATION";

  /** @format int64 */
  regUserSeq?: number;

  /**
   * 시퀀스
   * @format int64
   */
  seq?: number;

  /**
   * 상태
   * @format int32
   */
  status?: number;

  /**
   * 최종 점수
   * @format double
   */
  totalScore?: number;

  /** 유저 엔티티 */
  user?: UserResponseDto;
}

export interface CourseUserSurvey {
  completeYn?: string;
  courseUser?: CourseUser;

  /** @format date-time */
  createdDtime?: string;

  /** @format date-time */
  modifiedDtime?: string;

  /** @format int64 */
  seq?: number;

  /** @format int32 */
  status?: number;
  survey?: Survey;
}

export interface CourseUserTransDetailsResponseDto {
  /**
   * 교육정보 - 업종구분
   *     TYPE_PASSENGER: 여객    TYPE_CARGO: 화물
   */
  businessType?: "TYPE_ALL" | "TYPE_PASSENGER" | "TYPE_CARGO";

  /** 교육신청자 정보 - 차량번호 */
  carNumber?: string;

  /**
   * 교육신청자 정보 - 차량 등록지
   * 천안 - CHEONAN
   * 공주 - PRINCESS
   * 보령 - BORYEONG
   * 아산 - ASAN
   * 서산 - SEOSAN
   * 논산 - NONSAN
   * 계룡 - GYERYONG
   * 당진 - DANGJIN
   * 금산 - GEUMSAN
   * 부여 - GRANT
   * 서천 - SEOCHEON
   * 청양 - CHEONGYANG
   * 홍성 - HONGSEONG
   * 예산 - BUDGET
   * 태안 - TAEAN
   * 충남 - CHUNGNAM
   * 세종 - SEJONG
   * 서울 - SEOUL
   * 부산 - BUSAN
   * 대구 - DAEGU
   * 인천 - INCHEON
   * 광주 - GWANGJU
   * 대전 - DAEJEON
   * 울산 - ULSAN
   * 경기 - GAME
   * 강원 - GANGWON
   * 충북 - CHUNGBUK
   * 전북 - JEONBUK
   * 전남 - JEONNAM
   * 경북 - GYEONGBUK
   * 경남 - GYEONGNAM
   * 제주 - JEJU
   */
  carRegisteredRegion?:
    | "CHEONAN"
    | "GONGJU"
    | "BORYEONG"
    | "ASAN"
    | "SEOSAN"
    | "NONSAN"
    | "GYERYONG"
    | "DANGJIN"
    | "GEUMSAN"
    | "BUYEO"
    | "SEOCHEON"
    | "CHEONGYANG"
    | "HONGSEONG"
    | "YESAN"
    | "TAEAN"
    | "CHUNGNAM"
    | "SEJONG"
    | "SEOUL"
    | "BUSAN"
    | "DAEGU"
    | "INCHEON"
    | "GWANGJU"
    | "DAEJEON"
    | "ULSAN"
    | "GYEONGGI"
    | "GANGWON"
    | "CHUNGBUK"
    | "JEONBUK"
    | "JEONNAM"
    | "GYEONGBUK"
    | "GYEONGNAM"
    | "JEJU";

  /**
   * 교육정보 - 교육과정
   *  * TYPE_SUP_COMMON -> 보수일반
   *  * TYPE_SUP_CONSTANT -> 보수 수시
   *  * TYPE_CONSTANT -> 수시
   *  * TYPE_NEW -> 신규
   *  * TYPE_ILLEGAL -> 법령위반자
   *  * TYPE_HANDICAPPED -> 교통약자 이동편의 증진
   *  * TYPE_DANGEROUS -> 위험물진 운송차량 운전자
   */
  categoryType?:
    | "TYPE_SUP_COMMON"
    | "TYPE_SUP_CONSTANT"
    | "TYPE_CONSTANT"
    | "TYPE_NEW"
    | "TYPE_ILLEGAL"
    | "TYPE_HANDICAPPED"
    | "TYPE_DANGEROUS";

  /** 교육신청자 정보 - 주민등록번호 */
  identityNumber?: string;

  /** 교육신청자 정보 - 이름 */
  name?: string;

  /** 교육신청자 정보 - 휴대전화 */
  phone?: string;

  /**
   * 업체정보 - 예약구분
   *  * TYPE_INDIVIDUAL: 개인
   *  * TYPE_ORGANIZATION: 단체
   */
  regType?: "TYPE_INDIVIDUAL" | "TYPE_ORGANIZATION";

  /**
   * 과정 신청 시퀀스
   * @format int64
   */
  seq?: number;

  /**
   * 교육정보 - 기수
   * @format int32
   */
  step?: number;

  /** 교육정보 - 교육일자 (시작 및 종료 일자) */
  studyDate?: string;

  /**
   * 업체정보 - 업종
   *  *  PASSENGER 여객
   *  *  FREIGHT 화물
   */
  userBusinessType?: "PASSENGER" | "FREIGHT";

  /** 업체정보 - 회사명 */
  userCompanyName?: string;

  /**
   * 업체정보 - 업종구분
   * *   버스 - BUS
   *     전세버스 - CHARTER_BUS
   *     특수여객 - SPECIAL_PASSENGER
   *     법인택시 - CORPORATE_TAXI
   *     일반화물 - GENERAL_CARGO
   *     개인택시 - PRIVATE_TAXI
   *     개별화물 - INDIVIDUAL_CARGO
   *     용달화물 - CONSIGNMENT
   *     특별교통수단 - SPECIAL_TRANSPORTATION
   *     저상버스 - KNEELING_BUS
   *     위험물 - DANGEROUS_GOODS
   *     지정폐기물 - DESIGNATED_WASTE
   *     유해화학물질 - HAZARDOUS_CHEMICALS
   *     고압가스(가연성) - HIGH_PRESSURE_GAS_FLAMMABLE
   *     고압가스(독성) - HIGH_PRESSURE_GAS_TOXIC
   */
  userSubBusinessType?:
    | "BUS"
    | "CHARTER_BUS"
    | "SPECIAL_PASSENGER"
    | "CORPORATE_TAXI"
    | "GENERAL_CARGO"
    | "PRIVATE_TAXI"
    | "INDIVIDUAL_CARGO"
    | "CONSIGNMENT"
    | "SPECIAL_TRANSPORTATION"
    | "KNEELING_BUS"
    | "DANGEROUS_GOODS"
    | "DESIGNATED_WASTE"
    | "HAZARDOUS_CHEMICALS"
    | "HIGH_PRESSURE_GAS_FLAMMABLE"
    | "HIGH_PRESSURE_GAS_TOXIC";
}

export interface CourseUserTransResponseDto {
  /** 신청 과정명 */
  courseTitle?: string;

  /**
   * 신청 일시
   * @format date-time
   */
  createdDtime?: string;

  /**
   * 신청 수정 일시
   * @format date-time
   */
  modifiedDtime?: string;

  /** 신청 타입 */
  regType?: "TYPE_INDIVIDUAL" | "TYPE_ORGANIZATION";

  /**
   * 신청 유저 시퀀스 (단체)
   * @format int64
   */
  regUserSeq?: number;

  /**
   * 과정 신청 시퀀스
   * @format int64
   */
  seq?: number;
}

export interface CourseUserTransSaveRequestDto {
  /** 업체정보 - 회사명 */
  businessName?: string;

  /** 업체정보 - 업종구분 */
  businessSubType?:
    | "BUS"
    | "CHARTER_BUS"
    | "SPECIAL_PASSENGER"
    | "CORPORATE_TAXI"
    | "GENERAL_CARGO"
    | "PRIVATE_TAXI"
    | "INDIVIDUAL_CARGO"
    | "CONSIGNMENT"
    | "SPECIAL_TRANSPORTATION"
    | "KNEELING_BUS"
    | "DANGEROUS_GOODS"
    | "DESIGNATED_WASTE"
    | "HAZARDOUS_CHEMICALS"
    | "HIGH_PRESSURE_GAS_FLAMMABLE"
    | "HIGH_PRESSURE_GAS_TOXIC";

  /** 업체정보 - 업종 */
  businessType?: "PASSENGER" | "FREIGHT";

  /** 교육신청자정보 - 차량번호 */
  carNumber?: string;

  /** 교육신청자정보 - 차량 등록지 */
  carRegisteredRegion?:
    | "CHEONAN"
    | "GONGJU"
    | "BORYEONG"
    | "ASAN"
    | "SEOSAN"
    | "NONSAN"
    | "GYERYONG"
    | "DANGJIN"
    | "GEUMSAN"
    | "BUYEO"
    | "SEOCHEON"
    | "CHEONGYANG"
    | "HONGSEONG"
    | "YESAN"
    | "TAEAN"
    | "CHUNGNAM"
    | "SEJONG"
    | "SEOUL"
    | "BUSAN"
    | "DAEGU"
    | "INCHEON"
    | "GWANGJU"
    | "DAEJEON"
    | "ULSAN"
    | "GYEONGGI"
    | "GANGWON"
    | "CHUNGBUK"
    | "JEONBUK"
    | "JEONNAM"
    | "GYEONGBUK"
    | "GYEONGNAM"
    | "JEJU";

  /**
   * 과정 클래스 시퀀스
   * @format int64
   */
  courseClassSeq?: number;

  /** 교육신청자정보 - 주민등록번호 */
  identityNumber?: string;

  /** 교육신청자정보 - 이름 */
  name?: string;

  /** 휴대전화 */
  phone?: string;

  /**
   * 예약 구분
   *  * TYPE_INDIVIDUAL: 개인
   *  * TYPE_ORGANIZATION: 단체
   */
  registerType?: "TYPE_INDIVIDUAL" | "TYPE_ORGANIZATION";

  /** sms 수신 동의 여부 */
  smsYn?: "Y" | "N";
}

export interface CourseUserTransUpdateRequestDto {
  /** 업체정보 - 회사명 */
  businessName?: string;

  /** 업체정보 - 업종구분 */
  businessSubType?:
    | "BUS"
    | "CHARTER_BUS"
    | "SPECIAL_PASSENGER"
    | "CORPORATE_TAXI"
    | "GENERAL_CARGO"
    | "PRIVATE_TAXI"
    | "INDIVIDUAL_CARGO"
    | "CONSIGNMENT"
    | "SPECIAL_TRANSPORTATION"
    | "KNEELING_BUS"
    | "DANGEROUS_GOODS"
    | "DESIGNATED_WASTE"
    | "HAZARDOUS_CHEMICALS"
    | "HIGH_PRESSURE_GAS_FLAMMABLE"
    | "HIGH_PRESSURE_GAS_TOXIC";

  /** 업체정보 - 업종 */
  businessType?: "PASSENGER" | "FREIGHT";

  /** 교육신청자정보 - 차량번호 */
  carNumber?: string;

  /** 교육신청자정보 - 차량 등록지 */
  carRegisteredRegion?:
    | "CHEONAN"
    | "GONGJU"
    | "BORYEONG"
    | "ASAN"
    | "SEOSAN"
    | "NONSAN"
    | "GYERYONG"
    | "DANGJIN"
    | "GEUMSAN"
    | "BUYEO"
    | "SEOCHEON"
    | "CHEONGYANG"
    | "HONGSEONG"
    | "YESAN"
    | "TAEAN"
    | "CHUNGNAM"
    | "SEJONG"
    | "SEOUL"
    | "BUSAN"
    | "DAEGU"
    | "INCHEON"
    | "GWANGJU"
    | "DAEJEON"
    | "ULSAN"
    | "GYEONGGI"
    | "GANGWON"
    | "CHUNGBUK"
    | "JEONBUK"
    | "JEONNAM"
    | "GYEONGBUK"
    | "GYEONGNAM"
    | "JEJU";

  /** 휴대전화 */
  phone?: string;
}

export interface CustomPartETagsDto {
  etag?: string;

  /** @format int32 */
  partNumber?: number;
}

export interface Exam {
  content?: Content;

  /** @format date-time */
  createdDtime?: string;
  examContent?: string;
  examName?: string;
  examQuestionList?: ExamQuestion[];

  /** @format int32 */
  examTime?: number;
  examType?: "EXAM_MIDDLE" | "EXAM_FINAL";

  /** @format date-time */
  modifiedDtime?: string;

  /** @format int32 */
  objCnt?: number;

  /** @format double */
  objScore?: number;

  /** @format int64 */
  seq?: number;

  /** @format int32 */
  status?: number;

  /** @format int32 */
  subCnt?: number;

  /** @format double */
  subScore?: number;
}

export interface ExamDetailResponseDto {
  /**
   * 콘텐츠 시퀀스
   * @format int64
   * @example 0
   */
  contentSeq?: number;

  /**
   * 생성일
   * @format date-time
   */
  createdDtime?: string;

  /** 내용 - 마크다운 */
  examContent?: string;

  /**
   * 시험 이름
   * @example 예제 시험 이름명
   */
  examName?: string;
  examQuestions?: ExamQuestion[];

  /**
   * 시험 시간 (min 단위)
   * @format int32
   * @example 60
   */
  examTime?: number;

  /**
   * 시험 타입
   * EXAM_MIDDLE: 중간평가
   * EXAM_FINAL: 기말평가
   */
  examType?: "EXAM_MIDDLE" | "EXAM_FINAL";

  /**
   * 수정일
   * @format date-time
   */
  modifiedDtime?: string;

  /**
   * 객관식 나오는 질문 개수
   * @format int32
   */
  objCnt?: number;

  /**
   * 객관식 개당 점수
   * @format double
   */
  objScore?: number;

  /**
   * 시퀀스
   * @format int64
   */
  seq?: number;

  /**
   * 상태
   * @format int32
   */
  status?: number;

  /**
   * 주관식 나오는 질문 개수
   * @format int32
   */
  subCnt?: number;

  /**
   * 주관식 개당 점수
   * @format double
   */
  subScore?: number;
}

export interface ExamExamSubjectiveResultUpdateRequestDto {
  /**
   * 선택 답안
   * @format int32
   */
  choice?: number;

  /** 평가 의견 */
  feedback?: string;

  /**
   * 점수
   * @format double
   */
  score?: number;

  /** 임시 저장 상태 */
  temporaryYn?: string;
}

export interface ExamFindUserDetailResponseDto {
  /** 정답 */
  answer?: string;

  /**
   * 객관식 선택 답안
   * @format int32
   */
  choice?: number;

  /** 정답 설명 - 255자 */
  description?: string;

  /**
   * 시험 타입
   *  QUESTION_OBJ : 객관식
   *  QUESTION_SUBJ : 주관식
   */
  examQuestionTypeEnums?: "QUESTION_OBJ" | "QUESTION_SUBJ";

  /**
   * 시험 시퀀스
   * @format int64
   */
  examSeq?: number;

  /** 주관식 피드백 */
  feedback?: string;

  /** 보기 1 제목 */
  item1?: string;

  /** 보기 10 제목 */
  item10?: string;

  /** 보기 2 제목 */
  item2?: string;

  /** 보기 3 제목 */
  item3?: string;

  /** 보기 4 제목 */
  item4?: string;

  /** 보기 5 제목 */
  item5?: string;

  /** 보기 6 제목 */
  item6?: string;

  /** 보기 7 제목 */
  item7?: string;

  /** 보기 8 제목 */
  item8?: string;

  /** 보기 9 제목 */
  item9?: string;

  /**
   * 보기 개수
   * @format int32
   */
  itemCnt?: number;

  /** 질문내용 */
  question?: string;

  /**
   * 시퀀스
   * @format int64
   */
  seq?: number;
}

export interface ExamMultiSubjectUpdateResponseDto {
  examMultipleChoiceResultResponseDtoList?: ExamMultipleChoiceResultResponseDto[];
  examSubjectiveResultResponseDtoList?: ExamSubjectiveResultResponseDto[];
}

export interface ExamMultipleChoiceResult {
  /** @format int32 */
  choice?: number;
  courseUser?: CourseUser;

  /** @format date-time */
  createdDtime?: string;
  examQuestion?: ExamQuestion;

  /** @format date-time */
  modifiedDtime?: string;

  /** @format double */
  score?: number;

  /** @format int64 */
  seq?: number;

  /** @format int32 */
  status?: number;
  temporaryYn?: string;
}

export interface ExamMultipleChoiceResultRequestDto {
  /**
   * 선택답안
   * @format int32
   */
  choice?: number;

  /**
   * 유저-과정 시퀀스
   * @format int64
   */
  courseUserSeq?: number;

  /**
   * 시험 객관식 결과 시퀀스
   * @format int64
   */
  examQuestionSeq?: number;

  /**
   * 점수
   * @format double
   */
  score?: number;

  /** 임시 저장 상태 */
  temporaryYn?: string;
}

export interface ExamMultipleChoiceResultResponseDto {
  /**
   * 선택답안
   * @format int32
   */
  choice?: number;

  /**
   * 유저-과정 시퀀스
   * @format int64
   */
  courseUserSeq?: number;

  /**
   * 생성일
   * @format date-time
   */
  createdDtime?: string;

  /**
   * 시험 객관식 결과 시퀀스
   * @format int64
   */
  examQuestionSeq?: number;

  /**
   * 수정일
   * @format date-time
   */
  modifiedDtime?: string;

  /**
   * 점수
   * @format double
   */
  score?: number;

  /**
   * 시퀀스
   * @format int64
   */
  seq?: number;

  /**
   * 상태
   * @format int32
   */
  status?: number;

  /** 임시 저장 상태 */
  temporaryYn?: string;
}

export interface ExamMultipleChoiceResultUpdateRequestDto {
  /**
   * 선택답안
   * @format int32
   */
  choice?: number;

  /**
   * 점수
   * @format double
   */
  score?: number;

  /** 임시 저장 상태 */
  temporaryYn?: string;
}

export interface ExamQuestion {
  answer?: string;

  /** @format date-time */
  createdDtime?: string;
  description?: string;
  exam?: Exam;
  examMultipleChoiceResult?: ExamMultipleChoiceResult[];
  examQuestionTypeEnums?: "QUESTION_OBJ" | "QUESTION_SUBJ";
  examSubjectiveResult?: ExamSubjectiveResult[];
  item1?: string;
  item10?: string;
  item2?: string;
  item3?: string;
  item4?: string;
  item5?: string;
  item6?: string;
  item7?: string;
  item8?: string;
  item9?: string;

  /** @format int32 */
  itemCnt?: number;

  /** @format date-time */
  modifiedDtime?: string;
  question?: string;

  /** @format int64 */
  seq?: number;

  /** @format int32 */
  status?: number;
}

export interface ExamQuestionBankSaveRequestDto {
  questionSeqList?: number[];
}

export interface ExamQuestionFindResponseDto {
  /** 정답 */
  answer?: string;

  /** 정답 설명 - 255자 */
  description?: string;

  /**
   * 시험 타입
   *  QUESTION_OBJ : 객관식
   *  QUESTION_SUBJ : 주관식
   */
  examQuestionTypeEnums?: "QUESTION_OBJ" | "QUESTION_SUBJ";

  /**
   * 시험 시퀀스
   * @format int64
   */
  examSeq?: number;

  /** 보기 1 제목 */
  item1?: string;

  /** 보기 10 제목 */
  item10?: string;

  /** 보기 2 제목 */
  item2?: string;

  /** 보기 3 제목 */
  item3?: string;

  /** 보기 4 제목 */
  item4?: string;

  /** 보기 5 제목 */
  item5?: string;

  /** 보기 6 제목 */
  item6?: string;

  /** 보기 7 제목 */
  item7?: string;

  /** 보기 8 제목 */
  item8?: string;

  /** 보기 9 제목 */
  item9?: string;

  /**
   * 보기 개수
   * @format int32
   */
  itemCnt?: number;

  /** 질문내용 */
  question?: string;

  /**
   * 시퀀스
   * @format int64
   */
  seq?: number;
}

export interface ExamQuestionResponseDto {
  /** 정답 */
  answer?: string;

  /** 정답 설명 - 255자 */
  description?: string;

  /**
   * 시험 타입
   *  QUESTION_OBJ : 객관식
   *  QUESTION_SUBJ : 주관식
   */
  examQuestionTypeEnums?: "QUESTION_OBJ" | "QUESTION_SUBJ";

  /**
   * 시험 시퀀스
   * @format int64
   */
  examSeq?: number;

  /** 보기 1 제목 */
  item1?: string;

  /** 보기 10 제목 */
  item10?: string;

  /** 보기 2 제목 */
  item2?: string;

  /** 보기 3 제목 */
  item3?: string;

  /** 보기 4 제목 */
  item4?: string;

  /** 보기 5 제목 */
  item5?: string;

  /** 보기 6 제목 */
  item6?: string;

  /** 보기 7 제목 */
  item7?: string;

  /** 보기 8 제목 */
  item8?: string;

  /** 보기 9 제목 */
  item9?: string;

  /**
   * 보기 개수
   * @format int32
   */
  itemCnt?: number;

  /** 질문내용 */
  question?: string;

  /**
   * 시퀀스
   * @format int64
   */
  seq?: number;
}

export interface ExamQuestionSaveRequestDto {
  /** 정답 */
  answer?: string;

  /** 정답 설명 - 255자 */
  description?: string;

  /**
   * 시험 타입
   *  QUESTION_OBJ : 객관식
   *  QUESTION_SUBJ : 주관식
   */
  examQuestionTypeEnums?: "QUESTION_OBJ" | "QUESTION_SUBJ";

  /** 보기 1 제목 */
  item1?: string;

  /** 보기 10 제목 */
  item10?: string;

  /** 보기 2 제목 */
  item2?: string;

  /** 보기 3 제목 */
  item3?: string;

  /** 보기 4 제목 */
  item4?: string;

  /** 보기 5 제목 */
  item5?: string;

  /** 보기 6 제목 */
  item6?: string;

  /** 보기 7 제목 */
  item7?: string;

  /** 보기 8 제목 */
  item8?: string;

  /** 보기 9 제목 */
  item9?: string;

  /**
   * 보기 개수
   * @format int32
   */
  itemCnt?: number;

  /** 질문내용 */
  question?: string;
}

export interface ExamQuestionSaveResponseDto {
  /** 정답 */
  answer?: string;

  /** 정답 설명 - 255자 */
  description?: string;

  /**
   * 시험 타입
   *  QUESTION_OBJ : 객관식
   *  QUESTION_SUBJ : 주관식
   */
  examQuestionTypeEnums?: "QUESTION_OBJ" | "QUESTION_SUBJ";

  /**
   * 시험 시퀀스
   * @format int64
   */
  examSeq?: number;

  /** 보기 1 제목 */
  item1?: string;

  /** 보기 10 제목 */
  item10?: string;

  /** 보기 2 제목 */
  item2?: string;

  /** 보기 3 제목 */
  item3?: string;

  /** 보기 4 제목 */
  item4?: string;

  /** 보기 5 제목 */
  item5?: string;

  /** 보기 6 제목 */
  item6?: string;

  /** 보기 7 제목 */
  item7?: string;

  /** 보기 8 제목 */
  item8?: string;

  /** 보기 9 제목 */
  item9?: string;

  /**
   * 보기 개수
   * @format int32
   */
  itemCnt?: number;

  /** 질문내용 */
  question?: string;

  /**
   * 시퀀스
   * @format int64
   */
  seq?: number;
}

export interface ExamQuestionUpdateRequestDto {
  /** 정답 */
  answer?: string;

  /**
   * 콘텐츠 시퀀스
   * @format int64
   */
  contentSeq?: number;

  /** 정답 설명 - 255자 */
  description?: string;

  /**
   * 시험 객관식 결과 시퀀스
   * @format int64
   */
  examMultipleChoiceResultSeq?: number;

  /**
   * 시험 타입
   *  QUESTION_OBJ : 객관식
   *  QUESTION_SUBJ : 주관식
   */
  examQuestionTypeEnums?: "QUESTION_OBJ" | "QUESTION_SUBJ";

  /**
   * 시험 시퀀스
   * @format int64
   */
  examSeq?: number;

  /**
   * 시험 주관식 결과 시퀀스
   * @format int64
   */
  examSubjectiveResultSeq?: number;

  /** 보기 1 제목 */
  item1?: string;

  /** 보기 10 제목 */
  item10?: string;

  /** 보기 2 제목 */
  item2?: string;

  /** 보기 3 제목 */
  item3?: string;

  /** 보기 4 제목 */
  item4?: string;

  /** 보기 5 제목 */
  item5?: string;

  /** 보기 6 제목 */
  item6?: string;

  /** 보기 7 제목 */
  item7?: string;

  /** 보기 8 제목 */
  item8?: string;

  /** 보기 9 제목 */
  item9?: string;

  /**
   * 보기 개수
   * @format int32
   */
  itemCnt?: number;

  /** 질문내용 */
  question?: string;

  /**
   * 시퀀스
   * @format int64
   */
  seq?: number;
}

export interface ExamResponseDto {
  /**
   * 콘텐츠 시퀀스
   * @format int64
   * @example 0
   */
  contentSeq?: number;

  /**
   * 생성일
   * @format date-time
   */
  createdDtime?: string;

  /** 내용 - 마크다운 */
  examContent?: string;

  /**
   * 시험 이름
   * @example 예제 시험 이름명
   */
  examName?: string;

  /**
   * 시험 시간 (min 단위)
   * @format int32
   * @example 60
   */
  examTime?: number;

  /**
   * 시험 타입
   * EXAM_MIDDLE: 중간평가
   * EXAM_FINAL: 기말평가
   */
  examType?: "EXAM_MIDDLE" | "EXAM_FINAL";

  /**
   * 수정일
   * @format date-time
   */
  modifiedDtime?: string;

  /**
   * 내용 - 객관식 나오는 질문 개수
   * @format int32
   */
  objCnt?: number;

  /**
   * 내용 - 객관식 개당 점수
   * @format double
   */
  objScore?: number;

  /**
   * 시퀀스
   * @format int64
   */
  seq?: number;

  /**
   * 상태
   * @format int32
   */
  status?: number;

  /**
   * 내용 - 주관식 나오는 질문 개수
   * @format int32
   */
  subCnt?: number;

  /**
   * 내용 - 주관식 개당 점수
   * @format double
   */
  subScore?: number;
}

export interface ExamSaveRequestDto {
  /**
   * 콘텐츠 시퀀스
   * @format int64
   */
  contentSeq?: number;

  /** 내용 - 마크다운 */
  examContent?: string;

  /** 시험 이름 */
  examName?: string;

  /**
   * 시험 시간 (min 단위)
   * @format int32
   */
  examTime?: number;

  /**
   * 시험 타입
   * EXAM_MIDDLE: 중간평가
   * EXAM_FINAL: 기말평가
   */
  examType?: "EXAM_MIDDLE" | "EXAM_FINAL";

  /**
   * 객관식 개당 점수
   * @format double
   */
  objScore?: number;

  /**
   * 상태 1 또는 -1
   * @format int32
   */
  status?: number;

  /**
   * 주관식 개당 점수
   * @format double
   */
  subScore?: number;
}

export interface ExamSubjectiveResult {
  /** @format int32 */
  choice?: number;
  courseUser?: CourseUser;

  /** @format date-time */
  createdDtime?: string;
  examQuestion?: ExamQuestion;
  feedback?: string;

  /** @format date-time */
  modifiedDtime?: string;

  /** @format double */
  score?: number;

  /** @format int64 */
  seq?: number;

  /** @format int32 */
  status?: number;
  temporaryYn?: string;
}

export interface ExamSubjectiveResultRequestSaveDto {
  /**
   * 선택 답안
   * @format int32
   */
  choice?: number;

  /**
   * 유저-과정 시퀀스
   * @format int64
   */
  courseUserSeq?: number;

  /**
   * 시험 문제 시퀀스
   * @format int64
   */
  examQuestionSeq?: number;

  /** 평가 의견 */
  feedback?: string;

  /**
   * 점수
   * @format double
   */
  score?: number;

  /** 임시 저장 상태 */
  temporaryYn?: string;
}

export interface ExamSubjectiveResultResponseDto {
  /**
   * 선택 답안
   * @format int32
   */
  choice?: number;

  /**
   * 유저-과정 시퀀스
   * @format int64
   */
  courseUserSeq?: number;

  /**
   * 생성일
   * @format date-time
   */
  createdDtime?: string;

  /**
   * 시험 문제 시퀀스
   * @format int64
   */
  examQuestionSeq?: number;

  /** 평가 의견 */
  feedback?: string;

  /**
   * 수정일
   * @format date-time
   */
  modifiedDtime?: string;

  /**
   * 점수
   * @format double
   */
  score?: number;

  /**
   * 시퀀스
   * @format int64
   */
  seq?: number;

  /**
   * 상태
   * @format int32
   */
  status?: number;

  /** 임시 저장 상태 */
  temporaryYn?: string;
}

export interface ExamTestResponseDto {
  /** 정답 */
  answer?: string;

  /** 정답 설명 - 255자 */
  description?: string;

  /**
   * 시험 타입
   *  QUESTION_OBJ : 객관식
   *  QUESTION_SUBJ : 주관식
   */
  examQuestionTypeEnums?: "QUESTION_OBJ" | "QUESTION_SUBJ";

  /**
   * 시험 시퀀스
   * @format int64
   */
  examSeq?: number;

  /** 보기 1 제목 */
  item1?: string;

  /** 보기 10 제목 */
  item10?: string;

  /** 보기 2 제목 */
  item2?: string;

  /** 보기 3 제목 */
  item3?: string;

  /** 보기 4 제목 */
  item4?: string;

  /** 보기 5 제목 */
  item5?: string;

  /** 보기 6 제목 */
  item6?: string;

  /** 보기 7 제목 */
  item7?: string;

  /** 보기 8 제목 */
  item8?: string;

  /** 보기 9 제목 */
  item9?: string;

  /**
   * 보기 개수
   * @format int32
   */
  itemCnt?: number;

  /** 질문내용 */
  question?: string;

  /**
   * 시퀀스
   * @format int64
   */
  seq?: number;
}

export interface ExamTestTemporaryResponseDto {
  /** 정답 */
  answer?: string;

  /**
   * 객관식 선택 답안
   * @format int32
   */
  choice?: number;

  /** 정답 설명 - 255자 */
  description?: string;

  /**
   * 시험 타입
   *  QUESTION_OBJ : 객관식
   *  QUESTION_SUBJ : 주관식
   */
  examQuestionTypeEnums?: "QUESTION_OBJ" | "QUESTION_SUBJ";

  /**
   * 시험 시퀀스
   * @format int64
   */
  examSeq?: number;

  /** 주관식 피드백 */
  feedback?: string;

  /** 보기 1 제목 */
  item1?: string;

  /** 보기 10 제목 */
  item10?: string;

  /** 보기 2 제목 */
  item2?: string;

  /** 보기 3 제목 */
  item3?: string;

  /** 보기 4 제목 */
  item4?: string;

  /** 보기 5 제목 */
  item5?: string;

  /** 보기 6 제목 */
  item6?: string;

  /** 보기 7 제목 */
  item7?: string;

  /** 보기 8 제목 */
  item8?: string;

  /** 보기 9 제목 */
  item9?: string;

  /**
   * 보기 개수
   * @format int32
   */
  itemCnt?: number;

  /** 질문내용 */
  question?: string;

  /**
   * 시퀀스
   * @format int64
   */
  seq?: number;
}

export interface ExamUpdateRequestDto {
  /** 내용 - 마크다운 */
  examContent?: string;

  /** 시험 이름 */
  examName?: string;

  /**
   * 시험 시간 (min 단위)
   * @format int32
   */
  examTime?: number;

  /**
   * 시험 타입
   * EXAM_MIDDLE: 중간평가
   * EXAM_FINAL: 기말평가
   */
  examType?: "EXAM_MIDDLE" | "EXAM_FINAL";

  /**
   * 객관식 개당 개수
   * @format int32
   */
  objCnt?: number;

  /**
   * 객관식 개당 점수
   * @format double
   */
  objScore?: number;

  /**
   * 상태 1 또는 -1
   * @format int32
   */
  status?: number;

  /**
   * 주관식 개당 개수
   * @format int32
   */
  subCnt?: number;

  /**
   * 주관식 개당 점수
   * @format double
   */
  subScore?: number;
}

export interface ExamUser {
  /** @format date-time */
  confirmDtime?: string;

  /** @format int64 */
  confirmUserSeq?: number;
  confirmYn?: string;
  courseUser?: CourseUser;

  /** @format date-time */
  createdDtime?: string;
  feedback?: string;

  /** @format date-time */
  modifiedDtime?: string;
  regTutorIp?: string;
  regUserIp?: string;

  /** @format int64 */
  seq?: number;

  /** @format int32 */
  status?: number;

  /** @format date-time */
  submitDtime?: string;
  submitYn?: string;

  /** @format double */
  totalScore?: number;
}

export interface ExamUserRequestDto {
  /**
   * 채점날짜
   * @format date-time
   */
  confirmDtime?: string;

  /**
   * 채점한 사람
   * @format int64
   */
  confirmUserSeq?: number;

  /** 채점 여부 */
  confirmYn?: string;

  /**
   * 시험 유저 채점 시퀀스
   * @format int64
   */
  examUserSeq?: number;

  /** 내용 마크다운 */
  feedback?: string;

  /** 채점 유저 IP */
  regTutorIp?: string;

  /** 유저 IP */
  regUserIp?: string;

  /**
   * 제출날짜
   * @format date-time
   */
  submitDtime?: string;

  /** 제출 여부 */
  submitYn?: string;

  /**
   * 총 점수
   * @format double
   */
  totalScore?: number;
}

export interface ExamUserResponseDto {
  /**
   * 채점날짜
   * @format date-time
   */
  confirmDtime?: string;

  /**
   * 채점한 사람
   * @format int64
   */
  confirmUserSeq?: number;

  /** 채점 여부 */
  confirmYn?: string;

  /**
   * 생성 날짜
   * @format date-time
   */
  createdDtime?: string;

  /** 내용 마크다운 */
  feedback?: string;

  /**
   * 수정 날짜
   * @format date-time
   */
  modifiedDtime?: string;

  /** 유저 IP */
  regUserIp?: string;

  /**
   * 시퀀스
   * @format int64
   */
  seq?: number;

  /**
   * 제출날짜
   * @format date-time
   */
  submitDtime?: string;

  /** 제출 여부 */
  submitYn?: string;

  /**
   * 총 점수
   * @format double
   */
  totalScore?: number;
}

export interface ExampleHtmlSaveRequestDto {
  html?: string;
}

export interface ExampleMultipartCompleteResponseDto {
  result?: CompleteMultipartUploadResult;
}

export interface ExampleMultipartEtagResponseDto {
  /** eTag */
  partETag?: PartETag;
}

export interface ExampleMultipartResponseDto {
  /** 인코딩된 파일 이름 */
  encFileName?: string;

  /** 업로드 요청 키 */
  uploadRequestKey?: string;
}

export interface ExampleResponseDto {
  /** @format int64 */
  seq?: number;
  title?: string;
}

export interface ExampleSaveRequestDto {
  title?: string;
}

export interface File {
  /** @format date-time */
  createdDtime?: string;

  /** @format int32 */
  downloadCnt?: number;
  fileName?: string;
  filePath?: string;

  /** @format int64 */
  fileSize?: number;
  fileType?: string;

  /** @format date-time */
  modifiedDtime?: string;
  realFileName?: string;

  /** @format int64 */
  seq?: number;

  /** @format int32 */
  status?: number;
}

export interface FileMultipartCompleteRequestDto {
  /**
   * 업로드 타입에 대한 데이터(레슨 등) 시퀀스
   * @format int64
   */
  dataSeq?: number;

  /** 경로와 인코딩된 파일명 */
  encFileName?: string;
  etagList?: CustomPartETagsDto[];

  /** 오리지널 파일명 */
  fileOriginalName?: string;

  /** 업로드 키 */
  uploadRequestKey?: string;

  /** 업로드 타입 Enum */
  uploadType?:
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
}

export interface FileMultipartCreateRequestDto {
  /** 파일 타입 */
  fileContentType?: string;

  /** 파일 이름 */
  fileOriginalName?: string;

  /** 업로드 타입 Enum */
  uploadType?:
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
}

export interface FileMultipartCreateResponseDto {
  /** 인코딩된 파일 이름 */
  encFileName?: string;

  /** 업로드 요청 키 */
  uploadRequestKey?: string;
}

export interface FileMultipartUploadResponseDto {
  /** 개별 eTag */
  partETag?: PartETag;
}

export interface FileRequestDto {
  /**
   * 파일 다운로드 수
   * @format int32
   */
  downloadCnt?: number;

  /** 파일 이름 */
  name?: string;

  /** S3 파일 경로 */
  path?: string;

  /** S3 파일명 */
  realName?: string;

  /**
   * 파일 시퀀스
   * @format int64
   */
  seq?: number;

  /**
   * S3 파일 사이즈
   * @format int64
   */
  size?: number;

  /** S3 파일 타입 */
  type?: string;
}

export interface FileResponseDto {
  /**
   * 파일 다운로드 수
   * @format int32
   */
  downloadCnt?: number;

  /** 파일 이름 */
  name?: string;

  /** S3 파일 경로 */
  path?: string;

  /** S3 파일명 */
  realName?: string;

  /**
   * 파일 시퀀스
   * @format int64
   */
  seq?: number;

  /**
   * S3 파일 사이즈
   * @format int64
   */
  size?: number;

  /** S3 파일 타입 */
  type?: string;
}

export interface FileSeqListRequestDto {
  fileSeqList?: number[];
}

export interface ForumCommentResponseDto {
  /** 토론 댓글 내용 */
  content?: string;

  /**
   * 생성일
   * @format date-time
   */
  createdDtime?: string;

  /**
   * 게시글 시퀀스
   * @format int64
   */
  forumSeq?: number;

  /**
   * 수정일
   * @format date-time
   */
  modifiedDtime?: string;

  /**
   * 부모 댓글 시퀀스 (대댓글일 시)
   * @format int64
   */
  reference?: number;

  /**
   * 시퀀스
   * @format int64
   */
  seq?: number;

  /**
   * 삭제 여부
   * @format int32
   */
  status?: number;

  /**
   * 유저 시퀀스
   * @format int64
   */
  userSeq?: number;

  /** 작성자 아이디 */
  username?: string;
}

export interface ForumCommentSaveRequestDto {
  /** 토론 댓글 내용 */
  content?: string;

  /**
   * 게시글 시퀀스
   * @format int64
   */
  forumSeq?: number;

  /**
   * 부모 댓글 시퀀스 (대댓글일 시)
   * @format int64
   */
  reference?: number;
}

export interface ForumCommentUpdateRequestDto {
  /** 토론 댓글 내용 */
  content?: string;
}

export interface ForumDetailResponseDto {
  /** 토론 내용 */
  content?: string;

  /**
   * 과정 시퀀스
   * @format int64
   */
  courseSeq?: number;

  /**
   * 생성일
   * @format date-time
   */
  createdDtime?: string;

  /**
   * 수정일
   * @format date-time
   */
  modifiedDtime?: string;

  /** 생성자 아이피 */
  regIp?: string;

  /** S3 파일 */
  s3Files?: FileResponseDto[];

  /**
   * 시퀀스
   * @format int64
   */
  seq?: number;

  /**
   * 상태
   * @format int32
   */
  status?: number;

  /** 토론 제목 */
  subject?: string;

  /** 수정자 아이피 */
  updIp?: string;

  /**
   * 유저 시퀀스
   * @format int64
   */
  userSeq?: number;
}

export interface ForumResponseDto {
  /**
   * 과정 시퀀스
   * @format int64
   */
  courseSeq?: number;

  /**
   * 생성일
   * @format date-time
   */
  createdDtime?: string;

  /**
   * 수정일
   * @format date-time
   */
  modifiedDtime?: string;

  /** 생성자 아이피 */
  regIp?: string;

  /** s3 파일 */
  s3Files?: FileResponseDto[];

  /**
   * 시퀀스
   * @format int64
   */
  seq?: number;

  /**
   * 상태
   * @format int32
   */
  status?: number;

  /** 토론 제목 */
  subject?: string;

  /** 수정자 아이피 */
  updIp?: string;

  /**
   * 유저 시퀀스
   * @format int64
   */
  userSeq?: number;
}

export interface ForumSaveRequestDto {
  /** 토론 내용 */
  content?: string;

  /**
   * 과정 시퀀스
   * @format int64
   */
  courseSeq?: number;

  /**
   * 상태
   * @format int32
   */
  status?: number;

  /** 토론 제목 */
  subject?: string;
}

export interface ForumUpdateRequestDto {
  /** 토론 내용 */
  content?: string;

  /**
   * 과정 시퀀스
   * @format int64
   */
  courseSeq?: number;

  /** S3 파일 */
  s3Files?: FileRequestDto[];

  /**
   * 상태
   * @format int32
   */
  status?: number;

  /** 토론 제목 */
  subject?: string;
}

export interface HomeworkDetailResponseDto {
  /** 모범답안 */
  bestAnswer?: string;

  /** 과제 내용 마크다운 */
  content?: string;

  /**
   * 콘텐츠 시퀀스
   * @format int64
   */
  contentSeq?: number;

  /**
   * 생성일
   * @format date-time
   */
  createdDtime?: string;

  /** 점수규칙 */
  markingRole?: string;

  /**
   * 수정일
   * @format date-time
   */
  modifiedDtime?: string;

  /** S3 파일 */
  s3Files?: FileResponseDto[];

  /**
   * 시퀀스
   * @format int64
   */
  seq?: number;

  /**
   * 사용 여부
   * @format int32
   */
  status?: number;

  /** 과제 이름 */
  subject?: string;
}

export interface HomeworkResponseDto {
  /** 모범답안 */
  bestAnswer?: string;

  /**
   * 콘텐츠 시퀀스
   * @format int64
   */
  contentSeq?: number;

  /**
   * 생성일
   * @format date-time
   */
  createdDtime?: string;

  /** 점수규칙 */
  markingRole?: string;

  /**
   * 수정일
   * @format date-time
   */
  modifiedDtime?: string;

  /** S3 파일 */
  s3Files?: FileResponseDto[];

  /**
   * 시퀀스
   * @format int64
   */
  seq?: number;

  /**
   * 사용 여부
   * @format int32
   */
  status?: number;

  /** 과제 이름 */
  subject?: string;
}

export interface HomeworkSaveRequestDto {
  /** 모범 답안 */
  bestAnswer?: string;

  /** 과제 내용 마크다운 */
  content?: string;

  /**
   * 콘텐츠 시퀀스
   * @format int64
   */
  contentSeq?: number;

  /** 점수 규칙 */
  markingRole?: string;

  /**
   * 사용 상태
   * @format int32
   */
  status?: 1 | -1;

  /** 과제 이름 */
  subject?: string;
}

export interface HomeworkUpdateRequestDto {
  /** 모범 답안 */
  bestAnswer?: string;

  /** 과제 내용 마크다운 */
  content?: string;

  /**
   * 콘텐츠 시퀀스
   * @format int64
   */
  contentSeq?: number;

  /** 점수 규칙 */
  markingRole?: string;

  /** S3 파일 */
  s3Files?: FileRequestDto[];

  /**
   * 사용 상태
   * @format int32
   */
  status?: 1 | -1;

  /** 과제 이름 */
  subject?: string;
}

export type InputStream = object;

export interface LearningMaterialResponseDto {
  /** 내용 */
  content?: string;

  /**
   * 생성일
   * @format date-time
   */
  createdDtime?: string;

  /** 자료 상세 타입 -> 연령별교수학습 및 타기관자료학습만 해당 */
  materialSubType?: "TYPE_CHILDREN" | "TYPE_TEENAGER" | "TYPE_ELDERLY" | "TYPE_SELF_DRIVING";

  /** 자료 타입 */
  materialType?: "TYPE_BY_AGE" | "TYPE_EDUCATIONAL" | "TYPE_VIDEO" | "TYPE_OTHER_ORGAN";

  /**
   * 수정일
   * @format date-time
   */
  modifiedDtime?: string;

  /** 영상 출처 -> 교육영상 유튜브 링크만 해당 */
  origin?: string;

  /** S3 파일 정보 */
  s3Files?: FileResponseDto[];

  /**
   * 시퀀스
   * @format int64
   */
  seq?: number;

  /**
   * 상태
   * @format int32
   */
  status?: 1 | -1;

  /** 제목 */
  title?: string;
}

export interface LearningMaterialSaveRequestDto {
  /** 내용 */
  content?: string;

  /** 자료 상세 타입 -> 연령별교수학습 및 타기관자료학습만 해당 */
  materialSubType?: "TYPE_CHILDREN" | "TYPE_TEENAGER" | "TYPE_ELDERLY" | "TYPE_SELF_DRIVING";

  /** 자료 타입 */
  materialType?: "TYPE_BY_AGE" | "TYPE_EDUCATIONAL" | "TYPE_VIDEO" | "TYPE_OTHER_ORGAN";

  /** 영상 출처 -> 교육영상 유튜브 링크만 해당 */
  origin?: string;

  /**
   * 상태
   * @format int32
   */
  status?: 1 | -1;

  /** 제목 */
  title?: string;
}

export interface LearningMaterialUpdateRequestDto {
  /** 내용 */
  content?: string;

  /** 자료 상세 타입 -> 연령별교수학습 및 타기관자료학습만 해당 */
  materialSubType?: "TYPE_CHILDREN" | "TYPE_TEENAGER" | "TYPE_ELDERLY" | "TYPE_SELF_DRIVING";

  /** 자료 타입 */
  materialType?: "TYPE_BY_AGE" | "TYPE_EDUCATIONAL" | "TYPE_VIDEO" | "TYPE_OTHER_ORGAN";

  /** 영상 출처 -> 교육영상 유튜브 링크만 해당 */
  origin?: string;

  /**
   * 상태
   * @format int32
   */
  status?: 1 | -1;

  /** 제목 */
  title?: string;
}

export interface Lesson {
  /** @format int32 */
  chapter?: number;

  /** @format double */
  completeTime?: number;

  /** @format int64 */
  contentSeq?: number;
  contentType?: "CONTENT_HTML" | "CONTENT_MP4" | "CONTENT_EXTERNAL";

  /** @format date-time */
  createdDtime?: string;
  files?: File[];
  lessonNm?: string;

  /** @format int32 */
  min?: number;
  mobileUrl?: string;

  /** @format date-time */
  modifiedDtime?: string;
  pcUrl?: string;

  /** @format int32 */
  sec?: number;

  /** @format int64 */
  seq?: number;

  /** @format int32 */
  status?: number;

  /** @format int32 */
  totalPage?: number;

  /** @format double */
  totalTime?: number;
}

export interface LessonDetailClientResponseDto {
  /**
   * 차시 (1차시, 2차시 ... N차시)
   * @format int32
   * @example 3
   */
  chapter?: number;

  /**
   * 수료 시간 sec 단위
   * @format double
   * @example 1532
   */
  completeTime?: number;

  /** 유저 수강 완료 여부 */
  completedYn?: "Y" | "N";

  /** 레슨 타입 */
  contentType?: "CONTENT_HTML" | "CONTENT_MP4" | "CONTENT_EXTERNAL";

  /**
   * 생성일시
   * @format date-time
   */
  createdDtime?: string;

  /** 레슨 이름 */
  lessonNm?: string;

  /**
   * 총 시간 분 단위 파트
   * @format int32
   */
  min?: number;

  /**
   * 수정일시
   * @format date-time
   */
  modifiedDtime?: string;

  /**
   * 차시 진도율
   * @format double
   */
  progressRatio?: number;

  /** S3 파일 */
  s3Files?: FileResponseDto[];

  /**
   * 총 시간 초 단위 파트
   * @format int32
   */
  sec?: number;

  /**
   * 레슨 시퀀스
   * @format int64
   */
  seq?: number;

  /**
   * 상태 -1->중지 1->사용
   * @format int32
   */
  status?: number;

  /**
   * 마지막 학습 시간
   * @format double
   */
  studyLastTime?: number;

  /**
   * 총 시간 sec 단위
   * @format double
   * @example 1532
   */
  totalTime?: number;
}

export interface LessonDetailResponseDto {
  /**
   * 차시 (1차시, 2차시 ... N차시)
   * @format int32
   * @example 3
   */
  chapter?: number;

  /**
   * 수료 시간 sec 단위
   * @format double
   * @example 1532
   */
  completeTime?: number;

  /**
   * 콘텐트 높이
   * @format int32
   * @example 720
   */
  contentHeight?: number;

  /**
   * 콘텐트 시퀀스
   * @format int64
   */
  contentSeq?: number;

  /** 레슨 타입 */
  contentType?: "CONTENT_HTML" | "CONTENT_MP4" | "CONTENT_EXTERNAL";

  /**
   * 콘텐트 폭
   * @format int32
   * @example 1280
   */
  contentWidth?: number;

  /**
   * 생성일시
   * @format date-time
   */
  createdDtime?: string;

  /** 파일 이름 */
  fileName?: string;

  /** 레슨 이름 */
  lessonNm?: string;

  /**
   * 총 시간 분 단위 파트
   * @format int32
   */
  min?: number;

  /** 모바일 경로 */
  mobileUrl?: string;

  /**
   * 수정일시
   * @format date-time
   */
  modifiedDtime?: string;

  /** PC 경로 */
  pcUrl?: string;

  /** S3 파일 */
  s3Files?: FileResponseDto[];

  /**
   * 총 시간 초 단위 파트
   * @format int32
   */
  sec?: number;

  /**
   * 레슨 시퀀스
   * @format int64
   */
  seq?: number;

  /**
   * 상태 -1->중지 1->사용
   * @format int32
   */
  status?: number;

  /**
   * 총 페이지
   * @format int32
   * @example 12
   */
  totalPage?: number;

  /**
   * 총 시간 sec 단위
   * @format double
   * @example 1532
   */
  totalTime?: number;
}

export interface LessonResponseDto {
  /**
   * 정렬 (1차시, 2차시 ... N차시)
   * @format int32
   * @example 3
   */
  chapter?: number;

  /**
   * 수료 시간 sec 단위
   * @format double
   * @example 1532
   */
  completeTime?: number;

  /**
   * 콘텐트 시퀀스
   * @format int64
   */
  contentSeq?: number;

  /** 레슨 타입 */
  contentType?: "CONTENT_HTML" | "CONTENT_MP4" | "CONTENT_EXTERNAL";

  /**
   * 생성일시
   * @format date-time
   */
  createdDtime?: string;

  /** 파일 이름 */
  fileName?: string;

  /** 레슨 이름 */
  lessonNm?: string;

  /**
   * 총 시간 분 단위 파트
   * @format int32
   */
  min?: number;

  /** 모바일 경로 */
  mobileUrl?: string;

  /**
   * 수정일시
   * @format date-time
   */
  modifiedDtime?: string;

  /** PC 경로 */
  pcUrl?: string;

  /** S3 파일 */
  s3Files?: FileResponseDto[];

  /**
   * 총 시간 초 단위 파트
   * @format int32
   */
  sec?: number;

  /**
   * 레슨 시퀀스
   * @format int64
   */
  seq?: number;

  /**
   * 상태 -1->중지 1->사용
   * @format int32
   */
  status?: number;

  /**
   * 총 페이지
   * @format int32
   * @example 12
   */
  totalPage?: number;

  /**
   * 총 시간 sec 단위
   * @format double
   * @example 1532
   */
  totalTime?: number;
}

export interface LessonSaveRequestDto {
  /**
   * 정렬 (1차시, 2차시 ... N차시)
   * @format int32
   * @example 3
   */
  chapter?: number;

  /**
   * 수료 시간 sec 단위
   * @format double
   * @example 1532
   */
  completeTime?: number;

  /**
   * 콘텐트 시퀀스
   * @format int64
   */
  contentSeq?: number;

  /** 레슨 타입 */
  contentType?: "CONTENT_HTML" | "CONTENT_MP4" | "CONTENT_EXTERNAL";

  /** 레슨 이름 */
  lessonNm?: string;

  /**
   * 총 시간 분 단위 파트
   * @format int32
   */
  min?: number;

  /** 모바일 경로 */
  mobileUrl?: string;

  /** PC 경로 */
  pcUrl?: string;

  /**
   * 총 시간 초 단위 파트
   * @format int32
   */
  sec?: number;

  /**
   * 총 페이지
   * @format int32
   * @example 12
   */
  totalPage?: number;

  /**
   * 총 시간 sec 단위
   * @format double
   * @example 1532
   */
  totalTime?: number;
}

export interface LessonUpdateRequestDto {
  /**
   * 차시 (1차시, 2차시 ... N차시)
   * @format int32
   * @example 3
   */
  chapter?: number;

  /**
   * 수료 시간 sec 단위
   * @format double
   * @example 1532
   */
  completeTime?: number;

  /** 레슨 타입 */
  contentType?: "CONTENT_HTML" | "CONTENT_MP4" | "CONTENT_EXTERNAL";
  file?: File[];

  /** 레슨 이름 */
  lessonNm?: string;

  /**
   * 총 시간 분 단위 파트
   * @format int32
   */
  min?: number;

  /** S3 파일 */
  s3Files?: FileRequestDto[];

  /**
   * 총 시간 초 단위 파트
   * @format int32
   */
  sec?: number;

  /**
   * 사용 여부 -1 또는 1
   * @format int32
   * @example 1
   */
  status?: number;

  /**
   * 총 페이지
   * @format int32
   * @example 12
   */
  totalPage?: number;

  /**
   * 총 시간 sec 단위
   * @format double
   * @example 1532
   */
  totalTime?: number;
}

export interface LibraryDetailResponseDto {
  /** 강의 자료 내용 마크다운 */
  content?: string;

  /**
   * 과정 시퀀스
   * @format int64
   */
  courseSeq?: number;

  /**
   * 생성일
   * @format date-time
   */
  createdDtime?: string;

  /**
   * 조회수
   * @format int32
   */
  hit?: number;

  /**
   * 수정일
   * @format date-time
   */
  modifiedDtime?: string;

  /** 작성자 IP */
  regIp?: string;

  /** S3 파일 */
  s3Files?: FileResponseDto[];

  /**
   * 시퀀스
   * @format int64
   */
  seq?: number;

  /**
   * 상태
   * @format int32
   */
  status?: number;

  /** 강의 자료 제목 */
  subject?: string;

  /** 수정자 IP */
  updIp?: string;

  /**
   * 유저 시퀀스
   * @format int64
   */
  userSeq?: number;
}

export interface LibraryResponseDto {
  /**
   * 과정 시퀀스
   * @format int64
   */
  courseSeq?: number;

  /**
   * 생성일
   * @format date-time
   */
  createdDtime?: string;

  /**
   * 조회수
   * @format int32
   */
  hit?: number;

  /**
   * 수정일
   * @format date-time
   */
  modifiedDtime?: string;

  /** 작성자 IP */
  regIp?: string;

  /** S3 파일 */
  s3Files?: FileResponseDto[];

  /**
   * 시퀀스
   * @format int64
   */
  seq?: number;

  /**
   * 상태
   * @format int32
   */
  status?: number;

  /** 강의 자료 제목 */
  subject?: string;

  /** 수정자 IP */
  updIp?: string;

  /**
   * 유저 시퀀스
   * @format int64
   */
  userSeq?: number;
}

export interface LibrarySaveRequestDto {
  /** 강의 자료 내용 마크다운 */
  content?: string;

  /**
   * 과정 시퀀스
   * @format int64
   */
  courseSeq?: number;

  /**
   * 상태
   * @format int32
   */
  status?: number;

  /** 강의 자료 제목 */
  subject?: string;
}

export interface LibraryUpdateRequestDto {
  /** 강의 자료 내용 마크다운 */
  content?: string;

  /** S3 파일 */
  s3Files?: FileRequestDto[];

  /** 강의 자료 제목 */
  subject?: string;
}

export interface MainDisplayResponseDto {
  /** 버튼 타입 Enum */
  mainDisplayType?:
    | "EDUCATION_TRANSPORT_WORKER"
    | "EDUCATION_GROUND_BUS_DRIVER"
    | "EDUCATION_PROVINCIAL_TRAFFIC_SAFETY";

  /**
   * 시퀀스
   * @format int64
   */
  seq?: number;

  /**
   * 상태 여부
   * @format int32
   */
  status?: 1 | -1;
}

export interface MainDisplayUpdateRequestDto {
  /** 버튼 타입 Enum */
  mainDisplayType?:
    | "EDUCATION_TRANSPORT_WORKER"
    | "EDUCATION_GROUND_BUS_DRIVER"
    | "EDUCATION_PROVINCIAL_TRAFFIC_SAFETY";

  /**
   * 시퀀스
   * @format int64
   */
  seq?: number;

  /**
   * 상태 여부
   * @format int32
   */
  status?: 1 | -1;
}

export interface MainDisplayUpdateResponseDto {
  /** 버튼 타입 Enum */
  mainDisplayType?:
    | "EDUCATION_TRANSPORT_WORKER"
    | "EDUCATION_GROUND_BUS_DRIVER"
    | "EDUCATION_PROVINCIAL_TRAFFIC_SAFETY";

  /**
   * 상태 여부
   * @format int32
   */
  status?: 1 | -1;
}

export interface MultipartUpload {
  /** @format date-time */
  initiated?: string;
  initiator?: Owner;
  key?: string;
  owner?: Owner;
  storageClass?: string;
  uploadId?: string;
}

export interface MultipartUploadListing {
  bucketName?: string;
  commonPrefixes?: string[];
  delimiter?: string;
  encodingType?: string;
  keyMarker?: string;

  /** @format int32 */
  maxUploads?: number;
  multipartUploads?: MultipartUpload[];
  nextKeyMarker?: string;
  nextUploadIdMarker?: string;
  prefix?: string;
  truncated?: boolean;
  uploadIdMarker?: string;
}

export interface Owner {
  displayName?: string;
  id?: string;
}

export interface PartETag {
  etag?: string;

  /** @format int32 */
  partNumber?: number;
}

export interface PostCommentResponseDto {
  /** 댓글 내용 */
  content?: string;

  /**
   * 생성일
   * @format date-time
   */
  createdDtime?: string;

  /**
   * 수정일
   * @format date-time
   */
  modifiedDtime?: string;

  /**
   * 게시글 시퀀스
   * @format int64
   */
  postSeq?: number;

  /**
   * 부모 댓글 시퀀스 (대댓글일 시)
   * @format int64
   */
  reference?: number;

  /**
   * 시퀀스
   * @format int64
   */
  seq?: number;

  /**
   * 삭제 여부
   * @format int32
   */
  status?: number;

  /**
   * 유저 시퀀스
   * @format int64
   */
  userSeq?: number;

  /** 작성자 아이디 */
  username?: string;
}

export interface PostCommentSaveRequestDto {
  /** 댓글 내용 */
  content?: string;

  /**
   * 게시글 시퀀스
   * @format int64
   */
  postSeq?: number;

  /**
   * 부모 댓글 시퀀스 (대댓글일 시)
   * @format int64
   */
  reference?: number;
}

export interface PostCommentUpdateRequestDto {
  /** 게시글 댓글 내용 */
  content?: string;
}

export interface PostDetailResponseDto {
  /** 타입 구분 */
  boardType?:
    | "TYPE_NOTICE"
    | "TYPE_REVIEW"
    | "TYPE_FAQ"
    | "TYPE_GUIDE_AUTH"
    | "TYPE_GUIDE_EDU_REGI"
    | "TYPE_GUIDE_EDU_LEARNING";

  /** 내용 */
  content?: string;

  /**
   * 과정 시퀀스
   * @format int64
   */
  courseSeq?: number;

  /**
   * 생성일
   * @format date-time
   */
  createdDtime?: string;

  /**
   * 조회수
   * @format int32
   */
  hit?: number;

  /**
   * 수정일
   * @format date-time
   */
  modifiedDtime?: string;

  /** 공지 상단 노출 여부 - 공지만 해당, 이외는 N */
  noticeYn?: string;

  /** 공개여부 */
  publicYn?: string;

  /** S3 파일 */
  s3Files?: FileResponseDto[];

  /**
   * 시퀀스
   * @format int64
   */
  seq?: number;

  /**
   * 삭제 여부
   * @format int32
   */
  status?: 1 | -1;

  /** 제목 */
  subject?: string;

  /**
   * 유저 시퀀스
   * @format int64
   */
  userSeq?: number;

  /** 유저 아이디 */
  username?: string;
}

export interface PostResponseDto {
  /** 타입 구분 */
  boardType?:
    | "TYPE_NOTICE"
    | "TYPE_REVIEW"
    | "TYPE_FAQ"
    | "TYPE_GUIDE_AUTH"
    | "TYPE_GUIDE_EDU_REGI"
    | "TYPE_GUIDE_EDU_LEARNING";

  /** 내용 */
  content?: string;

  /**
   * 과정 시퀀스
   * @format int64
   */
  courseSeq?: number;

  /**
   * 생성일
   * @format date-time
   */
  createdDtime?: string;

  /**
   * 조회수
   * @format int32
   */
  hit?: number;

  /**
   * 수정일
   * @format date-time
   */
  modifiedDtime?: string;

  /** 공지 상단 노출 여부 - 공지만 해당, 이외는 N */
  noticeYn?: string;

  /** 공개여부 */
  publicYn?: string;

  /** S3 파일 */
  s3Files?: FileResponseDto[];

  /**
   * 시퀀스
   * @format int64
   */
  seq?: number;

  /**
   * 삭제 여부
   * @format int32
   */
  status?: 1 | -1;

  /** 제목 */
  subject?: string;

  /**
   * 유저 시퀀스
   * @format int64
   */
  userSeq?: number;

  /** 유저 아이디 */
  username?: string;
}

export interface PostSaveRequestDto {
  /** 타입 구분 */
  boardType?:
    | "TYPE_NOTICE"
    | "TYPE_REVIEW"
    | "TYPE_FAQ"
    | "TYPE_GUIDE_AUTH"
    | "TYPE_GUIDE_EDU_REGI"
    | "TYPE_GUIDE_EDU_LEARNING";

  /** 내용 */
  content?: string;

  /**
   * 과정 시퀀스, 0이면 과정 없음(0->전역적으로 보여져야하는 게시글만 해당, 공지, 자주묻는 질문, 가이드 등)
   * @format int64
   */
  courseSeq?: number;

  /** 공지 상단 노출 여부 - 공지만 해당, 이외는 N */
  noticeYn?: "Y" | "N";

  /** 공개여부 */
  publicYn?: "Y" | "N";

  /** 제목 */
  subject?: string;
}

export interface PostUpdateRequestDto {
  /** 내용 */
  content?: string;

  /** 공지 상단 노출 여부 - 공지만 해당, 이외는 N */
  noticeYn?: "Y" | "N";

  /** 공개 여부 */
  publicYn?: "Y" | "N";

  /** S3 파일 */
  s3Files?: FileRequestDto[];

  /** 제목 */
  subject?: string;
}

export interface QnaAnswerResponseDto {
  /** 답변 내용 */
  content?: string;

  /**
   * 생성일
   * @format date-time
   */
  createdDtime?: string;

  /**
   * 수정일
   * @format date-time
   */
  modifiedDtime?: string;

  /** S3 파일 리스트 */
  s3Files?: FileResponseDto[];

  /**
   * 시퀀스
   * @format int64
   */
  seq?: number;

  /**
   * 상태
   * @format int32
   */
  status?: number;
}

export interface QnaAnswerSaveRequestDto {
  /**
   * 답변 내용
   * @example 답변 내용입니다.
   */
  content?: string;
}

export interface QnaResponseDto {
  /** 답변 여부 */
  answeredYn?: string;

  /** 문의 내용 */
  content?: string;

  /**
   * 생성일
   * @format date-time
   */
  createdDtime?: string;

  /**
   * 수정일
   * @format date-time
   */
  modifiedDtime?: string;

  /** 답변 내용 */
  qnaAnswer?: QnaAnswerResponseDto;

  /** S3 파일 리스트 */
  s3Files?: FileResponseDto[];

  /**
   * 시퀀스
   * @format int64
   */
  seq?: number;

  /**
   * 상태
   * @format int32
   */
  status?: number;

  /** 문의 제목 */
  title?: string;

  /** 문의 유형 Enum */
  type?: "TYPE_SIGNUP_OR_SIGNIN" | "TYPE_EDU_OR_COMPLETE" | "TYPE_WEB_OR_APP" | "TYPE_ETC";

  /**
   * 유저 시퀀스
   * @format int64
   */
  userSeq?: number;
}

export interface QnaSaveRequestDto {
  /**
   * 문의 내용
   * @example 1:1 문의 내용입니다.
   */
  content?: string;

  /**
   * 문의자 휴대번호
   * @example 01012345678
   */
  phone?: string;

  /**
   * SMS 수신 동의 여부
   * @example Y
   */
  smsYn?: string;

  /**
   * 문의 제목
   * @example 1:1 문의 제목
   */
  title?: string;

  /** 문의 유형 Enum */
  type?: "TYPE_SIGNUP_OR_SIGNIN" | "TYPE_EDU_OR_COMPLETE" | "TYPE_WEB_OR_APP" | "TYPE_ETC";
}

export interface QuestionResponseDto {
  /** 정답 */
  answer?: string;

  /**
   * 차시
   * @format int32
   */
  chapter?: number;

  /**
   * 콘텐츠 시퀀스
   * @format int64
   */
  contentSeq?: number;

  /**
   * 생성일
   * @format date-time
   */
  createdDtime?: string;

  /** 정답 설명 - 255자 */
  description?: string;

  /** 보기 1 제목 */
  item1?: string;

  /** 보기 2 제목 */
  item2?: string;

  /** 보기 3 제목 */
  item3?: string;

  /** 보기 4 제목 */
  item4?: string;

  /** 보기 5 제목 */
  item5?: string;

  /**
   * 보기 개수
   * @format int32
   */
  itemCnt?: number;

  /**
   * 난이도
   * LEVEL_EASY: 쉬움
   * LEVEL_MEDIUM: 중간
   * LEVEL_HARD: 어려움
   */
  level?: "LEVEL_EASY" | "LEVEL_MEDIUM" | "LEVEL_HARD";

  /**
   * 수정일
   * @format date-time
   */
  modifiedDtime?: string;

  /** 질문 내용 */
  question?: string;

  /**
   * 시험 타입
   * QUESTION_OBJ: 객관식
   * QUESTION_SUBJ: 주관식
   */
  questionType?: "QUESTION_OBJ" | "QUESTION_SUBJ";

  /**
   * 시퀀스
   * @format int64
   */
  seq?: number;

  /**
   * 상태
   * @format int32
   */
  status?: number;
}

export interface QuestionSaveRequestDto {
  /** 정답 */
  answer?: string;

  /**
   * 차시
   * @format int32
   */
  chapter?: number;

  /**
   * 콘텐츠 시퀀스
   * @format int64
   */
  contentSeq?: number;

  /** 정답 설명 - 255자 */
  description?: string;

  /** 보기 1 제목 */
  item1?: string;

  /** 보기 2 제목 */
  item2?: string;

  /** 보기 3 제목 */
  item3?: string;

  /** 보기 4 제목 */
  item4?: string;

  /** 보기 5 제목 */
  item5?: string;

  /**
   * 보기 개수
   * @format int32
   */
  itemCnt?: number;

  /**
   * 난이도
   * LEVEL_EASY: 쉬움
   * LEVEL_MEDIUM: 중간
   * LEVEL_HARD: 어려움
   */
  level?: "LEVEL_EASY" | "LEVEL_MEDIUM" | "LEVEL_HARD";

  /** 질문 내용 */
  question?: string;

  /**
   * 시험 타입
   * QUESTION_OBJ: 객관식
   * QUESTION_SUBJ: 주관식
   */
  questionType?: "QUESTION_OBJ" | "QUESTION_SUBJ";

  /**
   * 상태
   * @format int32
   */
  status?: number;
}

export interface QuestionUpdateRequestDto {
  /** 정답 */
  answer?: string;

  /**
   * 차시
   * @format int32
   */
  chapter?: number;

  /** 정답 설명 - 255자 */
  description?: string;

  /** 보기 1 제목 */
  item1?: string;

  /** 보기 2 제목 */
  item2?: string;

  /** 보기 3 제목 */
  item3?: string;

  /** 보기 4 제목 */
  item4?: string;

  /** 보기 5 제목 */
  item5?: string;

  /**
   * 보기 개수
   * @format int32
   */
  itemCnt?: number;

  /** 난이도 */
  level?: "LEVEL_EASY" | "LEVEL_MEDIUM" | "LEVEL_HARD";

  /** 질문 내용 */
  question?: string;

  /** 시험 타입 */
  questionType?: "QUESTION_OBJ" | "QUESTION_SUBJ";

  /**
   * 상태
   * @format int32
   */
  status?: number;
}

export interface Resource {
  description?: string;
  file?: File;
  filename?: string;
  inputStream?: InputStream;
  open?: boolean;
  readable?: boolean;
  uri?: URI;
  url?: URL;
}

export interface RoleUpdateRequestDto {
  roles?: (
    | "ROLE_TRANS_USER"
    | "ROLE_TRANS_MANAGER"
    | "ROLE_TRAFFIC_SAFETY_USER"
    | "ROLE_TRAFFIC_SAFETY_MANAGER"
    | "ROLE_ADMIN"
  )[];
  username?: string;
}

export interface SignInRequestDto {
  /**
   * 로그인 유형
   *  * TYPE_TRANS_EDU: 운수/저상
   *  * TYPE_TRAFFIC_SAFETY_EDU: 도민교통
   */
  loginType?: "TYPE_TRANS_EDU" | "TYPE_TRAFFIC_SAFETY_EDU";

  /** 유저 실명 - 운수/저상 로그인 유형인 경우만 해당 */
  name?: string;

  /** 유저 패스워드 */
  password?: string;

  /** 유저 아이디 */
  username?: string;
}

export interface SignInResponseDto {
  /** Access Token */
  accessToken?: string;

  /** Fake Refresh Token */
  refreshToken?: string;

  /** 유저 권한 */
  roles?: string[];

  /** Authorization Type */
  type?: string;

  /**
   * 유저 시퀀스
   * @format int64
   */
  userSeq?: number;

  /** 유저 아이디 */
  username?: string;
}

export interface SignUpRequestDto {
  /** 이메일 - 도민 */
  email?: string;

  /**
   * 유저 이메일수신동의여부 - 도민
   * @example N
   */
  emailYn?: string;

  /** 유저 실명 - 운수/저상, 도민 */
  name?: string;

  /** 유저 비밀번호 - 운수/저상의 경우 주민등록번호 */
  password?: string;

  /** 유저 휴대폰 번호 - 도민 */
  phone?: string;

  /**
   * 가입 카테고리 Enum
   *  * TYPE_TRANS_EDU: 운수/저상
   *  * TYPE_TRAFFIC_SAFETY_EDU: 도민교통
   */
  regCategory?: "TYPE_TRANS_EDU" | "TYPE_TRAFFIC_SAFETY_EDU";

  /**
   * 유저 SMS수신동의여부 - 도민
   * @example N
   */
  smsYn?: string;

  /** 유저 아이디 - 운수/저상의 경우 주민등록번호 */
  username?: string;
}

export interface SpecificQuestionInExamTabResponseDto {
  /**
   * 생성일
   * @format date-time
   */
  createdDtime?: string;

  /**
   * 난이도
   * @format int32
   */
  level?: number;

  /**
   * 수정일
   * @format date-time
   */
  modifiedDtime?: string;

  /** 문제 제목 */
  questionTitle?: string;

  /**
   * 문제 유형
   * @format int32
   */
  questionType?: number;

  /**
   * 문항 시퀀스
   * @format int64
   */
  seq?: number;

  /**
   * 상태
   * @format int32
   */
  status?: number;
}

export interface Survey {
  course?: Course;

  /** @format date-time */
  createdDtime?: string;

  /** @format int32 */
  itemCnt?: number;

  /** @format date-time */
  modifiedDtime?: string;

  /** @format int64 */
  seq?: number;

  /** @format int32 */
  status?: number;
  surveyQuestionList?: SurveyQuestion[];
  title?: string;
}

export interface SurveyMultipleChoice {
  /** @format date-time */
  createdDtime?: string;
  item1?: string;
  item10?: string;
  item2?: string;
  item3?: string;
  item4?: string;
  item5?: string;
  item6?: string;
  item7?: string;
  item8?: string;
  item9?: string;

  /** @format date-time */
  modifiedDtime?: string;

  /** @format int64 */
  seq?: number;

  /** @format int32 */
  status?: number;
  surveyMultipleChoiceResultList?: SurveyMultipleChoiceResult[];
  surveyQuestion?: SurveyQuestion;
}

export interface SurveyMultipleChoiceRequestDto {
  /** 문항 1 */
  item1?: string;

  /** 문항 10 */
  item10?: string;

  /** 문항 2 */
  item2?: string;

  /** 문항 3 */
  item3?: string;

  /** 문항 4 */
  item4?: string;

  /** 문항 5 */
  item5?: string;

  /** 문항 6 */
  item6?: string;

  /** 문항 7 */
  item7?: string;

  /** 문항 8 */
  item8?: string;

  /** 문항 9 */
  item9?: string;
}

export interface SurveyMultipleChoiceResponseDto {
  /**
   * 생성일
   * @format date-time
   */
  createdDtime?: string;

  /** 문항 1 */
  item1?: string;

  /** 문항 10 */
  item10?: string;

  /** 문항 2 */
  item2?: string;

  /** 문항 3 */
  item3?: string;

  /** 문항 4 */
  item4?: string;

  /** 문항 5 */
  item5?: string;

  /** 문항 6 */
  item6?: string;

  /** 문항 7 */
  item7?: string;

  /** 문항 8 */
  item8?: string;

  /** 문항 9 */
  item9?: string;

  /**
   * 수정일
   * @format date-time
   */
  modifiedDtime?: string;

  /**
   * 시퀀스
   * @format int64
   */
  seq?: number;

  /**
   * 상태
   * @format int32
   */
  status?: number;
}

export interface SurveyMultipleChoiceResult {
  /** @format int32 */
  answer?: number;
  courseUser?: CourseUser;

  /** @format date-time */
  createdDtime?: string;

  /** @format date-time */
  modifiedDtime?: string;

  /** @format int64 */
  seq?: number;

  /** @format int32 */
  status?: number;
  surveyMultipleChoice?: SurveyMultipleChoice;
}

export interface SurveyParticipantQuestionRequestDto {
  /**
   * 사용자가 선택한 문항 인덱스(문자열) 또는 주관식에 대한 답변
   * (item1~item10)
   * item1: 1
   * item2: 2
   * itemN: N
   *
   * @example 3 또는 주관식일 경우 '나는 집에 가고 싶다 등'
   */
  answer?: string;

  /** 객관식 기타일 경우 이에 대한 답변 */
  etcAnswer?: string;

  /**
   * 설문에 대한 질문 시퀀스
   * @format int64
   */
  surveyQuestionSeq?: number;
}

export interface SurveyParticipateRequestDto {
  /**
   * 설문 질문에 대한 답변 리스트
   * @example [{"answer":"6","etcAnswer":"기타는 영어로 Guitar -> 이건 객관식인데 기타에 해당하는 문항 눌렀을 때, 바로 밑에건 객관식에 객관식 문항 선택했을 때","surveyQuestionSeq":61},{"answer":"1","surveyQuestionSeq":62},{"answer":"아 만들기 힘들다 -> 이건 주관식 바로 위에건 객관식 ","surveyQuestionSeq":63}]
   */
  answerList?: SurveyParticipantQuestionRequestDto[];

  /**
   * 유저 과정 신청 시퀀스
   * @format int64
   * @example 3
   */
  courseUserSeq?: number;

  /**
   * 설문 시퀀스
   * @format int64
   * @example 20
   */
  surveySeq?: number;
}

export interface SurveyQuestion {
  content?: string;

  /** @format date-time */
  createdDtime?: string;

  /** @format date-time */
  modifiedDtime?: string;
  questionType?: "TYPE_MULTIPLE_CHOICE" | "TYPE_SUBJECTIVE";

  /** @format int64 */
  seq?: number;

  /** @format int32 */
  status?: number;
  survey?: Survey;
  surveyMultipleChoice?: SurveyMultipleChoice;
}

export interface SurveyQuestionRequestDto {
  /**
   * 질문 내용
   * @example 나는 이번 교육을 통해 ~를 잘 이해했다.
   */
  content?: string;

  /** 질문 타입 */
  questionType?: "TYPE_MULTIPLE_CHOICE" | "TYPE_SUBJECTIVE";

  /** 질문 문항 (객관식일 경우) */
  surveyMultipleChoice?: SurveyMultipleChoiceRequestDto;
}

export interface SurveyQuestionResponseDto {
  /**
   * 질문 내용
   * @example 나는 이번 교육을 통해 ~를 잘 이해했다.
   */
  content?: string;

  /**
   * 생성일
   * @format date-time
   */
  createdDtime?: string;

  /**
   * 수정일
   * @format date-time
   */
  modifiedDtime?: string;

  /** 질문 타입 */
  questionType?: "TYPE_MULTIPLE_CHOICE" | "TYPE_SUBJECTIVE";

  /**
   * 시퀀스
   * @format int64
   */
  seq?: number;

  /**
   * 상태
   * @format int32
   */
  status?: number;

  /** 질문 문항 (객관식일 경우) */
  surveyMultipleChoice?: SurveyMultipleChoiceResponseDto;
}

export interface SurveyRequestDto {
  /** 설문 질문 리스트 */
  surveyQuestionList?: SurveyQuestionRequestDto[];

  /**
   * 설문 제목
   * @example 교육만족도 조사 설문
   */
  title?: string;
}

export interface SurveyResponseDto {
  /**
   * 연결된 과정 시퀀스
   * @format int64
   */
  courseSeq?: number;

  /**
   * 생성일
   * @format date-time
   */
  createdDtime?: string;

  /**
   * 문항 개수
   * @format int32
   * @example 7
   */
  itemCnt?: number;

  /**
   * 수정일
   * @format date-time
   */
  modifiedDtime?: string;

  /**
   * 시퀀스
   * @format int64
   */
  seq?: number;

  /**
   * 상태
   * @format int32
   */
  status?: number;

  /** 설문 질문 리스트 */
  surveyQuestionList?: SurveyQuestionResponseDto[];

  /**
   * 설문 제목
   * @example 교육만족도 조사 설문
   */
  title?: string;
}

export interface URI {
  absolute?: boolean;
  authority?: string;
  fragment?: string;
  host?: string;
  opaque?: boolean;
  path?: string;

  /** @format int32 */
  port?: number;
  query?: string;
  rawAuthority?: string;
  rawFragment?: string;
  rawPath?: string;
  rawQuery?: string;
  rawSchemeSpecificPart?: string;
  rawUserInfo?: string;
  scheme?: string;
  schemeSpecificPart?: string;
  userInfo?: string;
}

export interface URL {
  authority?: string;
  content?: object;

  /** @format int32 */
  defaultPort?: number;
  deserializedFields?: URLStreamHandler;
  file?: string;
  host?: string;
  path?: string;

  /** @format int32 */
  port?: number;
  protocol?: string;
  query?: string;
  ref?: string;

  /** @format int32 */
  serializedHashCode?: number;
  userInfo?: string;
}

export type URLStreamHandler = object;

export interface User {
  /** @format date-time */
  birth?: string;
  courseUsers?: CourseUser[];

  /** @format date-time */
  createdDtime?: string;
  email?: string;
  emailYn?: string;
  failedYn?: string;
  files?: File[];
  gender?: string;
  identityNumber?: string;

  /** @format date-time */
  lastPwUpdDtime?: string;

  /** @format int32 */
  loginFailedCount?: number;

  /** @format date-time */
  modifiedDtime?: string;
  name?: string;
  phone?: string;
  pushToken?: string;
  regCategory?: "TYPE_TRANS_EDU" | "TYPE_TRAFFIC_SAFETY_EDU";

  /** @format int64 */
  seq?: number;
  smsYn?: string;

  /** @format int32 */
  status?: number;
  userTransport?: UserTransport;
  username?: string;
}

export interface UserDetailsImpl {
  accountNonExpired?: boolean;
  accountNonLocked?: boolean;

  /**
   * 유저 생년월일
   * @format date-time
   */
  birth?: string;

  /**
   * 유저 생성일
   * @format date-time
   */
  createdDtime?: string;
  credentialsNonExpired?: boolean;

  /** 유저 이메일수신동의여부 */
  emailYn?: string;
  enabled?: boolean;

  /** 유저 로그인 잠김여부 */
  failedYn?: string;

  /** 유저 성별 */
  gender?: string;

  /**
   * 유저 마지막 비밀번호 변경 일시
   * @format date-time
   */
  lastPwUpdDtime?: string;

  /** 현재 수강 중인 과정 DTO */
  learningCourses?: CourseUserMyInfoResponseDto[];

  /**
   * 유저 로그인 실패 횟수
   * @format int32
   */
  loginFailedCount?: number;

  /**
   * 유저 수정일
   * @format date-time
   */
  modifiedDtime?: string;

  /** 유저 실명 */
  name?: string;

  /** 유저 휴대폰 번호 */
  phone?: string;

  /** 유저 FCM 푸시토큰 */
  pushToken?: string;

  /** 유저 가입 카테고리 */
  regCategory?: "TYPE_TRANS_EDU" | "TYPE_TRAFFIC_SAFETY_EDU";

  /** 유저 권한 Enum */
  roles?: (
    | "ROLE_TRANS_USER"
    | "ROLE_TRANS_MANAGER"
    | "ROLE_TRAFFIC_SAFETY_USER"
    | "ROLE_TRAFFIC_SAFETY_MANAGER"
    | "ROLE_ADMIN"
  )[];

  /** 유저 프로필 S3 정보 */
  s3Files?: FileResponseDto[];

  /**
   * 유저 시퀀스
   * @format int64
   */
  seq?: number;

  /** 유저 SMS수신동의여부 */
  smsYn?: string;

  /** 유저 아이디 */
  username?: string;
}

export interface UserFindChangeRequestDto {
  /** 유저 실명 */
  name?: string;

  /** 유저 비밀번호 */
  password?: string;

  /** 유저 휴대번호 */
  phone?: string;

  /** 유저 아이디 */
  username?: string;
}

export interface UserFindIdRequestDto {
  /** 유저 실명 */
  name?: string;

  /** 유저 휴대번호 */
  phone?: string;
}

export interface UserFindIdResponseDto {
  /**
   * 유저 생성 날짜
   * @format date-time
   */
  createdDTime?: string;

  /** 유저 이름 */
  username?: string;
}

export interface UserFindPasswordRequestDto {
  /** 유저 실명 */
  name?: string;

  /** 유저 휴대번호 */
  phone?: string;

  /** 유저 아이디 */
  username?: string;
}

export interface UserFindPasswordResponseDto {
  /** 유저 실명 */
  name?: string;

  /** 유저 휴대번호 */
  phone?: string;

  /** 유저 아이디 */
  username?: string;
}

export interface UserInfoUpdateRequestDto {
  /** 유저 생년월일 */
  birth?: string;

  /** 이메일수신동의여부 */
  emailYn?: string;

  /** 유저 성별 */
  gender?: string;

  /** 유저 실명 */
  name?: string;

  /** 유저 패스워드 */
  password?: string;

  /** 유저 휴대번호 */
  phone?: string;

  /** SMS수신동의여부 */
  smsYn?: string;
}

export interface UserLoginHistoryResponseDto {
  /** @format date-time */
  createdDtime?: string;

  /** @format date-time */
  modifiedDtime?: string;
  regIp?: string;

  /** @format int64 */
  seq?: number;

  /** @format int64 */
  userSeq?: number;
}

export interface UserModifyRequestDto {
  /** 이메일수신동의여부 */
  emailYn?: string;

  /** SMS수신동의여부 */
  smsYn?: string;
}

export interface UserModifyResponseDto {
  /** 유저 이메일수신동의여부 */
  emailYn?: string;

  /** 유저 SMS수신동의여부 */
  smsYn?: string;

  /** 유저 아이디 */
  username?: string;
}

export interface UserMyinfoCertificatesResponseDto {
  /**
   * 교육 분류, 보수/양성/신규 등
   *  * TYPE_SUP_COMMON -> 보수일반
   *  * TYPE_SUP_CONSTANT -> 보수수시
   *  * TYPE_CONSTANT -> 수시
   *  * TYPE_NEW -> 신규
   *  * TYPE_ILLEGAL -> 법령위반자
   *  * TYPE_HANDICAPPED -> 교통약자 이동편의 증진
   *  * TYPE_DANGEROUS -> 위험물진 운송차량 운전자
   */
  courseCategoryType?:
    | "TYPE_SUP_COMMON"
    | "TYPE_SUP_CONSTANT"
    | "TYPE_CONSTANT"
    | "TYPE_NEW"
    | "TYPE_ILLEGAL"
    | "TYPE_HANDICAPPED"
    | "TYPE_DANGEROUS";

  /** 썸네일 이미지 */
  courseFile?: string;

  /** 과정 이름 */
  courseName?: string;

  /**
   * 업종*   버스 - BUS
   *     전세버스 - CHARTER_BUS
   *     특수여객 - SPECIAL_PASSENGER
   *     법인택시 - CORPORATE_TAXI
   *     일반화물 - GENERAL_CARGO
   *     개인택시 - PRIVATE_TAXI
   *     개별화물 - INDIVIDUAL_CARGO
   *     용달화물 - CONSIGNMENT
   *     특별교통수단 - SPECIAL_TRANSPORTATION
   *     저상버스 - KNEELING_BUS
   *     위험물 - DANGEROUS_GOODS
   *     지정폐기물 - DESIGNATED_WASTE
   *     유해화학물질 - HAZARDOUS_CHEMICALS
   *     고압가스(가연성) - HIGH_PRESSURE_GAS_FLAMMABLE
   *     고압가스(독성) - HIGH_PRESSURE_GAS_TOXIC
   */
  courseSubCategoryType?:
    | "BUS"
    | "CHARTER_BUS"
    | "SPECIAL_PASSENGER"
    | "CORPORATE_TAXI"
    | "GENERAL_CARGO"
    | "PRIVATE_TAXI"
    | "INDIVIDUAL_CARGO"
    | "CONSIGNMENT"
    | "SPECIAL_TRANSPORTATION"
    | "KNEELING_BUS"
    | "DANGEROUS_GOODS"
    | "DESIGNATED_WASTE"
    | "HAZARDOUS_CHEMICALS"
    | "HIGH_PRESSURE_GAS_FLAMMABLE"
    | "HIGH_PRESSURE_GAS_TOXIC";

  /**
   * 과정분류 운수종사자 / 저상버스
   *  * TYPE_TRANS_WOKER: 운수종사자
   *  * TYPE_LOW_FLOOR_BUS: 저상버스
   */
  courseType?: "TYPE_TRANS_WORKER" | "TYPE_LOW_FLOOR_BUS" | "TYPE_PROVINCIAL";

  /**
   * 유저-과정 시퀀스
   * @format int64
   */
  courseUserSeq?: number;

  /**
   * 생성일
   * @format date-time
   */
  createdDtime?: string;

  /** 노출여부 */
  displayYn?: string;

  /** 파일 이름 */
  fileName?: string;

  /**
   * 과정 수료 시간
   * @format int32
   */
  lessonTime?: number;

  /**
   * 수정일
   * @format date-time
   */
  modifiedDtime?: string;

  /** s3 파일 */
  s3Files?: FileResponseDto[];

  /**
   * 과정 시퀀스
   * @format int64
   */
  seq?: number;

  /**
   * 사용 상태
   * @format int32
   */
  status?: number;
}

export interface UserPasswordModifyRequestDto {
  /** 현재 사용자 비밀번호 */
  currentPw?: string;

  /** 변경할 사용자 비밀번호 */
  modifiedPw?: string;
}

export interface UserProvincialFindResponseDto {
  /** 회사 */
  company?: string;

  /** 이메일 */
  email?: string;

  /** 이름 */
  name?: string;

  /** 휴대번호 */
  phone?: string;

  /** SMS수신동의여부 */
  smsYn?: string;

  /** 지역등록 */
  userRegistrationType?:
    | "CHEONAN"
    | "GONGJU"
    | "BORYEONG"
    | "ASAN"
    | "SEOSAN"
    | "NONSAN"
    | "GYERYONG"
    | "DANGJIN"
    | "GEUMSAN"
    | "BUYEO"
    | "SEOCHEON"
    | "CHEONGYANG"
    | "HONGSEONG"
    | "YESAN"
    | "TAEAN"
    | "CHUNGNAM"
    | "SEJONG"
    | "SEOUL"
    | "BUSAN"
    | "DAEGU"
    | "INCHEON"
    | "GWANGJU"
    | "DAEJEON"
    | "ULSAN"
    | "GYEONGGI"
    | "GANGWON"
    | "CHUNGBUK"
    | "JEONBUK"
    | "JEONNAM"
    | "GYEONGBUK"
    | "GYEONGNAM"
    | "JEJU";

  /** 아이디 */
  username?: string;
}

export interface UserProvincialUpdateRequestDto {
  /** 회사 */
  company?: string;

  /** 이메일 */
  email?: string;

  /** 이름 */
  name?: string;

  /** 휴대번호 */
  phone?: string;

  /** SMS수신동의여부 */
  smsYn?: string;

  /** 지역등록 */
  userRegistrationType?:
    | "CHEONAN"
    | "GONGJU"
    | "BORYEONG"
    | "ASAN"
    | "SEOSAN"
    | "NONSAN"
    | "GYERYONG"
    | "DANGJIN"
    | "GEUMSAN"
    | "BUYEO"
    | "SEOCHEON"
    | "CHEONGYANG"
    | "HONGSEONG"
    | "YESAN"
    | "TAEAN"
    | "CHUNGNAM"
    | "SEJONG"
    | "SEOUL"
    | "BUSAN"
    | "DAEGU"
    | "INCHEON"
    | "GWANGJU"
    | "DAEJEON"
    | "ULSAN"
    | "GYEONGGI"
    | "GANGWON"
    | "CHUNGBUK"
    | "JEONBUK"
    | "JEONNAM"
    | "GYEONGBUK"
    | "GYEONGNAM"
    | "JEJU";

  /** 아이디 */
  username?: string;
}

export interface UserProvincialUpdateResponseDto {
  /** 회사 */
  company?: string;

  /** 이메일 */
  email?: string;

  /** 이름 */
  name?: string;

  /** 휴대번호 */
  phone?: string;

  /** SMS수신동의여부 */
  smsYn?: string;

  /** 지역등록 */
  userRegistrationType?:
    | "CHEONAN"
    | "GONGJU"
    | "BORYEONG"
    | "ASAN"
    | "SEOSAN"
    | "NONSAN"
    | "GYERYONG"
    | "DANGJIN"
    | "GEUMSAN"
    | "BUYEO"
    | "SEOCHEON"
    | "CHEONGYANG"
    | "HONGSEONG"
    | "YESAN"
    | "TAEAN"
    | "CHUNGNAM"
    | "SEJONG"
    | "SEOUL"
    | "BUSAN"
    | "DAEGU"
    | "INCHEON"
    | "GWANGJU"
    | "DAEJEON"
    | "ULSAN"
    | "GYEONGGI"
    | "GANGWON"
    | "CHUNGBUK"
    | "JEONBUK"
    | "JEONNAM"
    | "GYEONGBUK"
    | "GYEONGNAM"
    | "JEJU";

  /**
   * 유저 시퀀스
   * @format int64
   */
  userSeq?: number;

  /** 아이디 */
  username?: string;
}

export interface UserResponseDto {
  /**
   * 유저 생년월일
   * @format date-time
   */
  birth?: string;

  /**
   * 유저 생성일
   * @format date-time
   */
  createdDtime?: string;

  /** 이메일수신동의여부 */
  emailYn?: string;

  /** 로그인 잠김 여부 */
  failedYn?: string;

  /** 유저 성별 */
  gender?: string;

  /**
   * 마지막 비밀번호 변경일시
   * @format date-time
   */
  lastPwUpdDtime?: string;

  /**
   * 로그인 실패 횟수
   * @format int32
   */
  loginFailedCount?: number;

  /**
   * 유저 수정일
   * @format date-time
   */
  modifiedDtime?: string;

  /** 유저 실명 */
  name?: string;

  /** 유저 휴대번호 */
  phone?: string;

  /** 유저 가입 구분 */
  regCategory?: "TYPE_TRANS_EDU" | "TYPE_TRAFFIC_SAFETY_EDU";

  /**
   * 유저 시퀀스
   * @format int64
   */
  seq?: number;

  /** SMS 수신동의여부 */
  smsYn?: string;

  /**
   * 유저 삭제여부
   * @format int32
   */
  status?: number;

  /** 유저 아이디 */
  username?: string;
}

export interface UserTransport {
  carNumber?: string;
  company?: string;

  /** @format date-time */
  createdDtime?: string;

  /** @format date-time */
  modifiedDtime?: string;

  /** @format int64 */
  seq?: number;

  /** @format int32 */
  status?: number;
  user?: User;
  userBusinessTypeOne?: "PASSENGER" | "FREIGHT";
  userBusinessTypeTwo?:
    | "BUS"
    | "CHARTER_BUS"
    | "SPECIAL_PASSENGER"
    | "CORPORATE_TAXI"
    | "GENERAL_CARGO"
    | "PRIVATE_TAXI"
    | "INDIVIDUAL_CARGO"
    | "CONSIGNMENT"
    | "SPECIAL_TRANSPORTATION"
    | "KNEELING_BUS"
    | "DANGEROUS_GOODS"
    | "DESIGNATED_WASTE"
    | "HAZARDOUS_CHEMICALS"
    | "HIGH_PRESSURE_GAS_FLAMMABLE"
    | "HIGH_PRESSURE_GAS_TOXIC";
  userRegistrationType?:
    | "CHEONAN"
    | "GONGJU"
    | "BORYEONG"
    | "ASAN"
    | "SEOSAN"
    | "NONSAN"
    | "GYERYONG"
    | "DANGJIN"
    | "GEUMSAN"
    | "BUYEO"
    | "SEOCHEON"
    | "CHEONGYANG"
    | "HONGSEONG"
    | "YESAN"
    | "TAEAN"
    | "CHUNGNAM"
    | "SEJONG"
    | "SEOUL"
    | "BUSAN"
    | "DAEGU"
    | "INCHEON"
    | "GWANGJU"
    | "DAEJEON"
    | "ULSAN"
    | "GYEONGGI"
    | "GANGWON"
    | "CHUNGBUK"
    | "JEONBUK"
    | "JEONNAM"
    | "GYEONGBUK"
    | "GYEONGNAM"
    | "JEJU";
}

export interface UserTransportFindResponseDto {
  /** 차량번호 */
  carNumber?: string;

  /** 회사 */
  company?: string;

  /** 이름 */
  name?: string;

  /** 휴대번호 */
  phone?: string;

  /** SMS수신동의여부 */
  smsYn?: string;

  /** 업종선택1 */
  userBusinessTypeOne?: "PASSENGER" | "FREIGHT";

  /** 업종선택2  */
  userBusinessTypeTwo?:
    | "BUS"
    | "CHARTER_BUS"
    | "SPECIAL_PASSENGER"
    | "CORPORATE_TAXI"
    | "GENERAL_CARGO"
    | "PRIVATE_TAXI"
    | "INDIVIDUAL_CARGO"
    | "CONSIGNMENT"
    | "SPECIAL_TRANSPORTATION"
    | "KNEELING_BUS"
    | "DANGEROUS_GOODS"
    | "DESIGNATED_WASTE"
    | "HAZARDOUS_CHEMICALS"
    | "HIGH_PRESSURE_GAS_FLAMMABLE"
    | "HIGH_PRESSURE_GAS_TOXIC";

  /** 차량등록 */
  userRegistrationType?:
    | "CHEONAN"
    | "GONGJU"
    | "BORYEONG"
    | "ASAN"
    | "SEOSAN"
    | "NONSAN"
    | "GYERYONG"
    | "DANGJIN"
    | "GEUMSAN"
    | "BUYEO"
    | "SEOCHEON"
    | "CHEONGYANG"
    | "HONGSEONG"
    | "YESAN"
    | "TAEAN"
    | "CHUNGNAM"
    | "SEJONG"
    | "SEOUL"
    | "BUSAN"
    | "DAEGU"
    | "INCHEON"
    | "GWANGJU"
    | "DAEJEON"
    | "ULSAN"
    | "GYEONGGI"
    | "GANGWON"
    | "CHUNGBUK"
    | "JEONBUK"
    | "JEONNAM"
    | "GYEONGBUK"
    | "GYEONGNAM"
    | "JEJU";
}

export interface UserTransportUpdateRequestDto {
  /** 차량번호 */
  carNumber?: string;

  /** 회사 */
  company?: string;

  /** 이름 */
  name?: string;

  /** 휴대번호 */
  phone?: string;

  /** SMS수신동의여부 */
  smsYn?: string;

  /** 업종선택1 */
  userBusinessTypeOne?: "PASSENGER" | "FREIGHT";

  /** 업종선택2  */
  userBusinessTypeTwo?:
    | "BUS"
    | "CHARTER_BUS"
    | "SPECIAL_PASSENGER"
    | "CORPORATE_TAXI"
    | "GENERAL_CARGO"
    | "PRIVATE_TAXI"
    | "INDIVIDUAL_CARGO"
    | "CONSIGNMENT"
    | "SPECIAL_TRANSPORTATION"
    | "KNEELING_BUS"
    | "DANGEROUS_GOODS"
    | "DESIGNATED_WASTE"
    | "HAZARDOUS_CHEMICALS"
    | "HIGH_PRESSURE_GAS_FLAMMABLE"
    | "HIGH_PRESSURE_GAS_TOXIC";

  /** 차량등록 */
  userRegistrationType?:
    | "CHEONAN"
    | "GONGJU"
    | "BORYEONG"
    | "ASAN"
    | "SEOSAN"
    | "NONSAN"
    | "GYERYONG"
    | "DANGJIN"
    | "GEUMSAN"
    | "BUYEO"
    | "SEOCHEON"
    | "CHEONGYANG"
    | "HONGSEONG"
    | "YESAN"
    | "TAEAN"
    | "CHUNGNAM"
    | "SEJONG"
    | "SEOUL"
    | "BUSAN"
    | "DAEGU"
    | "INCHEON"
    | "GWANGJU"
    | "DAEJEON"
    | "ULSAN"
    | "GYEONGGI"
    | "GANGWON"
    | "CHUNGBUK"
    | "JEONBUK"
    | "JEONNAM"
    | "GYEONGBUK"
    | "GYEONGNAM"
    | "JEJU";
}

export interface UserTransportUpdateResponseDto {
  /** 차량번호 */
  carNumber?: string;

  /** 회사 */
  company?: string;

  /** 유저 프로필 사진 */
  files?: File[];

  /** 이름 */
  name?: string;

  /** 휴대번호 */
  phone?: string;

  /** SMS수신동의여부 */
  smsYn?: string;

  /** 업종선택1 */
  userBusinessTypeOne?: "PASSENGER" | "FREIGHT";

  /** 업종선택2  */
  userBusinessTypeTwo?:
    | "BUS"
    | "CHARTER_BUS"
    | "SPECIAL_PASSENGER"
    | "CORPORATE_TAXI"
    | "GENERAL_CARGO"
    | "PRIVATE_TAXI"
    | "INDIVIDUAL_CARGO"
    | "CONSIGNMENT"
    | "SPECIAL_TRANSPORTATION"
    | "KNEELING_BUS"
    | "DANGEROUS_GOODS"
    | "DESIGNATED_WASTE"
    | "HAZARDOUS_CHEMICALS"
    | "HIGH_PRESSURE_GAS_FLAMMABLE"
    | "HIGH_PRESSURE_GAS_TOXIC";

  /** 차량등록 */
  userRegistrationType?:
    | "CHEONAN"
    | "GONGJU"
    | "BORYEONG"
    | "ASAN"
    | "SEOSAN"
    | "NONSAN"
    | "GYERYONG"
    | "DANGJIN"
    | "GEUMSAN"
    | "BUYEO"
    | "SEOCHEON"
    | "CHEONGYANG"
    | "HONGSEONG"
    | "YESAN"
    | "TAEAN"
    | "CHUNGNAM"
    | "SEJONG"
    | "SEOUL"
    | "BUSAN"
    | "DAEGU"
    | "INCHEON"
    | "GWANGJU"
    | "DAEJEON"
    | "ULSAN"
    | "GYEONGGI"
    | "GANGWON"
    | "CHUNGBUK"
    | "JEONBUK"
    | "JEONNAM"
    | "GYEONGBUK"
    | "GYEONGNAM"
    | "JEJU";

  /**
   * 유저 시퀀스
   * @format int64
   */
  userSeq?: number;
}
