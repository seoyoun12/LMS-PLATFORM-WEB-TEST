import { FormEvent } from 'react';
import { uploadCourse } from '@common/api/course';
import { CourseUploadForm } from '@layouts/AdminCenter/Course/CourseUploadForm';
import styles from '@styles/common.module.scss';
import { Container } from '@mui/material';

export function CourseUpload() {
  const handleSubmit = (
    {
      event,
      formData
    }: { event: FormEvent<HTMLFormElement>, formData: FormData }) => {
    event.preventDefault();
    try {
      return uploadCourse(formData);
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
