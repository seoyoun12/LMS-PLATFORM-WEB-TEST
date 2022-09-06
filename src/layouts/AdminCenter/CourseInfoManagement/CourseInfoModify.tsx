import { detailCourseInfo } from '@common/api/adm/learningInfo';
import { useSnackbar } from '@hooks/useSnackbar';
import { Box, Tab, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useRouter } from 'next/router';
import { css } from '@emotion/css';
import styled from '@emotion/styled';
import { CourseInfomation } from '@components/admin-center/CourseInfo/CourseInfomation';
import { LearningStatus } from '@components/admin-center/CourseInfo/LearningStatus';
import { ProgressStatus } from '@components/admin-center/CourseInfo/ProgressStatus';

export function CourseInfoModify() {
  const router = useRouter();
  const snackbar = useSnackbar();
  const { courseUserSeq } = router.query; // const {courseUserSeq} = router.query; {} 차이?
  // const { data, error } = detailCourseInfo({ courseUserSeq: Number(courseUserSeq) }); // 비구조화할당?
  const { data, error } = detailCourseInfo(Number(courseUserSeq));

  console.log('라우터 : ', router);
  console.log('라우터쿼리 : ', router.query);
  console.log('courseUserSeq:', courseUserSeq);
  console.log('data:', data);

  return (
    <Box>
      <CourseInfomation />
      <LearningStatus />
      <ProgressStatus />
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
