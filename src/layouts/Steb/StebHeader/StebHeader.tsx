import { CNCalendar } from '@layouts/Calendar';
import { Box, Container, styled, Typography } from '@mui/material';
import Filter1Icon from '@mui/icons-material/Filter1';
import Filter2Icon from '@mui/icons-material/Filter2';
import Filter3Icon from '@mui/icons-material/Filter3';
import Image from 'next/image';

const headers = [
  { title: '교육일정', value: 1 },
  { title: '교육신청', value: 2 },
  { title: '신청완료', value: 3 },
];

export function StebHeader({ value }: { value: number }) {
  console.log(headers, value);
  return (
    <StebHeaderWrap>
      {headers
        .filter(item => item.value === value)
        .map(item => (
          <Box
            sx={{
              color: 'white',
              textAlign: 'center',
              paddingTop: '6rem',
              // paddingBottom: '1rem',
              fontWeight: 'bold',
            }}
            mb={20}
          >
            <Typography variant="h4" fontWeight="bold">
              {item.title}
            </Typography>
            <Typography>충남교통연수원은 올바르고 안전한 교통문화정착에 앞장섭니다.</Typography>
            <Box display="flex" gap="8rem" width="fit-content" margin={'auto'}>
              <StepHeaderProgessIcon>
                {/* <StepHeaderProgessIcon display="flex" flexDirection="column" alignItems={'center'} sx={{ opacity: 1 === value ? 1 : 0.5 }}> */}
                {/* <Filter1Icon fontSize="large" /> */}
                {/* <span>교육일정</span> */}

                {1 === value ? (
                  <Image src={'/assets/images/lightOnEduScheduleIcon.png'} width={150} height={150} />
                ) : (
                  <Image src={'/assets/images/lightOffEduScheduleIcon.png'} width={150} height={150} />
                )}
              </StepHeaderProgessIcon>
              {/* <StepHeaderProgessIcon display="flex" flexDirection="column" alignItems={'center'} sx={{ opacity: 2 === value ? 1 : 0.5 }}> */}
              <StepHeaderProgessIcon>
                {/* <Filter2Icon fontSize="large" /> */}
                {/* <span>교육신청</span> */}
                {2 === value ? (
                  <Image src={'/assets/images/lightOnJoinIcon.png'} width={150} height={150} />
                ) : (
                  <Image src={'/assets/images/lightOffJoinIcon.png'} width={150} height={150} />
                )}
              </StepHeaderProgessIcon>
              {/* <StepHeaderProgessIcon display="flex" flexDirection="column" alignItems={'center'} sx={{ opacity: 3 === value ? 1 : 0.5 }}> */}
              <StepHeaderProgessIcon>
                {/* <Filter3Icon fontSize="large" /> */}
                {/* <span>신청완료</span> */}
                {3 === value ? (
                  <Image src={'/assets/images/lightOnJoinCompleteIcon.png'} width={150} height={150} />
                ) : (
                  <Image src={'/assets/images/lightOffJoinCompleteIcon.png'} width={150} height={150} />
                )}
              </StepHeaderProgessIcon>
            </Box>
          </Box>
        ))}
    </StebHeaderWrap>
  );
}

const StebHeaderWrap = styled(Box)`
  background-image: url('/assets/images/eduSchedule.png');
  position: relative;
`;

const StepHeaderProgessIcon = styled(Box)`
  position: relative;
  bottom: -75px;
`;
