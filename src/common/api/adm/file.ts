import { DELETE, POST, PUT } from "@common/httpClient";
import { CompleteFileInput, FileType } from "@common/api/file";
import { setFileConfig } from "@utils/setFileConfig";

// TODO: FileType 값이랑 호환하게 할 수는 없나?
export enum BbsType {
  TYPE_FORUM = "TYPE_FORUM",
  TYPE_POST_FAQ = "TYPE_POST_FAQ",
  TYPE_POST_REVIEW = "TYPE_POST_REVIEW",
  TYPE_POST_NOTICE = "TYPE_POST_NOTICE",
  TYPE_QNA = "TYPE_QNA",
  TYPE_QNA_ANSWER = "TYPE_QNA_ANSWER",
  TYPE_COURSE = "TYPE_COURSE",
  TYPE_HOMEWORK = "TYPE_HOMEWORK",
  TYPE_LIBRARY = "TYPE_LIBRARY",
  TYPE_LESSON = "TYPE_LESSON",
  TYPE_BANNER = "TYPE_BANNER",
  TYPE_LEARNING_MATERIAL = "TYPE_LEARNING_MATERIAL",
  TYPE_USER_PROFILE = "TYPE_USER_PROFILE",
  TYPE_POST_GUIDE_AUTH = "TYPE_GUIDE_AUTH",
  TYPE_POST_GUIDE_EDU_REGI = "TYPE_GUIDE_EDU_REGI",
  TYPE_POST_GUIDE_EDU_LEARNING = "TYPE_GUIDE_EDU_LEARNING",
  TYPE_PROVINCIAL_BOARD = "TYPE_PROVINCIAL_BOARD",
  TYPE_POST_NOTICE_PROVINCIAL = "TYPE_POST_NOTICE_PROVINCIAL",
  TYPE_POST_FAQ_PROVINCIAL = "TYPE_POST_FAQ_PROVINCIAL",
}

export const initFileConfig = async ({
  fileUploadType,
  fileName,
}: {
  fileUploadType: FileType;
  fileName: string;
}): Promise<{
  encFileName: string;
  uploadRequestKey: string;
}> => {
  const fileContentType = "video/mp4";

  // const { data } = await POST(`/file/adm/multipart/init`, {
  const { data } = await POST(`/file/multipart/init`, {
    fileContentType,
    fileName,
    uploadType: fileUploadType,
  });

  return data;
};

export const completeFileUpload = (completeFileInput: CompleteFileInput) => {
  // return POST(`/file/adm/multipart/complete`, completeFileInput);
  return POST(`/file/multipart/complete`, completeFileInput);
};

export const uploadFile = ({ fileType,fileTypeId,files,idx }: { fileType: BbsType;fileTypeId: number;files: File[];idx?:number }) => {
  const formData = new FormData();
  if(idx){
    const file = !!files?.length ? files[idx] : new Blob([]);
    const fileName = !!files?.length ? files[idx].name : undefined;
    formData.append("files", file, fileName);
  }
  else{
    const { file, fileName } = setFileConfig(files);
    formData.append("files", file, fileName);

  }

  // return POST(`/file/adm/${fileType}/${fileTypeId}`, formData, {
  return POST(`/file/${fileType}/${fileTypeId}`, formData, {
    headers: {
      contentType: "multipart/form-data",
    },
  });
};

export const updateFile = () => {
  return PUT(``);
};

export const deleteFile = ({
  fileType,
  fileTypeId,
  fileSeqList,
}: {
  fileType: BbsType;
  fileTypeId: number;
  fileSeqList: number[];
}) => {
  // return DELETE(`/file/adm/${fileType}/${fileTypeId}`, { fileSeqList });
  return DELETE(`/file/${fileType}/${fileTypeId}`, { fileSeqList });
};
