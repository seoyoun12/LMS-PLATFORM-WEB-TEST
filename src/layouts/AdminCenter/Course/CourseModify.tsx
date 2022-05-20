import { FormEvent } from 'react';
import { modifyCourse, useCourse } from '@common/api/course';
import { useRouter } from 'next/router';
import { CourseUploadForm } from '@components/admin-center/CourseUploadForm';
import { Tabs } from '@components/ui';
import styles from '@styles/common.module.scss';
import { Box, Container } from '@mui/material';
import { LessonList } from '@layouts/AdminCenter';
import { useSnackbar } from '@hooks/useSnackbar';
import { EvaluationInfo } from '@layouts/AdminCenter/Course/EvaluationInfo';

enum TabValue {
  CourseInfo = 'course-info',
  LessonList = 'lesson-list',
  EvaluationInfo = 'evaluation-info',
}

const tabsConfig = [
  { label: '과정 정보', value: TabValue.CourseInfo },
  { label: '강의 목차', value: TabValue.LessonList },
  { label: '평가 정보', value: TabValue.EvaluationInfo },
];

export function CourseModify() {
  const router = useRouter();
  const snackbar = useSnackbar();
  const { courseId, tab } = router.query;
  const { data, isError, isLoading } = useCourse({ courseId: Number(courseId) });

  const handleSubmit = async ({ event, courseInput, courseId }: {
    event: FormEvent<HTMLFormElement>,
    courseInput: FormData,
    courseId?: number
  }) => {
    event.preventDefault();
    try {
      if (courseId) {
        await modifyCourse({ courseInput, courseId });
        snackbar({ variant: 'success', message: '성공적으로 수정되었습니다.' });
        router.push('/admin-center/course');
      }
    } catch (e: any) {
      snackbar({ variant: 'error', message: e.data.message });
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
          [TabValue.CourseInfo]:
            <CourseUploadForm
              mode="modify"
              course={data}
              onHandleSubmit={handleSubmit}
            />,
          [TabValue.LessonList]:
            <LessonList />,
          [TabValue.EvaluationInfo]:
            <EvaluationInfo />,
        }[tab as string]
      }
    </Container>
  );
}
