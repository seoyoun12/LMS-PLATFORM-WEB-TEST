import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  Select,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import StebHeader from '../StebHeader/StebHeader';
import { useRecoilState } from 'recoil';
import { courseClassEnrollInfo, courseClassEnrollList, userInfo } from '@common/recoil';
import { locationList } from '@layouts/MeEdit/MeEdit';
import { useRouter } from 'next/router';
import {
  businessType,
  courseCategoryType,
  getSingleCourseClass,
  
} from '@common/api/courseClass';
import { useLayoutEffect, useState } from 'react';
import { courseCategory } from '@layouts/Calendar/CalendarBody/CalendarBody';
import { Spinner } from '@components/ui';
import { courseBusinessTypeList } from '@layouts/Calendar/Calendar';
import CheckedCircle from '/public/assets/svgs/CheckedCircle.svg';
import { getMyUser } from '@common/api/user';
import useResponsive from '@hooks/useResponsive';

export default function Steb3() {
  const router = useRouter();
  
  const isDesktop = useResponsive();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState<string>('');
  const [enrollInfo, setEnrollInfo] = useRecoilState(courseClassEnrollInfo);
  const [user, setUser] = useRecoilState(userInfo);
  const [enrollList, setEnrollList] = useRecoilState(courseClassEnrollList);
  
  const [info, setInfo] = useState<{
    courseCategoryType: courseCategoryType;
    courseBusinessType: businessType;
    step: number;
    studyStartDate: string;
    studyEndDate: string;
  }>();

  const getData = async (seq: number) => {
    setLoading(true);
    try {
      const { data } = await getSingleCourseClass(seq);
      const {
        course: { courseCategoryType, courseBusinessType },
        step,
        studyStartDate,
        studyEndDate,
      } = data;
      setInfo({
        courseCategoryType: courseCategoryType as courseCategoryType,
        courseBusinessType: courseBusinessType as businessType,
        step,
        studyStartDate,
        studyEndDate,
      });
      const userData = await getMyUser();
      setName(userData.data.name);
      setLoading(false);
    } catch (e: any) {
      // snackbar({ variant: 'error', message: e });
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
      {isDesktop && <StebHeader value={3} />}
      <Steb3BodyWrap>
        <CompleteRegi>
          <CheckedCircle />
          <Box mt={4} display="flex" flexWrap="wrap">
            <Typography component="span" sx={{ fontSize: '38px' }} margin="auto">
              교육신청이&nbsp;
            </Typography>
            <Box margin="auto">
              <Typography component="span" fontWeight="bold" sx={{ fontSize: '38px' }}>
                완료&nbsp;
              </Typography>
              <Typography component="span" sx={{ fontSize: '38px' }}>
                되었습니다.
              </Typography>
            </Box>
          </Box>
        </CompleteRegi>

        <RegiType>
          <Typography
            variant="h5"
            fontWeight="bold"
            display="flex"
            alignItems="center"
            mt={4}
            mb={2}
          >
            <span>신청교육</span>
          </Typography>
          <TableContainer>
            <Table sx={{ borderTop: '3px solid #000' }}>
              <TableCustomRow>
                <TableLeftCell>온라인과정</TableLeftCell>
                <TableRitghCell>
                  {localStorage.getItem('site_course_type') === 'TYPE_LOW_FLOOR_BUS' ? (
                    <Select disabled value={'TYPE_LOW_FLOOR_BUS'} fullWidth>
                      <MenuItem value={'TYPE_LOW_FLOOR_BUS'}>
                        저상버스 운전자교육
                      </MenuItem>
                    </Select>
                  ) : (
                    <Select
                      disabled
                      value={
                        courseCategory.filter(
                          cate => cate.type === info.courseCategoryType
                        )[0]?.type
                      }
                      fullWidth
                    >
                      {courseCategory.map(item => (
                        <MenuItem key={item.type} value={item.type}>
                          {item.ko}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                </TableRitghCell>
              </TableCustomRow>
              {!(localStorage.getItem('site_course_type') === 'TYPE_LOW_FLOOR_BUS') && (
                <TableCustomRow>
                  <TableLeftCell>운수구분</TableLeftCell>
                  <TableRitghCell>
                    <Select
                      disabled
                      value={
                        courseBusinessTypeList.filter(
                          business => business.enType === info.courseBusinessType
                        )[0].enType
                      }
                      fullWidth
                    >
                      {courseBusinessTypeList.map(item => (
                        <MenuItem key={item.enType} value={item.enType}>
                          {item.type}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableRitghCell>
                </TableCustomRow>
              )}
              <TableCustomRow>
                <TableLeftCell>기수 / 교육일자</TableLeftCell>
                <TableRitghCell>
                  <Select value="dummy" disabled fullWidth>
                    <MenuItem value="dummy">
                      {info?.step}기 / {info.studyStartDate.split(' ')[0]} ~{' '}
                      {info?.studyEndDate.split(' ')[0]}
                    </MenuItem>
                  </Select>
                </TableRitghCell>
              </TableCustomRow>
            </Table>
          </TableContainer>
        </RegiType>

        <RegiStudentList>
          <Typography
            variant="h5"
            fontWeight="700"
            fontSize="32px"
            display="flex"
            alignItems="center"
            mt={8}
            mb={2}
            paddingBottom="0.5rem"
            borderBottom="3px solid #000"
          >
            <span>교육신청자 리스트</span>
          </Typography>
          <StudentItemListWrap>
            <StuGrid
              container={true}
              columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }}
              rowSpacing={4}
              columnSpacing={4}
            >
              {enrollList.length > 0 &&
                enrollList.map(item => (
                  <StudentListItem
                    key={item.courseClassSeq}
                    item
                    xs={1}
                    sm={1}
                    md={1}
                    lg={1}
                    margin="auto"
                  >
                    <StuTableContainer>
                      <StuTableBody sx={{ display: 'table', width: '100%' }}>
                        <UserTableRow>
                          <StuTableLeftCell>이름</StuTableLeftCell>
                          <StuTableRightCell>{item.name}</StuTableRightCell>
                        </UserTableRow>
                        <UserTableRow>
                          <StuTableLeftCell>주민등록번호</StuTableLeftCell>
                          <StuTableRightCell>
                            {item.firstIdentityNumber} - ●●●●●●●
                          </StuTableRightCell>
                        </UserTableRow>
                        {item.carNumber && (
                          <UserTableRow>
                            <StuTableLeftCell>차량번호</StuTableLeftCell>
                            <StuTableRightCell>{item.carNumber === '충남00아0000' ? null : item.carNumber}</StuTableRightCell>
                          </UserTableRow>
                        )}
                        <UserTableRow>
                          <StuTableLeftCell>등록지</StuTableLeftCell>
                          <StuTableRightCell>
                            {
                              locationList.filter(
                                regi => regi.en === item.carRegisteredRegion
                              )[0]?.ko
                            }
                          </StuTableRightCell>
                        </UserTableRow>
                        <UserTableRow>
                          <StuTableLeftCell>휴대전화</StuTableLeftCell>
                          <StuTableRightCell>
                            {item.firstPhone} - {item.secondPhone} - {item.thirdPhone}
                          </StuTableRightCell>
                        </UserTableRow>
                      </StuTableBody>
                    </StuTableContainer>
                  </StudentListItem>
                ))}
            </StuGrid>
          </StudentItemListWrap>
        </RegiStudentList>
        <BottomBox>
          <Box padding="1rem" textAlign="center" maxWidth="500px" margin="auto">
            <Typography fontWeight={400}>
              {user.name || 'null'}님의 교육신청이 완료되었습니다.
            </Typography>
            <Typography fontWeight={400}>
              알차고 실속있는 서비스로 찾아뵙겠습니다.
            </Typography>
          </Box>
          <Box display="flex" gap="0.5rem" maxWidth="500px" margin="auto">
            <Button
              variant="contained"
              sx={{ padding: '0.75rem 1.5rem', fontWeight: 500 }}
              color="neutral"
              onClick={() => router.push(`/category`)}
              fullWidth
            >
              홈으로
            </Button>
            <Button
              variant="contained"
              sx={{
                padding: '0.75rem 1.5rem',
                fontWeight: 500,
                color: 'white',
                background: '#191919',
              }}
              onClick={() => router.push(`/me`)}
              fullWidth
            >
              마이페이지로 이동
            </Button>
          </Box>
        </BottomBox>
      </Steb3BodyWrap>
    </Steb3Wrap>
  );
}

const Steb3Wrap = styled(Box)``;
const Steb3BodyWrap = styled(Container)`
  margin-top: 6rem;
  margin-bottom: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
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
  border-bottom: 2px solid #d2d2d2;
  width: 100%;
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const TableLeftCell = styled(TableCell)`
  /* background: #e1e1e1; */
  width: 20%;
  font-size: 20px;
  font-weight: 700;
  padding: 12px 0;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    border-bottom: none;
    width: 100%;
    justify-content: start;
  }
`;

const TableRitghCell = styled(TableCell)`
  width: 80%;
  @media (max-width: 768px) {
    width: 100%;
    padding: 12px 0;
  }
`;

const StudentItemListWrap = styled(Box)`
  div:last-child {
    border-bottom: none;
  }
`;
const StuGrid = styled(Grid)``;

const StudentListItem = styled(Grid)`
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
  
`;

const StuTableContainer = styled(TableContainer)`
  .css-2lu2eg-MuiTableCell-root {
    border-bottom: none;
    padding: 0.5rem;
    font-weight: bold;
  }
  .css-dfr580-MuiTableRow-root {

    :last-child {
      td {
        border-bottom: none;
      }
    }
  }
`;

const UserTableRow = styled(TableRow)`
  display: flex;
  
`;

const BottomBox = styled(Box)`
  
  margin: auto;
  border: 1px solid #c4c4c4;
  border-radius: 4px;
  padding: 2rem 0;
  button {
    font-size: 20px;
  }
  p {
    font-size: 24px;
  }
  @media (max-width: 1024px) {
    p {
      font-size: 18px;
    }
    button {
      font-size: 18px;
    }
  }

  @media (max-width: 768px) {
    padding-left: 4px;
    padding-right: 4px;
    p {
      font-size: 16px;
    }
    button {
      font-size: 14px;
    }
  }
`;

const StuTableBody = styled(TableBody)`
  display: table;
  width: 100%;
  border-top: 1px solid #c4c4c4;
  border-left: 1px solid #c4c4c4;
  border-right: 1px solid #c4c4c4;
`;
const StuTableLeftCell = styled(TableCell)`
  width: 30%;
  border-right: 1px solid #c4c4c4;
  background: #f4f4f4;
  font-weight: 400;
  font-size: 18px;
  padding: 0 4px;
  line-height: 48px;
  height: 48px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;
const StuTableRightCell = styled(TableCell)`
  width: 70%;
  font-weight: 400;
  font-size: 18px;
  padding: 0 4px;
  line-height: 48px;
  height: 48px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;
