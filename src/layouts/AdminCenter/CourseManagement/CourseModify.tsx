import { useRouter } from 'next/router';
import { CourseUploadForm } from '@components/admin-center/CourseUploadForm';
import { Spinner, Tabs } from '@components/ui';
import styles from '@styles/common.module.scss';
import { Box, Container } from '@mui/material';
import { ContentList, Library } from '@layouts/AdminCenter';
import { useSnackbar } from '@hooks/useSnackbar';
import { EvaluationInfo } from '@layouts/AdminCenter/CourseManagement/EvaluationInfo';
import { Forum } from '@layouts/AdminCenter/CourseManagement/Forum';
import { useCourse } from '@common/api/adm/course';
import { Course, courseDetail, CourseInput, courseModify } from '@common/api/course';
import { BbsType, deleteFile, uploadFile } from '@common/api/adm/file';


enum TabValue {
  CourseInfo = 'course-info',
  ContentList = 'content-list',
  EvaluationInfo = 'evaluation-info',
  Forum = 'forum',
  Library = 'library'
}

const tabsConfig = [
  { label: '과정 정보', value: TabValue.CourseInfo },
  { label: '콘텐츠 목록', value: TabValue.ContentList },
  { label: '평가 정보', value: TabValue.EvaluationInfo },
  { label: '토론', value: TabValue.Forum },
  { label: '강의자료', value: TabValue.Library }
];

export function CourseModify() {
  const router = useRouter();
  const snackbar = useSnackbar();
  const { courseSeq, tab } = router.query;
  const { data, error } = courseDetail(Number(courseSeq));


  console.log("Course -> courseSeq : ", courseSeq);
  console.log("Course -> tab :", tab);
  console.log("Course -> data : ", data);



  const fileHandler = async (files: File[], course: Course, isFileDelete: boolean) => {
    const isFileUpload = files.length > 0;
    if (isFileUpload) {
      await uploadFile({
        fileTypeId: course.seq,
        fileType: BbsType.TYPE_COURSE,
        files
      });
    } else {
      if (isFileDelete) {
        await deleteFile({
          fileTypeId: course.seq,
          fileType: BbsType.TYPE_COURSE,
          fileSeqList: course.s3Files.map(v => v.seq),
        });
      }
    }
  };

  const handleSubmit = async ({ files, isFileDelete, courseInput, seq }: {
    files: File[];
    isFileDelete: boolean;
    courseInput: CourseInput;
    seq?: number;
  }) => {
    try {
      if (courseSeq) {
        const course = await courseModify({ seq, courseInput });
        await fileHandler(files, course.data, isFileDelete);
        snackbar({ variant: 'success', message: '성공적으로 수정되었습니다.' });
        router.push('/admin-center/course');
      }
    } catch (e: any) {
      snackbar({ variant: 'error', message: e.data.message });
    }
  };

  if (error) return <div>...ERROR</div>;
  if (!data) return <Spinner />;

  return (
    <Container className={styles.globalContainer}>
      <Box sx={{ mb: '30px' }}>
        <Tabs tabsConfig={tabsConfig} variant={'standard'} />
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
            <Forum />,
          [TabValue.Library]:
            <Library />
        }[tab as string]
      }
    </Container>
  );
}
