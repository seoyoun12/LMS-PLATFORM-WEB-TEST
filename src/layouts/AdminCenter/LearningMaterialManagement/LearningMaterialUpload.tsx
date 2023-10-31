import { BbsType, uploadFile } from '@common/api/adm/file';
import { LearningMaterialInput,learningMaterialUpload } from '@common/api/learningMaterial';
import { LearningMaterialUploadForm } from '@components/admin-center/LearningMaterialUploadForm';
import { useSnackbar } from '@hooks/useSnackbar';
import { Container } from '@mui/material';
import router from 'next/router';
import styles from '@styles/common.module.scss';
import { useState } from 'react';

export function LearningMaterialUpload() {
  const snackbar = useSnackbar();
  const [loading, setLoading] = useState(false);

  const fileHandler = async (files: File[], learningMaterialInput: LearningMaterialInput) => {
    const isFileUpload = files.length > 0;
    if (isFileUpload) {
      files.forEach(async (r, idx) => {
        await uploadFile({
          fileTypeId: learningMaterialInput.seq,
          fileType: BbsType.TYPE_LEARNING_MATERIAL,
          files,
          idx,
        });
      });
    }
  };

  const handleSubmit = async ({ files,learningMaterialInput }: { files: File[]; learningMaterialInput: LearningMaterialInput; }) => {
    try {
      setLoading(true);
      const learningMaterial = await learningMaterialUpload(learningMaterialInput);
      await fileHandler(files, learningMaterial.data);
      snackbar({ variant: 'success', message: '업로드 되었습니다.' });
      router.push(`/admin-center/learning-material`);
      setLoading(false);
    } catch (e) {
      console.error(e);
      snackbar({ variant: 'error', message: '업로드에 실패했습니다.' });
      setLoading(false);
    }
  };

  return (
    <Container className={styles.globalContainer}>
      <LearningMaterialUploadForm
        onHandleSubmit={handleSubmit}
        loading={loading}
      />
    </Container>
  );
}
