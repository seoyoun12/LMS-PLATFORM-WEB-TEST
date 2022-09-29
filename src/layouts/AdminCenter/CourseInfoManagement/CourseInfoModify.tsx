import {
  CourseLearningInfoInput,
  detailCourseInfo,
  modifyLearningInfo,
} from '@common/api/adm/learningInfo';
import { useSnackbar } from '@hooks/useSnackbar';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { CourseInformation } from '@components/admin-center/CourseInfo/CourseInfomation';
import { EnrollInformation } from '@components/admin-center/CourseInfo/EnrollInformation';
import { LearningStatus } from '@components/admin-center/CourseInfo/LearningStatus';
import { ProgressStatus } from '@components/admin-center/CourseInfo/ProgressStatus';
import { Spinner } from '@components/ui';

export function CourseInfoModify() {
  const router = useRouter();
  const snackbar = useSnackbar();
  const { courseUserSeq } = router.query; // const {courseUserSeq} = router.query; {} 차이?
  // const { data, error } = detailCourseInfo({ courseUserSeq: Number(courseUserSeq) }); // 비구조화할당?
  const { data, error, mutate } = detailCourseInfo(Number(courseUserSeq));

  console.log('학습현황 상세정보 : ', data);

  const handleSubmit = async ({
    courseLearningInfoInput,
    setLoading,
  }: {
    courseLearningInfoInput: CourseLearningInfoInput;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {
    try {
      setLoading(true);
      if (Number(courseUserSeq)) {
        await modifyLearningInfo({
          courseUserSeq: Number(courseUserSeq),
          courseLearningInfoInput,
        });
        console.log('1. courseLearningInfoInput : ', courseLearningInfoInput);
        snackbar({ variant: 'success', message: '수정 되었습니다.' });
        await mutate();
        router.push(`/admin-center/course-info`);
        // router.push(`/admin-center/course-info/modify/${courseUserSeq}`);
        setLoading(false);
      }
    } catch (e: any) {
      console.error(e);
      snackbar({ variant: 'error', message: '수정에 실패했습니다.' });
      await mutate();
      setLoading(false);
    }
  };

  console.log('course info modify 데이터 : ', data);
  console.log('차량번호 : ', data?.courseInfo?.carNumber);

  const onMutate = () => {
    mutate();
  };

  if (error) return <div>...ERROR</div>;
  if (!data) return <Spinner />;

  return (
    <Box>
      <CourseInformation courseInfo={data?.courseInfo} onHandleSubmit={handleSubmit} />
      <LearningStatus learningStatusList={data?.learningStatusList} />
      <ProgressStatus progressList={data.progressStatusList} onMutate={onMutate} />
    </Box>
  );
}
