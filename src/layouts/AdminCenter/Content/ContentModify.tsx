import { FormEvent } from 'react';
import { modifyCourse, useCourse } from '@common/api/course';
import { useRouter } from 'next/router';
import { CourseUploadForm } from '@layouts/AdminCenter/Course/CourseUploadForm';
import { Tabs } from '@components/ui';
import styles from '@styles/common.module.scss';
import { Box, Container } from '@mui/material';
import { ContentUploadForm, LectureList } from '@layouts/AdminCenter';
import { useSnackbar } from '@hooks/useSnackbar';
import { EvaluationInfo } from '@layouts/AdminCenter/Course/EvaluationInfo';
import { ContentInput, modifyContent, useContent } from '@common/api/contentData';

const tabsConfig = [
  { label: '콘텐츠 정보', value: 'content-info' },
  { label: '강의 목차', value: 'lecture-list' },
  { label: '문제은행', value: 'question' },
  { label: '시험', value: 'exam' },
  { label: '과제', value: 'homework' },
  { label: '토론', value: 'forum' },
];

export function ContentModify() {
  const router = useRouter();
  const snackbar = useSnackbar();
  const { contentId, tab } = router.query;
  const { data, error } = useContent(Number(contentId));

  const handleSubmit = async ({ contentInput, contentId }: {
    contentInput: ContentInput,
    contentId: number
  }) => {
    try {
      await modifyContent({ contentInput, contentId });
      snackbar({ variant: 'success', message: '성공적으로 수정되었습니다.' });
      router.push('/admin-center/course');
    } catch (e: any) {
      console.error(e);
    }
  };

  if (error) return <div>error</div>;
  if (!data) return <div>loading</div>;
  return (
    <Container className={styles.globalContainer}>
      <Box sx={{ mb: '30px' }}>
        <Tabs tabsConfig={tabsConfig} />
      </Box>
      {
        {
          'content-info':
            <ContentUploadForm
              mode="modify"
              onHandleSubmit={handleSubmit}
              content={data.data}
            />,
          'lecture-list':
            <LectureList />,
          'evaluation-info':
            <EvaluationInfo />,
        }[tab as string]
      }
    </Container>
  );
}
