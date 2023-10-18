import { BbsType, deleteFile, uploadFile } from '@common/api/adm/file';
import { learningMaterialDetail,LearningMaterialInput,learningMaterialModify } from '@common/api/learningMaterial';
import { FileArrayType,LearningMaterialUploadForm } from '@components/admin-center/LearningMaterialUploadForm';
import { useSnackbar } from '@hooks/useSnackbar';
import { Container } from '@mui/material';
import { useRouter } from 'next/router';
import styles from '@styles/common.module.scss';
import { useState } from 'react';


export function LearningMaterialModify() {const router = useRouter();
  const snackbar = useSnackbar();
  const lm = router.query;
  const { data, mutate } = learningMaterialDetail(Number(lm.lmSeq));
  const [loading, setLoading] = useState(false);

  const handleSubmit = async ({ files,learningMaterialInput,serverFilesRemoved }: {files: File[];learningMaterialInput: LearningMaterialInput;serverFilesRemoved?: FileArrayType[]  }) => {
    try {
      if (data?.seq) {
        setLoading(true);
        await learningMaterialModify({ seq: data?.seq, learningMaterialInput });
        await fileHandler(files, serverFilesRemoved);
        snackbar({ variant: 'success', message: '수정 되었습니다.' });
        await mutate();
        router.push(`/admin-center/learning-material`);
        await mutate();
        setLoading(false);
      }
    } catch (e) {
      snackbar({ variant: 'error', message: '수정에 실패했습니다.' });
      setLoading(false);
    }
  };

  const fileHandler = async (
    files: File[],
    serverFilesRemoved?: FileArrayType[]
  ) => {
    
    if (serverFilesRemoved && serverFilesRemoved.length > 0) {
      await deleteFile({
        fileTypeId: data?.seq,
        fileType: BbsType.TYPE_LEARNING_MATERIAL,
        fileSeqList: serverFilesRemoved.map(r => r.seq),
      });
    }
    if (files && files.length > 0) {
      // const convertFiles = Array.from(files)
      files.forEach(async (r, idx) => {
        await uploadFile({
          fileTypeId: data?.seq,
          fileType: BbsType.TYPE_LEARNING_MATERIAL,
          files,
          idx,
        });
      });
    }

    await mutate();
  };

  return (
    <Container className={styles.globalContainer}>
      <LearningMaterialUploadForm
        mode="modify"
        learningMaterial={data}
        onHandleSubmit={handleSubmit}
        loading={loading}
      />
    </Container>
  );
}
