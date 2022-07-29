import { Box, Button, Container, styled, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import { StebHeader } from '../StebHeader';
import { useRecoilState } from 'recoil';
import { courseClassEnrollInfo, courseClassEnrollList } from '@common/recoil';
import CheckIcon from '@mui/icons-material/Check';
import { locationList } from '@layouts/MeEdit/MeEdit';
import HorizontalRuleRoundedIcon from '@mui/icons-material/HorizontalRuleRounded';
import { useRouter } from 'next/router';
import { businessType, getSingleCourseClass, useSingleCourseClass } from '@common/api/courseClass';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useSnackbar } from '@hooks/useSnackbar';
import dateFormat from 'dateformat';
import { courseCategory } from '@layouts/Calendar/CalendarBody/CalendarBody';
import { Spinner } from '@components/ui';
import { courseBusinessTypeList } from '@layouts/Calendar/Calendar';

export function Steb3() {
  const router = useRouter();
  const snackbar = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [enrollInfo, setEnrollInfo] = useRecoilState(courseClassEnrollInfo);
  const [enrollList, setEnrollList] = useRecoilState(courseClassEnrollList);
  const [info, setInfo] = useState<{
    courseCategoryType: string;
    courseBusinessType: businessType;
    step: number;
    studyStartDate: string;
    studyEndDate: string;
  }>();
  console.log(enrollList);

  const getData = async (seq: number) => {
    setLoading(true);
    console.log('첫번째', loading);
    try {
      const { data } = await getSingleCourseClass(seq);
      console.log('sadasd', data);
      const {
        course: { courseCategoryType, courseBusinessType },
        step,
        studyStartDate,
        studyEndDate,
      } = data;
      setInfo({ courseCategoryType, courseBusinessType, step, studyStartDate, studyEndDate });
      setLoading(false);
      console.log('두번째', loading);
    } catch (e: any) {
      // snackbar({ variant: 'error', message: e });
      console.log(e);
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    if (!enrollInfo?.seq) {
      window.alert('잘못된 접근입니다.');
      router.push('/category');
    }
    if (enrollInfo?.seq) {
      getData(enrollInfo.seq);
    }

    return () => {
      setEnrollList([]);
      setEnrollInfo(null);
    };
  }, []);

  if (loading || !info) return <Spinner />;
  return (
    <Steb3Wrap>
      <StebHeader value={3} />
      <Steb3BodyWrap>
        <HeaderTypo variant="h5">신청완료</HeaderTypo>
        <CompleteRegi>
          <CheckIcon sx={{ fontSize: '6rem', color: 'primary.main' }} />
          <Box>
            <Typography component="span" sx={{ fontSize: '1.5rem' }}>
              교육신청이{' '}
            </Typography>
            <Typography component="span" fontWeight="bold" sx={{ fontSize: '1.5rem' }}>
              완료{' '}
            </Typography>
            <Typography component="span" sx={{ fontSize: '1.5rem' }}>
              되었습니다.
            </Typography>
          </Box>
        </CompleteRegi>

        <RegiType>
          <Typography variant="h5" fontWeight="bold" display="flex" alignItems="center" mt={4} mb={2}>
            <HorizontalRuleRoundedIcon sx={{ transform: 'scale(1,2)', color: '#3498db' }} />
            <span>신청교육</span>
          </Typography>
          <TableContainer>
            <Table sx={{ borderTop: '4px solid #3498db' }}>
              <TableCustomRow>
                <TableLeftCell>교육과정</TableLeftCell>
                <TableCell>{courseCategory.filter(cate => cate.type === info.courseCategoryType)[0]?.ko}</TableCell>
              </TableCustomRow>
              <TableCustomRow>
                <TableLeftCell>운수구분</TableLeftCell>
                <TableCell>{courseBusinessTypeList.filter(business => business.enType === info.courseBusinessType)[0].type}</TableCell>
              </TableCustomRow>
              <TableCustomRow>
                <TableLeftCell>기수 / 교육일자</TableLeftCell>
                <TableCell>
                  {info?.step}기 / {dateFormat(info.studyStartDate, 'yyyy-mm-dd')} ~ {dateFormat(info?.studyEndDate, 'yyyy-mm-dd')}
                </TableCell>
              </TableCustomRow>
            </Table>
          </TableContainer>
        </RegiType>

        <RegiStudentList>
          <Typography variant="h5" fontWeight="bold" display="flex" alignItems="center" mt={4} mb={2}>
            <HorizontalRuleRoundedIcon sx={{ transform: 'scale(1,2)', color: '#3498db' }} />
            <span>교육신청자 리스트</span>
          </Typography>
          <StudentItemListWrap>
            {enrollList.length > 0 &&
              enrollList.map(item => (
                <StudentListItem>
                  <StuTableContainer key={item.courseClassSeq}>
                    <TableBody sx={{ display: 'table', width: '100%' }}>
                      <UserTableRow>
                        <TableCell>이름</TableCell>
                        <TableCell>{item.name}</TableCell>
                      </UserTableRow>
                      <UserTableRow>
                        <TableCell>민증</TableCell>
                        <TableCell>{item.firstIdentityNumber} - ●●●●●●●</TableCell>
                      </UserTableRow>
                      <UserTableRow>
                        <TableCell>차량번호</TableCell>
                        <TableCell>{item.carNumber}</TableCell>
                      </UserTableRow>
                      <UserTableRow>
                        <TableCell>등록지</TableCell>
                        <TableCell>{locationList.filter(regi => regi.en === item.carRegisteredRegion)[0].ko}</TableCell>
                      </UserTableRow>
                      <UserTableRow>
                        <TableCell>휴대전화링</TableCell>
                        <TableCell>{item.phone}</TableCell>
                      </UserTableRow>
                    </TableBody>
                  </StuTableContainer>
                </StudentListItem>
              ))}
          </StudentItemListWrap>
        </RegiStudentList>
        <BottomBox>
          <Box padding="2rem" borderBottom="2px solid #888888" mb={2} textAlign="center">
            <Typography>홍길동님의 교육신청이 완료되었습니다.</Typography>
            <Typography>알차고 실속있는 서비스로 찾아뵙겠습니다.</Typography>
          </Box>
          <Box display="flex" gap="0.5rem">
            <Button variant="contained" color="neutral" onClick={() => router.push(`/category`)} fullWidth>
              홈으로
            </Button>
            <Button variant="contained" onClick={() => router.push(`/me`)} fullWidth>
              마이페이지로 이동
            </Button>
          </Box>
        </BottomBox>
      </Steb3BodyWrap>
    </Steb3Wrap>
  );
}

const Steb3Wrap = styled(Container)``;
const Steb3BodyWrap = styled(Box)`
  width: 700px;
  margin: auto;
  margin-top: 3rem;
`;
const HeaderTypo = styled(Typography)`
  padding-bottom: 1rem;
  border-bottom: 2px solid #c3c3c3;
  font-weight: bold;
`;
const CompleteRegi = styled(Box)`
  display: flex;
  flex-direction: column;
  margin: auto;
  align-items: center;
`;
const RegiType = styled(Box)``;
const RegiStudentList = styled(Box)``;

const TableCustomRow = styled(TableRow)`
  border-bottom: 2px solid #c3c3c3;
`;
const TableLeftCell = styled(TableCell)`
  background: #e1e1e1;
  width: 30%;
`;
const StudentItemListWrap = styled(Box)`
  div:last-child {
    border-bottom: none;
  }
`;
const StudentListItem = styled(Box)`
  display: flex;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e1e1e1;
`;
const StuTableContainer = styled(TableContainer)`
  .css-2lu2eg-MuiTableCell-root {
    border-bottom: none;
    padding: 0.5rem;
    font-weight: bold;
  }
  .css-dfr580-MuiTableRow-root {
    /* :first-child {
      td {
        border-top: none;
      }
    } */
    :last-child {
      td {
        border-bottom: none;
      }
    }
  }
`;

const UserTableRow = styled(TableRow)`
  display: flex;

  td:first-child {
    width: 50%;
  }
  td:last-child {
    display: block;
    width: 50%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const BottomBox = styled(Box)`
  width: 420px;
  margin: auto;
`;
