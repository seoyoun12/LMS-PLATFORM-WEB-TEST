import { courseTrafficUpload } from '@common/api/adm/course-traffic';
import { BbsType, uploadFile } from '@common/api/adm/file';
import {
  ProvincialBoardResponseDto,
  ProvincialBoardSaveRequestDto,
} from '@common/api/Api';
import { CourseTrafficUploadForm } from '@components/admin-center/CourseTrafficUploadForm';
import { useSnackbar } from '@hooks/useSnackbar';
import { Container } from '@mui/material';
import styles from '@styles/common.module.scss';
import router from 'next/router';

export function CourseTrafficUpload() {
  const snackbar = useSnackbar();
  const fileHandler = async (
    files: File[],
    courseTraffic: ProvincialBoardResponseDto
  ) => {
    const isFileUpload = files.length > 0;
    if (isFileUpload) {
      await uploadFile({
        fileTypeId: courseTraffic.seq,
        fileType: BbsType.TYPE_COURSE,
        files,
      });
    }
  };

  const handleSubmit = async ({
    files,
    courseTrafficInput,
    isFileDelete,
    setLoading,
  }: {
    files: File[];
    courseTrafficInput: ProvincialBoardSaveRequestDto;
    isFileDelete: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {
    try {
      setLoading(true);
      const course = await courseTrafficUpload(courseTrafficInput);
      await fileHandler(files, course.data);
      snackbar({ variant: 'success', message: '업로드 되었습니다.' });
      router.push(`/admin-center/course`);
      setLoading(false);
    } catch (e: any) {
      console.error(e);
      snackbar({ variant: 'error', message: '업로드에 실패했습니다.' });
      setLoading(false);
    }
  };

  return (
    <Container className={styles.globalContainer}>
      <CourseTrafficUploadForm onHandleSubmit={handleSubmit} />
    </Container>
  );
}
