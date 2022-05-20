import { FormEvent } from 'react';
import { uploadCourse } from '@common/api/course';
import { CourseUploadForm } from '@components/admin-center/CourseUploadForm';
import styles from '@styles/common.module.scss';
import { Container } from '@mui/material';

export function CourseUpload() {
  const handleSubmit = ({ event, courseInput }: {
    event: FormEvent<HTMLFormElement>,
    courseInput: FormData
  }) => {
    event.preventDefault();
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
