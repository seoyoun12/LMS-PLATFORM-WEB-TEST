import { BbsType, uploadFile } from '@common/api/adm/file';
import {
  LearningMaterialInput,
  learningMaterialUpload,
} from '@common/api/learningMaterial';
import { FileArrayType, LearningMaterialUploadForm } from '@components/admin-center/LearningMaterialUploadForm';
import { useSnackbar } from '@hooks/useSnackbar';
import { Container } from '@mui/material';
import router from 'next/router';
import styles from '@styles/common.module.scss';
import React , { useState } from 'react';

export function LearningMaterialUpload() {
  const snackbar = useSnackbar();
  const [loading, setLoading] = useState(false);

  const fileHandler = async (
    files: File[],
    learningMaterialInput: LearningMaterialInput
  ) => {
    const isFileUpload = files.length > 0;
    if (isFileUpload) {
      // await uploadFile({
      //   fileTypeId: learningMaterialInput.seq,
      //   fileType: BbsType.TYPE_LEARNING_MATERIAL,
      //   files,
      // });
      
      files.forEach(async (r, idx) =>{
          await uploadFile({
            fileTypeId: learningMaterialInput.seq,
            fileType: BbsType.TYPE_LEARNING_MATERIAL,
            files,
            idx
          });
      })
    }
  };

  const handleSubmit = async ({
    files,
    learningMaterialInput,
    serverFilesRemoved //s3에 저장된 파일 제거할때 쓰는 용입니다. 업로드에서는 사용할 필요 없습니다.
  }: {
    files: File[];
    learningMaterialInput: LearningMaterialInput;
    serverFilesRemoved?:FileArrayType[]
  }) => {
    try {
      setLoading(true);
      const learningMaterial = await learningMaterialUpload(learningMaterialInput);
      await fileHandler(files, learningMaterial.data);
      snackbar({ variant: 'success', message: '업로드 되었습니다.' });
      router.push(`/admin-center/learning-material`);
      setLoading(false);
    } catch (e: any) {
      console.error(e);
      snackbar({ variant: 'error', message: '업로드에 실패했습니다.' });
      setLoading(false);
    }
  };

  return (
    <Container className={styles.globalContainer}>
      <LearningMaterialUploadForm onHandleSubmit={handleSubmit} loading={loading} />
    </Container>
  );
}
