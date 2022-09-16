import { useState, useRef, useCallback, useEffect } from 'react';
import Resumable from 'resumablejs';
import { axiosHeaders, axiosSetting } from '@common/httpClient';
import { localStore } from '@common/storage';
import { FileType, UPLOAD_URL } from '@common/api/file';
import { completeFileUpload, initFileConfig } from '@common/api/adm/file';

type ResumableFile = Resumable.ResumableFile;
type ResumableChunk = Resumable.ResumableChunk;

interface ChunkResponse {
  chunks: Array<ResumableChunk & {
    xhr: {
      response: string
    }
  }>;
}

interface HandleUploadProps {
  chunkSize?: number;
  fileUploadType: FileType;
  dataId: number;
  file: File;
  fileName: string;
}

const round = (number: number, decimalPlaces: number) => {
  const factorOfTen = Math.pow(10, decimalPlaces);
  return Math.round(number * factorOfTen) / factorOfTen;
};

export const useFileUpload = () => {
  const [ uploadPercentage, setUploadPercentage ] = useState(0);
  const [ progressbar, showProgressbar ] = useState<any>(false);
  const [ spinner, setSpinner ] = useState<boolean>(null);
  const [ errorMessage, setErrorMessage ] = useState<string | null>(null);
  const spinnerRef = useRef<boolean>(null)

  const handleUpload = useCallback(async (
    {
      dataId,
      file,
      fileName,
      fileUploadType,
      chunkSize = 6291456
    }: HandleUploadProps) => {
    if (!!file) {
      const { encFileName, uploadRequestKey } = await initFileConfig({
        fileUploadType,
        fileName
      });
      const accessToken = localStore.getItem('ACCESS_TOKEN');
      const options = {
        target: `${axiosSetting.server() + UPLOAD_URL}`,
        testChunks: false,
        chunkSize,
        simultaneousUploads: 1,
        headers: {
          ...axiosHeaders,
          Authorization: `Bearer ${accessToken}`
        },
        query: {
          uploadRequestKey: uploadRequestKey,
          encFileName: encFileName
        },
      };
      const r = new Resumable(options);

      r.addFile(file);
      r.on('fileAdded', (file, event) => {
        r.upload();
      });
      r.on('fileSuccess', async (file: Omit<ResumableFile, 'chunks'> & ChunkResponse, message: string) => {
        setSpinner(true);
        const etagList: {
          etag: string;
          partNumber: number;
        }[] = file.chunks.map(val => JSON.parse(val.xhr.response).data.partETag);
        const requestInput = {
          encFileName,
          uploadRequestKey,
          etagList,
          uploadType: fileUploadType,
          dataSeq: dataId,
          fileOriginalName: file.fileName
        };
        await completeFileUpload(requestInput);

        setSpinner(false);
        spinnerRef.current = false;
      });
      r.on('fileError', function (file, message) {
        setErrorMessage(
          'It appears the file was larger than 20Mb Please try a different file'
        );
      });
      r.on('error', (message: string, file: ResumableFile) => {
      });
      r.on('cancel', () => {
      });
      r.on('fileProgress', function (file: ResumableFile, message: string) {
        const progress = r.progress();
        showProgressbar(true);
        setSpinner(true)
        spinnerRef.current = true;
        if (errorMessage == null) {
          setUploadPercentage(round((progress) * 100, 2));
        } else {
          showProgressbar(false);
          setUploadPercentage(0);
        }
      });
    }
  }, [ errorMessage ]);

  const handleProgressStatus = () => {
    return new Promise<boolean>((resolve , reject) => {
      let timer = setTimeout(function recall() {
      if(spinnerRef.current === false){
          resolve(spinnerRef.current)
          return clearTimeout(timer)
        }
        clearTimeout(timer)
        timer = setTimeout(recall , 1000)
      } , 1000)
          
    })
  }

  return {
    handleUpload,
    handleProgressStatus,
  };
};

