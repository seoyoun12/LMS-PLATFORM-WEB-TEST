import { POST } from '@common/httpClient';

export const UPLOAD_URL = '/file/adm/multipart/upload';

export enum FileUploadType {
  COURSE_IMAGE = 'RESOURCE_COURSE_IMAGE',
  COURSE_VIDEO = 'RESOURCE_COURSE_VIDEO',
  IMAGE = 'RESOURCE_IMAGE',
  VIDEO = 'RESOURCE_VIDEO',
  HOMEWORK_FILE = 'RESOURCE_HOMEWORK_FILE',
  FORUM_FILE = 'RESOURCE_FORUM_FILE',
  LIBRARY_FILE = 'RESOURCE_LIBRARY_FILE',
  LESSON_FILE = 'RESOURCE_LESSON_FILE',
  POST_NOTICE_FILE = 'RESOURCE_POST_NOTICE_FILE',
  POST_QUESTION_FILE = 'RESOURCE_POST_QUESTION_FILE',
  POST_FAQ_FILE = 'RESOURCE_POST_FAQ_FILE',
  POST_REVIEW_FILE = 'RESOURCE_POST_REVIEW_FILE'
}

interface CompleteFileInput {
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

export const initFileConfig = async ({ fileUploadType, fileName }: {
  fileUploadType: FileUploadType,
  fileName: string
}): Promise<{
  encFileName: string,
  uploadRequestKey: string
}> => {
  const fileContentType = 'video/mp4';

  const { data } = await POST(`/file/adm/multipart/init`, {
      fileContentType,
      fileName,
      uploadType: fileUploadType
    }
  );

  return data;
};

export const completeFileUpload = (completeFileInput: CompleteFileInput) => {
  return POST(`/file/adm/multipart/complete`, completeFileInput);
};
