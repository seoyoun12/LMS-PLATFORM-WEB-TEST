import { CNCalendar } from '@layouts/Calendar';
import { Box, Container, styled, Typography } from '@mui/material';
import Filter1Icon from '@mui/icons-material/Filter1';
import Filter2Icon from '@mui/icons-material/Filter2';
import Filter3Icon from '@mui/icons-material/Filter3';

const headers = [
  { title: '교육대상자 선택', value: 1 },
  { title: '대상자 정보입력', value: 2 },
  { title: '신청완료', value: 3 },
];

export function StebHeader({ value }: { value: number }) {
  return (
    <StebHeaderWrap>
      {headers
        .filter(item => item.value === value)
        .map(item => (
          <Box
            key={item.value}
            sx={{
              color: 'white',
              textAlign: 'center',
              paddingTop: '6rem',
              paddingBottom: '1rem',
              fontWeight: 'bold',
            }}
          >
            <Typography variant="h4" fontWeight="bold">
              {item.title}
            </Typography>
            <Typography>
              충남교통연수원은 올바르고 안전한 교통문화정착에 앞장섭니다.
            </Typography>
            <Box
              display="flex"
              gap="8rem"
              width="fit-content"
              margin={'auto'}
              mt={4}
              sx={{ ['@media (max-width:1200px)']: { gap: '2rem' } }}
            >
              <Box
                display="flex"
                flexDirection="column"
                alignItems={'center'}
                width='33.3%'
                sx={{ opacity: 1 === value ? 1 : 0.5 }}
              >
                <Filter1Icon fontSize="large" />
                <span>교육대상자 선택</span>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                alignItems={'center'}
                width='33.3%'
                sx={{ opacity: 2 === value ? 1 : 0.5 }}
              >
                <Filter2Icon fontSize="large" />
                <span>대상자 정보입력</span>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                alignItems={'center'}
                width='33.3%'
                sx={{ opacity: 3 === value ? 1 : 0.5 }}
              >
                <Filter3Icon fontSize="large" />
                <span>신청완료</span>
              </Box>
              {/* <Box display="flex" flexDirection="column" alignItems={'center'} sx={{ opacity: 3 === value ? 1 : 0.5 }}>
                <Filter3Icon fontSize="large" />
                <span>신청완료</span>
              </Box> */}
            </Box>
          </Box>
        ))}
    </StebHeaderWrap>
  );
}

const StebHeaderWrap = styled(Box)`
  background-image: url('/assets/images/eduSchedule.png');
  /* background: rgb(194,51,51); */
  padding: 0 12px;
`;
