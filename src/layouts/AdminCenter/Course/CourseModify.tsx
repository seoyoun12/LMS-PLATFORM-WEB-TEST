import { FormEvent } from 'react';
import { modifyCourse, useCourse } from '@common/api/course';
import { useRouter } from 'next/router';
import { CourseUploadForm } from '@layouts/AdminCenter/Course/CourseUploadForm';
import { useDialog } from '@hooks/useDialog';

export function CourseModify() {
  const router = useRouter();
  const dialog = useDialog();
  const { courseId } = router.query;
  const { data, isError, isLoading } = useCourse({ courseId: Number(courseId) });

  const handleSubmit = async (
    {
      event,
      formData,
      courseId
    }: { event: FormEvent<HTMLFormElement>, formData: FormData, courseId: number }) => {
    event.preventDefault();
    try {
      await dialog({
        variant: 'confirm',
        title: 'dialog test',
        description: 'dialog test descript'
      });

      return modifyCourse({ formData, courseId });
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
