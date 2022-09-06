import { detailCourseInfo } from '@common/api/adm/learningInfo';
import { useSnackbar } from '@hooks/useSnackbar';
import { Box, Tab, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useRouter } from 'next/router';
import { css } from '@emotion/css';
import styled from '@emotion/styled';

export function ProgressStatus() {
  const router = useRouter();
  const snackbar = useSnackbar();
  const { courseUserSeq } = router.query;
  const { data, error } = detailCourseInfo(Number(courseUserSeq));

  return (
    <ProgressStatusBox>
      <TableHeadFull colSpan={4} sx={{ display: 'table', width: '100%' }}>
        진도현황
      </TableHeadFull>
      <TableBody className={pt20} sx={{ display: 'table', width: '100%' }}>
        <TableRow>
          <TableLeftCell>1</TableLeftCell>
          <TableTitleCell>2</TableTitleCell>
          <TableLineCell>2</TableLineCell>
          <TableLineCell>2</TableLineCell>
          <TableLineCell>2</TableLineCell>
          <TableLineCell>2</TableLineCell>
          <TableLineCell>2</TableLineCell>
          <TableLineCell>2</TableLineCell>
          <TableLineCell>2</TableLineCell>
          <TableLineCell>2</TableLineCell>
        </TableRow>
      </TableBody>

      <TableBody className={pt20} sx={{ display: 'table', width: '100%' }}>
        <TableRow>
          <TableLeftCell>1</TableLeftCell>
          <TableTitleCell>2</TableTitleCell>
          <TableLineCell>2</TableLineCell>
          <TableLineCell>2</TableLineCell>
          <TableLineCell>2</TableLineCell>
          <TableLineCell>2</TableLineCell>
          <TableLineCell>2</TableLineCell>
          <TableLineCell>2</TableLineCell>
          <TableLineCell>2</TableLineCell>
          <TableLineCell>2</TableLineCell>
        </TableRow>
      </TableBody>
    </ProgressStatusBox>
  );
}

const ProgressStatusBox = styled(Box)`
  margin-top: 10px;
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
  width: 5%;
  background: #f5f5f5;
  /* border-top: 1px solid #c4c4c4; */
  border-right: 1px solid #c4c4c4;
  /* border-left: 1px solid #c4c4c4; */
  border-bottom: 1px solid #c4c4c4;
  font-weight: 400;
`;

const TableTitleCell = styled(TableCell)`
  border-left: 1px solid #c4c4c4;
  width: 55%;
`;
const TableLineCell = styled(TableCell)`
  border-right: 1px solid #c4c4c4;
  border-left: 1px solid #c4c4c4;
  width: 5%;
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
