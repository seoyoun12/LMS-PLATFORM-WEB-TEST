import {
  CourseLearningInfoInput,
  detailCourseInfo,
  modifyLearningInfo,
} from '@common/api/adm/learningInfo';
import { useSnackbar } from '@hooks/useSnackbar';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { CourseInfomationTraffic } from '@components/admin-center/CourseInfoTraffic/CourseInfomationTraffic';
import { EnrollInformation } from '@components/admin-center/CourseInfo/EnrollInformation';
import { LearningStatus } from '@components/admin-center/CourseInfo/LearningStatus';
import { ProgressStatus } from '@components/admin-center/CourseInfo/ProgressStatus';
import { Spinner } from '@components/ui';
import { useCourseInfoTrafficDetail } from '@common/api/adm/courseInfoTraffic';

export function CourseInfoTrafficModify() {
  const router = useRouter();
  const snackbar = useSnackbar();
  const { enrollSeq } = router.query; // const {courseUserSeq} = router.query; {} 차이?
  // const { data, error } = detailCourseInfo({ courseUserSeq: Number(courseUserSeq) }); // 비구조화할당?
  const { data, error, mutate } = useCourseInfoTrafficDetail(Number(enrollSeq));

  const handleSubmit = async ({
    courseLearningInfoInput,
    setLoading,
  }: {
    courseLearningInfoInput: CourseLearningInfoInput;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {
    // console.log('courseLearningInfoInput 부모 : ', courseLearningInfoInput);
    try {
      setLoading(true);
      if (Number(enrollSeq)) {
        // await modifyLearningInfo({
        //   enrollSeq: Number(enrollSeq),
        //   courseLearningInfoInput,
        // });
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

  const onMutate = () => {
    mutate();
  };

  if (error) return <div>...ERROR</div>;
  if (!data) return <Spinner />;

  return (
    <Box>
      <CourseInfomationTraffic
        enrollInfo={data}
        onHandleSubmit={handleSubmit}
      />
      {/* <LearningStatus learningStatusList={data?.learningStatusList} />
      <ProgressStatus
        progressList={data.progressStatusList}
        onMutate={onMutate}
      /> */}
    </Box>
  );
}
