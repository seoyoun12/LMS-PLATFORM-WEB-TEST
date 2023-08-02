import { DELETE, GET, POST, PUT } from '@common/httpClient';
import { ContentType } from '@common/api/content';
import { ProductStatus } from '@common/api/course';
import useSWR, { SWRResponse } from 'swr';
import { S3Files } from 'types/file';
import { LessonQuizResponseDto } from './Api';

// export interface LessonInput {
//   contentType?: ContentType;
//   completeTime?: number;
//   lessonNm?: string;
//   mobileUrl?: string;
//   pcUrl?: string;
//   chapter?: number;
//   totalPage?: number;
//   totalTime?: number;
//   min?: number;
//   sec?: number;
// }

export interface Lesson {
  completeTime: number;
  contentSeq: number;
  contentType: ContentType;
  createdDtime: string;
  lessonNm: string;
  mobileUrl: string;
  modifiedDtime: string;
  pcUrl: string;
  fileName: string;
  s3Files: S3Files;
  seq: number;
  chapter: number;
  status: ProductStatus;
  totalPage: number;
  totalTime: number;
  min: number;
  sec: number;
  interaction: boolean;
  lessonQuizs: LessonQuizResponseDto[]
}

export type LessonInput = Partial<Lesson>;
