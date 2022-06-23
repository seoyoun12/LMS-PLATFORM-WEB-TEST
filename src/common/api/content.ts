import { ProductStatus } from '@common/api/course';

export enum ContentType {
  CONTENT_HTML = 'CONTENT_HTML',
  CONTENT_MP4 = 'CONTENT_MP4',
  CONTENT_EXTERNAL = 'CONTENT_EXTERNAL'
}

export enum ContentTypeHuman {
  CONTENT_HTML = '웹콘텐츠(HTML5)',
  CONTENT_MP4 = 'mp4',
  CONTENT_EXTERNAL = '외부링크'
}

export interface ContentInput {
  contentType: ContentType | string;
  contentName: string;
  contentWidth: number;
  contentHeight: number;
  status: ProductStatus;
}

export interface ContentRes {
  code: string;
  contentHeight: number;
  contentName: string;
  contentType: ContentType;
  contentWidth: number;
  createdDtime: string;
  examCnt: number;
  homeworkCnt: number;
  lessonCnt: number;
  modifiedDtime: string;
  questionCnt: number;
  seq: number;
  status: ProductStatus;
  courseName: string;
  courseSeq: number;
}
