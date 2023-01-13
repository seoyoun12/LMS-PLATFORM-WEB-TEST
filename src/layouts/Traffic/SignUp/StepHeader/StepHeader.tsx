import { CNCalendar } from '@layouts/Calendar';
import { Box, Container, styled, Typography } from '@mui/material';
import Filter1Icon from '@mui/icons-material/Filter1';
import Filter2Icon from '@mui/icons-material/Filter2';
import Filter3Icon from '@mui/icons-material/Filter3';

export function StepHeader({
  value,
  title,
  headers,
}: {
  value: number;
  title: string;
  headers: { title: string; value: number }[];
}) {
  return (
    <StebHeaderWrap>
      <Box
        sx={{
          // background: '#256aef',
          backgroundImage: `url('/assets/images/domin-signup-banner.png')`,
          color: 'white',
          textAlign: 'center',
          paddingTop: '6rem',
          paddingBottom: '1rem',
          fontWeight: 'bold',
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          {title}
        </Typography>

        <StebHeaderStepList mt={4}>
          {headers.map(item => (
            <Box
              key={item.value}
              display="flex"
              flexDirection="column"
              alignItems={'center'}
              width={'100px'}
              sx={{ opacity: item.value === value ? 1 : 0.5 }}
            >
              {item.value === 1 && <Filter1Icon fontSize="large" />}
              {item.value === 2 && <Filter2Icon fontSize="large" />}
              {item.value === 3 && <Filter3Icon fontSize="large" />}
              <span>{item.title}</span>
            </Box>
          ))}
        </StebHeaderStepList>
      </Box>
    </StebHeaderWrap>
  );
}

const StebHeaderWrap = styled(Box)`
  /* background-image: url('/assets/images/domin-signup-banner.png'); */
`;

const StebHeaderStepList = styled(Box)`
  display: flex;
  gap: 6rem;
  margin: auto;
  margin: 24px auto 0 auto;
  justify-content: center;
  width: 400px;
  @media (max-width: 500px) {
    width: 320px;
    gap: 4rem;
  }
`;
