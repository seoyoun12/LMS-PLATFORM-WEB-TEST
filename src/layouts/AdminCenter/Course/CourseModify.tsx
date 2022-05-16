import { FormEvent } from 'react';
import { modifyCourse, useCourse } from '@common/api/course';
import { useRouter } from 'next/router';
import { CourseUploadForm } from '@layouts/AdminCenter/Course/CourseUploadForm';
import { useDialog } from '@hooks/useDialog';
import { Tabs } from '@components/ui';
import styles from '@styles/common.module.scss';
import { Box, Container } from '@mui/material';
import { LectureList } from '@layouts/AdminCenter';

const tabsConfig = [
  { label: '과정 정보', value: 'course-info' },
  { label: '강의 목차', value: 'lecture-list' },
  { label: '평가 정보', value: 'evaluation-info' },
];

export function CourseModify() {
  const router = useRouter();
  const dialog = useDialog();
  const { courseId, tab } = router.query;
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
    <Container className={styles.globalContainer}>
      <Box sx={{ mb: '30px' }}>
        <Tabs tabsConfig={tabsConfig} />
      </Box>
      {
        {
          'course-info':
            <CourseUploadForm
              mode="modify"
              course={data}
              onHandleSubmit={handleSubmit}
            />,
          'lecture-list':
            <LectureList />,
          'evaluation-info':
            <CourseUploadForm
              mode="modify"
              course={data}
              onHandleSubmit={handleSubmit}
            />,
        }[tab as string]
      }
    </Container>
  );
}
