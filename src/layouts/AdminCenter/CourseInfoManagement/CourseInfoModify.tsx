import { detailCourseInfo } from '@common/api/adm/learningInfo';
import { useSnackbar } from '@hooks/useSnackbar';
import { Box, Tab, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useRouter } from 'next/router';
import { css } from '@emotion/css';
import styled from '@emotion/styled';
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

  console.log('course info modify 데이터 : ', data);
  console.log('차량번호 : ', data?.courseInfo?.carNumber);

  const onMutate = () => {
    mutate();
  };

  if (!data) return <Spinner />;

  return (
    <Box>
      <CourseInformation courseInfo={data?.courseInfo} />
      <LearningStatus learningStatusList={data?.learningStatusList} />
      <ProgressStatus progressList={data.progressStatusList} onMutate={onMutate} />
    </Box>
  );
}

const LearningCourseTableBox = styled(Box)`
  border: 3px solid black;
  box-sizing: border-box;
`;

const TableHeadFull = styled(TableCell)`
  width: 100%;
  background: #f5f5f5;
  border-top: 1px solid #c4c4c4;
  border-right: 1px solid #c4c4c4;
  border-left: 1px solid #c4c4c4;
  /* border-bottom: 1px solid #c4c4c4; */
  font-weight: 400;
`;

const TableLeftCell = styled(TableCell)`
  width: 10%;
  background: #f5f5f5;
  /* border-top: 1px solid #c4c4c4; */
  border-right: 1px solid #c4c4c4;
  border-left: 1px solid #c4c4c4;
  border-bottom: 1px solid #c4c4c4;
  font-weight: 400;
`;

const TableRightCell = styled(TableCell)`
  width: 40%;
  /* border-top: 1px solid #c4c4c4; */
  border-bottom: 1px solid #c4c4c4;
  border-right: 1px solid #c4c4c4;
  font-weight: 400;
`;
const pt20 = css`
  border: 1px solid #b4b4b4;
`;
