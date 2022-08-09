import { CourseUploadForm } from '@components/admin-center';
import styles from '@styles/common.module.scss';
import { Container } from '@mui/material';
import { uploadCourse } from '@common/api/adm/course';
import { CourseInput, CourseRes } from '@common/api/course';
import { BbsType, uploadFile } from '@common/api/adm/file';
import { useSnackbar } from '@hooks/useSnackbar';
import router from 'next/router';

export function CourseUpload() {

  const snackbar = useSnackbar();

  const fileHandler = async (files: File[], course: CourseRes) => {
    const isFileUpload = files.length > 0;
    if (isFileUpload) {
      await uploadFile({
        fileTypeId: course.seq,
        fileType: BbsType.TYPE_COURSE,
        files
      });
    }
  };

  const handleSubmit = async ({ files, courseInput, isFileDelete }: {
    files: File[],
    courseInput: CourseInput,
    isFileDelete: boolean;
  }) => {
    try {
      const course = await uploadCourse(courseInput);
      await fileHandler(files, course.data);
      snackbar({ variant: 'success', message: '업로드 되었습니다.' });
      router.push(`/admin-center/course`);
    } catch (e: any) {
      console.error(e);
    }
  };

  return (
    <Container className={styles.globalContainer}>
      <CourseUploadForm onHandleSubmit={handleSubmit} />
    </Container>
  );
}
