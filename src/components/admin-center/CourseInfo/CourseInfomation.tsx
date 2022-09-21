import { detailCourseInfo } from '@common/api/adm/learningInfo';
import { useSnackbar } from '@hooks/useSnackbar';
import { Box, Tab, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useRouter } from 'next/router';
import { css } from '@emotion/css';
import styled from '@emotion/styled';
import { UserCourseInfoDetailCourseInfoDto } from '@common/api/Api';

interface Props {
  courseInfo: UserCourseInfoDetailCourseInfoDto;
}

export function CourseInformation({ courseInfo }: Props) {
  const router = useRouter();
  const snackbar = useSnackbar();
  const { courseUserSeq } = router.query;
  // const { data, error } = detailCourseInfo(Number(courseUserSeq));

  return (
    <CourseInfomationBox>
      <TableHeadFull colSpan={4} sx={{ display: 'table', width: '100%' }}>
        수강정보
      </TableHeadFull>
      <TableBody sx={{ display: 'table', width: '100%' }}>
        <TableRow>
          <TableLeftCell>과정명</TableLeftCell>
          <TableRightCell>{courseInfo?.courseName}</TableRightCell>
          <TableLeftCell>년도 / 차수</TableLeftCell>
          <TableRightCell>{courseInfo?.yearAndStep}</TableRightCell>
        </TableRow>
        <TableRow>
          <TableLeftCell>회원명</TableLeftCell>
          <TableRightCell>{courseInfo?.name}</TableRightCell>
          <TableLeftCell>회원아이디</TableLeftCell>
          <TableRightCell>
            {courseInfo?.username ? courseInfo?.username : '-'}
          </TableRightCell>
        </TableRow>
        <TableRow>
          <TableLeftCell>학습기간</TableLeftCell>
          <TableRightCell>{courseInfo?.studyDate}</TableRightCell>
          <TableLeftCell>등록일</TableLeftCell>
          <TableRightCell>{courseInfo?.regDate}</TableRightCell>
        </TableRow>
        <TableRow>
          <TableLeftCell>상태</TableLeftCell>
          <TableRightCell>{courseInfo?.classLearningStatus}</TableRightCell>
          <TableLeftCell>수료여부</TableLeftCell>
          <TableRightCell>
            {courseInfo?.completeYn === 'Y' ? '수료' : '미수료'}
          </TableRightCell>
        </TableRow>
      </TableBody>
    </CourseInfomationBox>
  );
}

const CourseInfomationBox = styled(Box)``;

const TableHeadFull = styled(TableCell)`
  width: 100%;
  background: #f5f5f5;
  border: 1px solid #c4c4c4;
  font-weight: bold;
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
