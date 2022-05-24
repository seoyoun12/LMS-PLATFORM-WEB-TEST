import { useRouter } from 'next/router';
import { Tabs } from '@components/ui';
import styles from '@styles/common.module.scss';
import { Box, Container } from '@mui/material';
import { ContentUploadForm } from '@layouts/AdminCenter';
import { useSnackbar } from '@hooks/useSnackbar';
import { ContentInput, modifyContent, useContent } from '@common/api/content';
import { Question } from './Question';
import { Examination } from './Examination';
import { Homework } from './Homework';
import { Forum } from './Forum';
import { LessonList } from './LessonList';
import { Spinner } from '@components/ui';


enum TabValue {
  ContentInfo = 'content-info',
  LessonList = 'lesson-list',
  Question = 'question',
  Exam = 'exam',
  Homework = 'homework',
  Forum = 'forum',
}

const tabsConfig = [
  { label: '콘텐츠 정보', value: TabValue.ContentInfo },
  { label: '강의 목차', value: TabValue.LessonList },
  { label: '문제은행', value: TabValue.Question },
  { label: '시험', value: TabValue.Exam },
  { label: '과제', value: TabValue.Homework },
  { label: '토론', value: TabValue.Forum },
];

export function ContentModify() {
  const router = useRouter();
  const snackbar = useSnackbar();
  const { contentId, tab } = router.query;
  const { data, error } = useContent(Number(contentId));

  const handleSubmit = async ({ contentInput, contentId }: {
    contentInput: ContentInput,
    contentId?: number
  }) => {
    try {
      if (contentId) {
        await modifyContent({ contentInput, contentId });
        snackbar({ variant: 'success', message: '성공적으로 수정되었습니다.' });
        router.push('/admin-center/content');
      }
    } catch (e: any) {
      console.error(e);
    }
  };

  if (error) return <div>error</div>;
  if (!data) return <Spinner />;
  return (
    <Container className={styles.globalContainer}>
      <Box sx={{ mb: '30px' }}>
        <Tabs tabsConfig={tabsConfig} />
      </Box>
      {
        {
          [TabValue.ContentInfo]:
            <ContentUploadForm
              mode="modify"
              onHandleSubmit={handleSubmit}
              content={data}
            />,
          [TabValue.LessonList]:
            <LessonList />,
          [TabValue.Question]:
            <Question />,
          [TabValue.Exam]:
            <Examination />,
          [TabValue.Homework]:
            <Homework />,
          [TabValue.Forum]:
            <Forum />,
        }[tab as string]
      }
    </Container>
  );
}
