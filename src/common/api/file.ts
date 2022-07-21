import { DELETE, POST, PUT } from '@common/httpClient';

// export const UPLOAD_URL = '/file/adm/multipart/upload';
export const UPLOAD_URL = '/file/multipart/upload';

export enum FileType {
  COURSE_IMAGE = 'RESOURCE_COURSE_IMAGE',
  COURSE_VIDEO = 'RESOURCE_COURSE_VIDEO',
  IMAGE = 'RESOURCE_IMAGE',
  VIDEO = 'RESOURCE_VIDEO',
  HOMEWORK_FILE = 'RESOURCE_HOMEWORK_FILE',
  FORUM_FILE = 'RESOURCE_FORUM_FILE',
  LIBRARY_FILE = 'RESOURCE_LIBRARY_FILE',
  LESSON_FILE = 'RESOURCE_LESSON_FILE',
  POST_NOTICE_FILE = 'RESOURCE_NOTICE_FILE',
  POST_QUESTION_FILE = 'RESOURCE_POST_QUESTION_FILE',
  POST_FAQ_FILE = 'RESOURCE_POST_FAQ_FILE',
  POST_REVIEW_FILE = 'RESOURCE_POST_REVIEW_FILE'
}

export interface CompleteFileInput {
  encFileName: string;
  uploadRequestKey: string;
  etagList: {
    etag: string;
    partNumber: number;
  }[];
  uploadType: string;
  dataSeq: number;
  fileOriginalName: string;
}

