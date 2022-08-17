import { BbsType, deleteFile, uploadFile } from '@common/api/adm/file';
import {
  learningMaterialDetail,
  LearningMaterialInput,
  learningMaterialModify,
  learningMaterialUpload,
} from '@common/api/learningMaterial';
import { LearningMaterialUploadForm } from '@components/admin-center/LearningMaterialUploadForm';
import { useSnackbar } from '@hooks/useSnackbar';
import { Container } from '@mui/material';
import router, { useRouter } from 'next/router';
import styles from '@styles/common.module.scss';

export function LearningMaterialModify() {
  const router = useRouter();
  const snackbar = useSnackbar();
  const lm = router.query;
  const { data, error } = learningMaterialDetail(Number(lm.lmSeq));

  console.log(data);

  const handleSubmit = async ({
    files,
    learningMaterialInput,
  }: {
    files: File[];
    learningMaterialInput: LearningMaterialInput;
  }) => {
    try {
      if (data?.seq) {
        await learningMaterialModify({ seq: data?.seq, learningMaterialInput });
        await fileHandler(files);
        snackbar({ variant: 'success', message: '수정 되었습니다.' });
        router.push(`/admin-center/learning-material`);
      }
    } catch (e: any) {
      console.error(e);
      snackbar({ variant: 'error', message: '수정에 실패했습니다.' });
    }
  };

  const fileHandler = async (files: File[]) => {
    if (files == undefined) {
      await deleteFile({
        fileTypeId: data?.seq,
        fileType: BbsType.TYPE_LEARNING_MATERIAL,
        fileSeqList: data.s3Files.map(v => v.seq),
      });
    } else if (files.length > 0) {
      await deleteFile({
        fileTypeId: data?.seq,
        fileType: BbsType.TYPE_LEARNING_MATERIAL,
        fileSeqList: data.s3Files.map(v => v.seq),
      });
      await uploadFile({
        fileTypeId: data?.seq,
        fileType: BbsType.TYPE_LEARNING_MATERIAL,
        files,
      });
    }
  };

  return (
    <Container className={styles.globalContainer}>
      <LearningMaterialUploadForm
        mode="modify"
        learningMaterial={data}
        onHandleSubmit={handleSubmit}
      />
    </Container>
  );
}
