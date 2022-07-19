import { CNCalendar } from '@layouts/Calendar';
import { Box, Container, styled, Typography } from '@mui/material';
import { StebHeader } from '../StebHeader';

export function Steb1() {
  return (
    <Steb1Wrap>
      <StebHeader value={1} />
      <CNCalendar />
    </Steb1Wrap>
  );
}

const Steb1Wrap = styled(Container)``;
