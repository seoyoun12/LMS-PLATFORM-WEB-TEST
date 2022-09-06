import { detailCourseInfo } from '@common/api/adm/learningInfo';
import { useSnackbar } from '@hooks/useSnackbar';
import { Box, Tab, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useRouter } from 'next/router';
import { css } from '@emotion/css';
import styled from '@emotion/styled';

export function CourseInfomation() {
  const router = useRouter();
  const snackbar = useSnackbar();
  const { courseUserSeq } = router.query;
  const { data, error } = detailCourseInfo(Number(courseUserSeq));

  return (
    <CourseInfomationBox>
      <TableHeadFull colSpan={4} sx={{ display: 'table', width: '100%' }}>
        수강정보
      </TableHeadFull>
      <TableBody className={pt20} sx={{ display: 'table', width: '100%' }}>
        <TableRow>
          <TableLeftCell>1</TableLeftCell>
          <TableRightCell>2</TableRightCell>
          <TableLeftCell>1</TableLeftCell>
          <TableRightCell>2</TableRightCell>
        </TableRow>
        <TableRow>
          <TableLeftCell>1</TableLeftCell>
          <TableRightCell>2</TableRightCell>
          <TableLeftCell>1</TableLeftCell>
          <TableRightCell>2</TableRightCell>
        </TableRow>
        <TableRow>
          <TableLeftCell>1</TableLeftCell>
          <TableRightCell>2</TableRightCell>
          <TableLeftCell>1</TableLeftCell>
          <TableRightCell>2</TableRightCell>
        </TableRow>
        <TableRow>
          <TableLeftCell>1</TableLeftCell>
          <TableRightCell>2</TableRightCell>
          <TableLeftCell>1</TableLeftCell>
          <TableRightCell>2</TableRightCell>
        </TableRow>
      </TableBody>
    </CourseInfomationBox>
  );
}

const CourseInfomationBox = styled(Box)``;

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
  /* border-left: 1px solid #c4c4c4; */
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
