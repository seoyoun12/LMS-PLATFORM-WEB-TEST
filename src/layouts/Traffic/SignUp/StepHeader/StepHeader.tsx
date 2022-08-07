import { CNCalendar } from '@layouts/Calendar';
import { Box, Container, styled, Typography } from '@mui/material';
import Filter1Icon from '@mui/icons-material/Filter1';
import Filter2Icon from '@mui/icons-material/Filter2';
import Filter3Icon from '@mui/icons-material/Filter3';

export function StepHeader({ value, title, headers }: { value: number; title: string; headers: { title: string; value: number }[] }) {
  console.log(headers, value);
  return (
    <StebHeaderWrap>
      <Box
        sx={{
          background: '#3498db',
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

        <Box display="flex" gap="8rem" width="fit-content" margin={'auto'} mt={4}>
          {headers.map(item => (
            <Box
              key={item.value}
              display="flex"
              flexDirection="column"
              alignItems={'center'}
              sx={{ opacity: item.value === value ? 1 : 0.5 }}
            >
              {item.value === 1 && <Filter1Icon fontSize="large" />}
              {item.value === 2 && <Filter2Icon fontSize="large" />}
              {item.value === 3 && <Filter3Icon fontSize="large" />}
              <span>{item.title}</span>
            </Box>
          ))}
        </Box>
      </Box>
    </StebHeaderWrap>
  );
}

const StebHeaderWrap = styled(Box)``;
