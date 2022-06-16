import { BaseSyntheticEvent } from 'react';
import { modifyCourse, useCourse } from '@common/api/course';
import { useRouter } from 'next/router';
import { CourseUploadForm } from '@components/admin-center/CourseUploadForm';
import { Tabs } from '@components/ui';
import styles from '@styles/common.module.scss';
import { Box, Container } from '@mui/material';
import { ContentList } from '@layouts/AdminCenter';
import { useSnackbar } from '@hooks/useSnackbar';
import { EvaluationInfo } from '@layouts/AdminCenter/CourseManagement/EvaluationInfo';
import { Forum } from '@layouts/AdminCenter/CourseManagement/Forum';

enum TabValue {
  CourseInfo = 'course-info',
  ContentList = 'content-list',
  EvaluationInfo = 'evaluation-info',
  Forum = 'forum',
}

const tabsConfig = [
  { label: '과정 정보', value: TabValue.CourseInfo },
  { label: '콘텐츠 목록', value: TabValue.ContentList },
  { label: '평가 정보', value: TabValue.EvaluationInfo },
  { label: '토론', value: TabValue.Forum },
];

export function CourseModify() {
  const router = useRouter();
  const snackbar = useSnackbar();
  const { courseId, tab } = router.query;
  const { data, isError, isLoading } = useCourse(Number(courseId));

  const handleSubmit = async ({ event, courseInput, courseId }: {
    event?: BaseSyntheticEvent,
    courseInput: FormData,
    courseId?: number
  }) => {
    event?.preventDefault();
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
          [TabValue.ContentList]:
            <ContentList />,
          [TabValue.EvaluationInfo]:
            <EvaluationInfo />,
          [TabValue.Forum]:
            <Forum />
        }[tab as string]
      }
    </Container>
  );
}
