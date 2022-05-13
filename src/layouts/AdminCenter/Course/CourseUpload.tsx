import { FormEvent } from 'react';
import { uploadCourse } from '@common/api/course';
import { CourseUploadForm } from '@layouts/AdminCenter/Course/CourseUploadForm';

export function CourseUpload() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>, formData: FormData) => {
    e.preventDefault();
    try {
      return uploadCourse(formData);
    } catch (e: any) {
      console.error(e);
    }
  };


  return (
    <CourseUploadForm onHandleSubmit={handleSubmit} />
  );
}
