import {
  Box,
  Button,
  Container,
  styled,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import { StebHeader } from '../StebHeader';
import { useRecoilState } from 'recoil';
import { courseClassTrafficInfo, userInfo } from '@common/recoil';
import CheckIcon from '@mui/icons-material/Check';
import { locationList } from '@layouts/MeEdit/MeEdit';
import HorizontalRuleRoundedIcon from '@mui/icons-material/HorizontalRuleRounded';
import { useRouter } from 'next/router';
import { useEffect, useLayoutEffect, useState } from 'react';
import { studentList } from '../Steb2/Steb2';
import { Step3StudentList } from './Step3StudentList';

export function Steb3() {
  const router = useRouter();
  const [trafficInfo, setTrafficInfo] = useRecoilState(courseClassTrafficInfo);
  const [userInfoData, setUserInfo] = useRecoilState(userInfo);
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
          <Typography
            variant="h5"
            fontWeight="bold"
            display="flex"
            alignItems="center"
            mt={4}
            mb={2}
          >
            <HorizontalRuleRoundedIcon
              sx={{ transform: 'scale(1,2)', color: '#3498db' }}
            />
            <span>신청교육</span>
          </Typography>
          <TableContainer>
            <Table sx={{ borderTop: '4px solid #3498db' }}>
              <TableCustomRow>
                <TableLeftCell>지역</TableLeftCell>
                <TableCell>
                  {String(
                    locationList.filter(fil => fil.en === trafficInfo?.region)[0]?.ko
                  )}
                </TableCell>
              </TableCustomRow>
              <TableCustomRow>
                <TableLeftCell>소속</TableLeftCell>
                <TableCell>{trafficInfo?.organization}</TableCell>
              </TableCustomRow>
              <TableCustomRow>
                <TableLeftCell>신청기간</TableLeftCell>
                <TableCell>{trafficInfo?.expectedToStartDtime}</TableCell>
              </TableCustomRow>
              <TableCustomRow>
                <TableLeftCell>교육대상자</TableLeftCell>
                <TableCell>
                  {String(
                    studentList.filter(
                      item => item.enType === trafficInfo?.eduTargetMain
                    )[0]?.type
                  )}
                </TableCell>
              </TableCustomRow>
              <TableCustomRow>
                <TableLeftCell>교육 세부구분</TableLeftCell>
                <TableCell>
                  {String(
                    studentList
                      .filter(item => item.enType === trafficInfo?.eduTargetMain)[0]
                      ?.category.filter(
                        fil => fil.enType === trafficInfo?.eduTargetSub
                      )[0].type
                  )}
                </TableCell>
              </TableCustomRow>
            </Table>
          </TableContainer>
        </RegiType>

        <StudentList>
          <Step3StudentList
            students={trafficInfo?.peopleCounts}
            trafficInfo={trafficInfo}
          />
        </StudentList>
        <BottomBox>
          <Box padding="2rem" borderBottom="2px solid #888888" mb={2} textAlign="center">
            <Typography>{userInfoData.name}님의 교육신청이 완료되었습니다.</Typography>
            <Typography>알차고 실속있는 서비스로 찾아뵙겠습니다.</Typography>
          </Box>
          <Box display="flex" gap="0.5rem">
            <Button
              variant="contained"
              color="neutral"
              onClick={() => router.push(`/traffic/category`)}
              fullWidth
            >
              홈으로
            </Button>
            <Button
              variant="contained"
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

const Steb3Wrap = styled(Container)``;
const Steb3BodyWrap = styled(Box)`
  width: 700px;
  margin: auto;
  margin-top: 3rem;
  margin-bottom: 64px;
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
const StudentList = styled(Box)``;

const TableCustomRow = styled(TableRow)`
  border-bottom: 2px solid #c3c3c3;
`;
const TableLeftCell = styled(TableCell)`
  background: #e1e1e1;
  width: 30%;
`;

const BottomBox = styled(Box)`
  width: 420px;
  margin: auto;
`;
