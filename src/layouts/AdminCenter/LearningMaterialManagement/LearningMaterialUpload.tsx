import { BbsType, uploadFile } from '@common/api/adm/file';
import {
  LearningMaterialInput,
  learningMaterialUpload,
} from '@common/api/learningMaterial';
import { LearningMaterialUploadForm } from '@components/admin-center/LearningMaterialUploadForm';
import { useSnackbar } from '@hooks/useSnackbar';
import { Container } from '@mui/material';
import router from 'next/router';
import styles from '@styles/common.module.scss';

export function LearningMaterialUpload() {
  const snackbar = useSnackbar();

  const fileHandler = async (
    files: File[],
    learningMaterialInput: LearningMaterialInput
  ) => {
    const isFileUpload = files.length > 0;
    if (isFileUpload) {
      await uploadFile({
        fileTypeId: learningMaterialInput.seq,
        fileType: BbsType.TYPE_LEARNING_MATERIAL,
        files,
      });
    }
  };

  const handleSubmit = async ({
    files,
    learningMaterialInput,
  }: {
    files: File[];
    learningMaterialInput: LearningMaterialInput;
  }) => {
    try {
      const learningMaterial = await learningMaterialUpload(learningMaterialInput);
      await fileHandler(files, learningMaterial.data);
      snackbar({ variant: 'success', message: '업로드 되었습니다.' });
      router.push(`/admin-center/learning-material`);
    } catch (e: any) {
      console.error(e);
      snackbar({ variant: 'error', message: '업로드에 실패했습니다.' });
    }
  };

  return (
    <Container className={styles.globalContainer}>
      <LearningMaterialUploadForm onHandleSubmit={handleSubmit} />
    </Container>
  );
}
