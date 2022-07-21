import { DELETE, POST, PUT } from '@common/httpClient';
import { CompleteFileInput, FileType } from '@common/api/file';
import { setFileConfig } from '@utils/setFileConfig';


// TODO: FileType 값이랑 호환하게 할 수는 없나?
export enum BbsType {
  TYPE_FORUM = 'TYPE_FORUM',
  TYPE_POST_FAQ = 'TYPE_POST_FAQ',
  TYPE_POST_REVIEW = 'TYPE_POST_REVIEW',
  TYPE_POST_NOTICE = 'TYPE_POST_NOTICE',
  TYPE_POST_QUESTION = 'TYPE_POST_QUESTION',
  TYPE_COURSE = 'TYPE_COURSE',
  TYPE_HOMEWORK = 'TYPE_HOMEWORK',
  TYPE_LIBRARY = 'TYPE_LIBRARY',
  TYPE_LESSON = 'TYPE_LESSON',

}

export const initFileConfig = async ({ fileUploadType, fileName }: {
  fileUploadType: FileType,
  fileName: string
}): Promise<{
  encFileName: string,
  uploadRequestKey: string
}> => {
  const fileContentType = 'video/mp4';

  // const { data } = await POST(`/file/adm/multipart/init`, {
  const { data } = await POST(`/file/multipart/init`, {
      fileContentType,
      fileName,
      uploadType: fileUploadType
    }
  );

  return data;
};

export const completeFileUpload = (completeFileInput: CompleteFileInput) => {
  // return POST(`/file/adm/multipart/complete`, completeFileInput);
  return POST(`/file/multipart/complete`, completeFileInput);
};

export const uploadFile = ({ fileType, fileTypeId, files }: {
  fileType: BbsType;
  fileTypeId: number;
  files: File[]
}) => {
  const formData = new FormData();
  const { file, fileName } = setFileConfig(files);
  formData.append('files', file, fileName);

  console.log("fileTypeId: ", fileTypeId);

  // return POST(`/file/adm/${fileType}/${fileTypeId}`, formData, {
  return POST(`/file/${fileType}/${fileTypeId}`, formData, {
    headers: {
      contentType: 'multipart/form-data'
    }
  });
};

export const updateFile = () => {
  return PUT(``);
};

export const deleteFile = ({ fileType, fileTypeId, fileSeqList }: {
  fileType: BbsType;
  fileTypeId: number;
  fileSeqList: number[];
}) => {
  // return DELETE(`/file/adm/${fileType}/${fileTypeId}`, { fileSeqList });
  return DELETE(`/file/${fileType}/${fileTypeId}`, { fileSeqList });
};
