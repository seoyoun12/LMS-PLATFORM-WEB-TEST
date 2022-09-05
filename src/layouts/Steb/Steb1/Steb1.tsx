import useResponsive from '@hooks/useResponsive';
import { CNCalendar } from '@layouts/Calendar';
import { CalendarMobile } from '@layouts/CalendarMobile';
import { Box, styled } from '@mui/material';
import dynamic from 'next/dynamic';
import StebHeader from '../StebHeader/StebHeader';

// const StebHeader = dynamic<{ value: number }>(() => import('../StebHeader/StebHeader'), {
//   ssr: false,
// });

export default function Steb1() {
  const isDesktop = useResponsive();
  // console.log(isDesktop);
  return (
    <Steb1Wrap>
      {isDesktop && <StebHeader value={1} />}
      {isDesktop ? <CNCalendar /> : <CalendarMobile />}
    </Steb1Wrap>
  );
}

const Steb1Wrap = styled(Box)``;
