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
  console.log(headers, value);
  return (
    <FindHeaderWrap>
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
            <Box display="flex" flexDirection="column" alignItems={'center'} sx={{ opacity: item.value === value ? 1 : 0.5 }}>
              {item.icon}
              <span>{item.title}</span>
            </Box>
          ))}
        </Box>
      </Box>
    </FindHeaderWrap>
  );
}

const FindHeaderWrap = styled(Box)``;
