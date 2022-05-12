import { FormEvent } from 'react';
import { modifyCourse, useCourse } from '@common/api/course';
import { CourseUploadForm } from '@layouts/AdminCenter/CourseUploadForm';
import { useRouter } from 'next/router';

export function CourseModify() {
  const router = useRouter();
  const { courseId } = router.query;
  const { data, isError, isLoading } = useCourse({ courseId: Number(courseId) });

  const handleSubmit = (e: FormEvent<HTMLFormElement>, formData: FormData) => {
    e.preventDefault();
    try {
      return modifyCourse(formData);
    } catch (e: any) {
      console.error(e);
    }
  };

  if (isError) return <div>...ERROR</div>;
  if (isLoading) return <div>...loading</div>;
  return (
    <CourseUploadForm
      mode="modify"
      course={data}
      onHandleSubmit={handleSubmit}
    />
  );
}
