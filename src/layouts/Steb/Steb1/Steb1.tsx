import useResponsive from '@hooks/useResponsive';
import { CNCalendar } from '@layouts/Calendar';
import { CalendarMobile } from '@layouts/CalendarMobile';
import { Box, Container, styled } from '@mui/material';
import { StebHeader } from '../StebHeader';

export function Steb1() {
  const isDesktop = useResponsive();
  return (
    <Steb1Wrap>
      <StebHeader value={1} />
      {isDesktop ? <CNCalendar /> : <CalendarMobile />}
    </Steb1Wrap>
  );
}

const Steb1Wrap = styled(Box)``;
