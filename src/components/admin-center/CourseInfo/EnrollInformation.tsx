import { detailCourseInfo } from '@common/api/adm/learningInfo';
import { useSnackbar } from '@hooks/useSnackbar';
import { Box, Tab, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useRouter } from 'next/router';
import { css } from '@emotion/css';
import styled from '@emotion/styled';
import { UserCourseInfoDetailCourseInfoDto } from '@common/api/Api';

export function EnrollInformation() {
  return (
    <EnrollInformationBox>
      <TableHeadFull colSpan={4} sx={{ display: 'table', width: '100%' }}>
        업체정보
      </TableHeadFull>

      <TableBody sx={{ display: 'table', width: '100%' }}>
        <TableRow>
          <TableLeftCell align="center">업종구분</TableLeftCell>
          <TableRightCell>1</TableRightCell>
          <TableLeftCell align="center">회사명</TableLeftCell>
          <TableRightCell>2</TableRightCell>
        </TableRow>
        <TableRow>
          <TableLeftCell align="center">차량번호</TableLeftCell>
          <TableRightCell>3</TableRightCell>
          <TableLeftCell align="center">차량등록지</TableLeftCell>
          <TableRightCell>4</TableRightCell>
        </TableRow>
      </TableBody>

      <TableHeadFull
        colSpan={4}
        sx={{ display: 'table', width: '100%', marginTop: '10px' }}
      >
        교육신청자 정보
      </TableHeadFull>

      <TableBody sx={{ display: 'table', width: '100%' }}>
        <TableRow>
          <TableLeftCell align="center">거주지</TableLeftCell>
          <TableRightCell>5</TableRightCell>
          <TableLeftCell align="center">휴대전화</TableLeftCell>
          <TableRightCell>6</TableRightCell>
        </TableRow>
      </TableBody>
    </EnrollInformationBox>
  );
}

const EnrollInformationBox = styled(Box)`
  margin-top: 10px;
`;

const TableHeadFull = styled(TableCell)`
  width: 100%;
  background: #f5f5f5;
  border: 1px solid #c4c4c4;
`;

const TableLeftCell = styled(TableCell)`
  width: 10%;
  background: #f5f5f5;
  border-right: 1px solid #c4c4c4;
  border-bottom: 1px solid #c4c4c4;
  &:first-child {
    border-left: 1px solid #c4c4c4;
    width: 10%;
  }
`;

const TableRightCell = styled(TableCell)`
  width: 40%;
  border-bottom: 1px solid #c4c4c4;
  border-right: 1px solid #c4c4c4;
`;
