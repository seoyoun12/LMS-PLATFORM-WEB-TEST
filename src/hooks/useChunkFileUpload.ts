import { useState, useRef, useCallback } from 'react';
import Resumable from 'resumablejs';
import { axiosHeaders, axiosSetting } from '@common/httpClient';
import { localStore } from '@common/storage';
import { completeFileUpload, FileUploadType, initFileConfig, UPLOAD_URL } from '@common/api/file';

type ResumableFile = Resumable.ResumableFile;
type ResumableChunk = Resumable.ResumableChunk;

interface ChunkResponse {
  chunks: Array<ResumableChunk & {
    xhr: {
      response: string
    }
  }>;
}

interface Props {
  fileUploadType: FileUploadType;
}

const CHUNK_SIZE = 6291456;

const round = (number: number, decimalPlaces: number) => {
  const factorOfTen = Math.pow(10, decimalPlaces);
  return Math.round(number * factorOfTen) / factorOfTen;
};

export const useFileUpload = ({ fileUploadType }: Props) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [ uploadPercentage, setUploadPercentage ] = useState(0);
  const [ progressbar, showProgressbar ] = useState<any>(false);
  const [ spinner, setSpinner ] = useState<any>(false);
  const [ errorMessage, setErrorMessage ] = useState<string | null>(null);

  const handleUpload = useCallback(async (dataId: number) => {
    if (!!fileInputRef.current && !!fileInputRef.current.files?.length) {
      const { encFileName, uploadRequestKey } = await initFileConfig({
        fileUploadType,
        fileName: fileInputRef.current.files[0].name
      });
      const file = fileInputRef.current.files[0];
      const accessToken = localStore.getItem('ACCESS_TOKEN');
      const options = {
        target: `${axiosSetting.server() + UPLOAD_URL}`,
        testChunks: false,
        chunkSize: CHUNK_SIZE,
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
      });
      r.on('fileError', function (file, message) {
        console.log('fileError', file, message);
        setErrorMessage(
          'It appears the file was larger than 20Mb Please try a different file'
        );
      });
      r.on('error', (message: string, file: ResumableFile) => {
        console.log('error', file, message);
      });
      r.on('cancel', () => {
        console.log('CANCEL');
      });
      r.on('fileProgress', function (file: ResumableFile, message: string) {
        const progress = r.progress();
        console.log(progress);
        showProgressbar(true);
        if (errorMessage == null) {
          setUploadPercentage(round((progress) * 100, 2));
        } else {
          showProgressbar(false);
          setUploadPercentage(0);
        }
      });
    }
  }, [ fileInputRef.current, fileUploadType, errorMessage ]);

  return {
    fileInputRef,
    handleUpload
  };
};

