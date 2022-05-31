import { POST } from '@common/httpClient';

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


export const initFileConfig = async ({ contentType, fileName }: { contentType: string, fileName: string }): Promise<{
  encFileName: string,
  uploadRequestKey: string
}> => {
  const fileContentType = 'video/mp4';
  const fileOriginalName = 'name';

  const { data } = await POST(`/file/adm/multipart/init`, {
      fileContentType,
      fileOriginalName,
      uploadType: 'RESOURCE_LESSON_FILE'
    }
  );

  return data;
};

export const completeFileUpload = (completeFileInput: CompleteFileInput) => {
  return POST(`/file/adm/multipart/complete`, completeFileInput);
};
