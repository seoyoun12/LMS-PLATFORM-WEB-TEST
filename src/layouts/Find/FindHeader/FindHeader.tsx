import { CNCalendar } from '@layouts/Calendar';
import { Box, Container, styled, Typography } from '@mui/material';
import Filter1Icon from '@mui/icons-material/Filter1';
import Filter2Icon from '@mui/icons-material/Filter2';
import Filter3Icon from '@mui/icons-material/Filter3';

export function FindHeader({
  value,
  title,
  headers,
}: {
  value: number;
  title: string;
  headers: { title: string; value: number; icon: any }[];
}) {
  return (
    <FindHeaderWrap>
      <Box
        sx={{
          // background: 'rgb(194,51,51)',
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

        <FindHeaderStepsWrap>
          {headers.map(item => (
            <Box
              key={item.value}
              display="flex"
              flexDirection="column"
              alignItems={'center'}
              width="33.3%"
              sx={{ opacity: item.value === value ? 1 : 0.5 }}
            >
              {item.icon}
              <span>{item.title}</span>
            </Box>
          ))}
        </FindHeaderStepsWrap>
      </Box>
    </FindHeaderWrap>
  );
}

const FindHeaderWrap = styled(Box)``;

const FindHeaderStepsWrap = styled(Box)`
  display: flex;
  gap: 6rem;
  width: fit-content;
  margin: auto;
  margin-top: 24px;
  width: 400px;
  justify-content: space-between;
  @media (max-width: 500px) {
    width: 300px;
    gap: 3rem;
  }
`;
