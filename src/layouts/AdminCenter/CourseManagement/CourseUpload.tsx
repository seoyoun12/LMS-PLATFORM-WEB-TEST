import { BaseSyntheticEvent } from 'react';
import { CourseUploadForm } from '@components/admin-center';
import styles from '@styles/common.module.scss';
import { Container } from '@mui/material';
import { uploadCourse } from '@common/api/adm/course';

export function CourseUpload() {
  const handleSubmit = ({ event, courseInput }: {
    event?: BaseSyntheticEvent,
    courseInput: FormData
  }) => {
    event?.preventDefault();
    try {
      return uploadCourse(courseInput);
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
