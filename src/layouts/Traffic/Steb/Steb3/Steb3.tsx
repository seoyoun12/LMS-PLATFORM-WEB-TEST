import { Box,Button,Container,styled,Table,TableCell,TableContainer,TableRow,Typography } from '@mui/material';
import { StebHeader } from '../StebHeader';
import { useRecoilState } from 'recoil';
import { courseClassTrafficInfo, userInfo } from '@common/recoil';
import CheckIcon from '@mui/icons-material/Check';
import { locationList } from '@layouts/MeEdit/MeEdit';
import HorizontalRuleRoundedIcon from '@mui/icons-material/HorizontalRuleRounded';
import { useRouter } from 'next/router';
import { studentList } from '../Steb2/Steb2';

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
            <Typography component="p" sx={{ fontSize: '1.35rem' }}>
              교육신청이{' '}
            <Typography component="span" fontWeight="bold" sx={{ fontSize: '1.5rem' }}>
              완료{' '}
            </Typography>
              되었습니다.
            </Typography>
        </CompleteRegi>

        <Box>
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
            <Table sx={{border: '1px solid #c7c7c7'}}>
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
                <TableLeftCell>마감날짜</TableLeftCell>
                <TableCell>{trafficInfo?.expectedToEndDtime}</TableCell>
              </TableCustomRow>
              <TableCustomRow>
                <TableLeftCell>신청과정</TableLeftCell>
                <TableCell>{trafficInfo?.courseSeq}</TableCell>
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
              { studentList
                .filter(item => item.enType === trafficInfo?.eduTargetMain)[0]
                ?.category.filter(fil => fil.enType === trafficInfo?.eduTargetSub)
                .map((item) => {
                  return (
                        item.ageList.map((ages,index) => (
                          <TableCustomRow key={index}>
                            <TableLeftCell>{ages.age}</TableLeftCell>
                            <TableCell>
                              { trafficInfo?.peopleCounts?.[item.enType]?.[ages.enAge] ?? 0 }명
                            </TableCell>
                          </TableCustomRow>
                        ))
                  )})}
            </Table>
          </TableContainer>
          
        </Box>

        

        
        <BottomBox>
          <Box padding="2rem 0" borderBottom="2px solid #888888" mb={2} textAlign="center">
            <Typography>{userInfoData.name}님의 교육신청이 완료되었습니다.</Typography>
            <Typography>알차고 실속있는 서비스로 찾아뵙겠습니다.</Typography>
          </Box>
          <Box display="flex" gap="0.5rem">
            <Button
              variant="contained"
              color="neutral"
              onClick={() => router.push(`/traffic/category`)}
              fullWidth
              sx={{
                boxShadow:'1px 2px 3px 0px rgba(0,0,0,0.55)'
              }}
            >
              홈으로
            </Button>
            {/* TODO: 도민 접속시 traffic/me로 가게끔 수정 */}
            <Button
              variant="contained"
              onClick={() => router.push(`/traffic/me`)}
              fullWidth
              sx={{ boxShadow:'1px 2px 3px 0px rgba(0,0,0,0.55)' }}
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


const TableCustomRow = styled(TableRow)`
  border-bottom: 2px solid #c3c3c3;
`;
const TableLeftCell = styled(TableCell)`
  background: #e1e1e1;
  width: 30%;
`;

const BottomBox = styled(Box)`
  width: 100%;
  margin: auto;
`;

const Wrapper = styled(Box)`
  width: 100%;

`;
