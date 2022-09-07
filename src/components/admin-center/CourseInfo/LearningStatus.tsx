import { detailCourseInfo } from '@common/api/adm/learningInfo';
import { useSnackbar } from '@hooks/useSnackbar';
import { Box, Tab, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
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

  console.log('러닝스테이터스리스트 : ', learningStatusList);
  // console.log(
  //   '러닝스테이터스리스트 : ',
  //   learningStatusList?.map(item => item.elementName)
  // );

  // 평가여부, 제출자 및 첨삭IP 제외
  // 총점 Row 제외

  return (
    <LearningStatusBox>
      <TableHeadFull colSpan={4} sx={{ display: 'table', width: '100%' }}>
        학습현황
      </TableHeadFull>
      <TableBody className={pt20} sx={{ display: 'table', width: '100%' }}>
        <TableRow>
          <TableLeftCell>항목</TableLeftCell>
          <TableLineCell>반영비율</TableLineCell>
          <TableLineCell>이수(과락)기준</TableLineCell>
          <TableLineCell>성적</TableLineCell>
          <TableLineCell>제출일</TableLineCell>
          <TableLineCell>제출여부</TableLineCell>
          <TableLineCell>상태</TableLineCell>
        </TableRow>
      </TableBody>

      <TableBody className={pt20} sx={{ display: 'table', width: '100%' }}>
        {learningStatusList?.map(item => (
          <TableRow key={item.elementName}>
            <TableLeftCell>{item.elementName}</TableLeftCell>
            <TableLineCell>2</TableLineCell>
            <TableLineCell>{item.threshold}</TableLineCell>
            <TableLineCell>{item.point}</TableLineCell>
            <TableLineCell>{item.submitDate}</TableLineCell>
            <TableLineCell>{item.submitYn}</TableLineCell>
            <TableLineCell>{item.learningStatus}</TableLineCell>
          </TableRow>
        ))}
      </TableBody>

      <TableBody className={pt20} sx={{ display: 'table', width: '100%' }}>
        <TableRow>
          <TableLeftCell>1</TableLeftCell>
          <TableLineCell>2</TableLineCell>
          <TableLineCell>2</TableLineCell>
          <TableLineCell>2</TableLineCell>
          <TableLineCell>2</TableLineCell>
          <TableLineCell>2</TableLineCell>
          <TableLineCell>2</TableLineCell>
        </TableRow>
      </TableBody>
    </LearningStatusBox>
  );
}

const LearningStatusBox = styled(Box)`
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
  width: 10%;
  background: #f5f5f5;
  /* border-top: 1px solid #c4c4c4; */
  border-right: 1px solid #c4c4c4;
  /* border-left: 1px solid #c4c4c4; */
  border-bottom: 1px solid #c4c4c4;
  font-weight: 400;
`;

const TableLineCell = styled(TableCell)`
  border-left: 1px solid #c4c4c4;
  width: 10%;
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
