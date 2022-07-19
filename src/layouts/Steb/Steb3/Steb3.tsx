import { Box, Container, styled, Typography } from '@mui/material';
import Filter1Icon from '@mui/icons-material/Filter1';
import Filter2Icon from '@mui/icons-material/Filter2';
import Filter3Icon from '@mui/icons-material/Filter3';
import { StebHeader } from '../StebHeader';

export function Steb3() {
  return (
    <Steb3Wrap>
      <StebHeader value={3} />
    </Steb3Wrap>
  );
}

const Steb3Wrap = styled(Container)``;
