import { detailCourseInfo } from '@common/api/adm/learningInfo';
import { useSnackbar } from '@hooks/useSnackbar';
import {
  Box,
  Tab,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { useRouter } from 'next/router';
import { css } from '@emotion/css';
import styled from '@emotion/styled';
import { UserCourseInfoDetailLearningStatusDto } from '@common/api/Api';
import { isThisMinute } from 'date-fns/esm';

interface Props {
  learningStatusList: UserCourseInfoDetailLearningStatusDto[];
}

export function LearningStatus({ learningStatusList }: Props) {
  const router = useRouter();
  const snackbar = useSnackbar();
  const { courseUserSeq } = router.query;
  // const { data, error } = detailCourseInfo(Number(courseUserSeq));

  // console.log(
  //   '러닝스테이터스리스트 : ',
  //   learningStatusList?.map(item => item.elementName)
  // );

  // 반영비율
  // 평가여부, 제출자 및 첨삭IP 제외
  // 총점 Row 제외
  // 이수기준에서 설문제출이 필수or필수X 체크

  return (
    <LearningStatusBox>
      <TableHeadFull colSpan={4} sx={{ display: 'table', width: '100%' }}>
        학습현황
      </TableHeadFull>
      <TableBody sx={{ display: 'table', width: '100%' }}>
        <TableRow>
          <TableLeftCell>항목</TableLeftCell>
          <TableLeftCell>이수(과락)기준</TableLeftCell>
          <TableLeftCell>성적</TableLeftCell>
          <TableLeftCell>제출일</TableLeftCell>
          <TableLeftCell>제출여부</TableLeftCell>
          {/* <TableLeftCell>상태</TableLeftCell> */}
        </TableRow>
      </TableBody>

      <TableBody sx={{ display: 'table', width: '100%' }}>
        {learningStatusList?.map((item) => (
          <TableRow key={item.elementName}>
            <TableLeftCell>
              {item.elementName ? item.elementName : '-'}
            </TableLeftCell>
            <TableLineCell>
              {item.threshold === 'Y'
                ? '제출필요'
                : typeof Number(item.threshold.slice(0, 1)) === 'number'
                ? item.threshold
                : '제출불필요'}
            </TableLineCell>
            {/* <TableLineCell>{Number(item.threshold.slice(0, 1))}</TableLineCell> */}
            <TableLineCell>{item.point ? item.point : '-'}</TableLineCell>
            <TableLineCell>
              {item.submitDate ? item.submitDate : '-'}
            </TableLineCell>
            <TableLineCell>
              {item.submitYn
                ? item.submitYn === 'Y'
                  ? '제출완료'
                  : item.submitYn === 'N'
                  ? '제출미완료'
                  : ''
                : '-'}
            </TableLineCell>
          </TableRow>
        ))}
      </TableBody>
    </LearningStatusBox>
  );
}

const LearningStatusBox = styled(Box)`
  border: 5px solid green;
  margin-top: 10px;
`;

const TableHeadFull = styled(TableCell)`
  width: 100%;
  background: #f5f5f5;
  border: 1px solid #c4c4c4;
  font-weight: bold;
`;

const TableLeftCell = styled(TableCell)`
  background: #f5f5f5;
  text-align: center;
  border-right: 1px solid #c4c4c4;
  border-bottom: 1px solid #c4c4c4;
  width: 15%;

  &:first-of-type {
    border-left: 1px solid #c4c4c4;
    width: 10%;
  }
`;

const TableLineCell = styled(TableCell)`
  text-align: center;
  border-right: 1px solid #c4c4c4;
  border-bottom: 1px solid #c4c4c4;
  width: 15%;
`;
