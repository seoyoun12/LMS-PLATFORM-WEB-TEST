import { ContentType } from '@common/api/content';
import { ProductStatus } from '@common/api/course';
import { S3Files } from 'types/file';
import { IQuizTime } from '@layouts/Lesson/LessonContentVideo';

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
  lessonQuizs: IQuizTime[]
}

export type LessonInput = Partial<Lesson>;
