import styled from '@emotion/styled';
import { Box, BoxProps } from '@mui/material';

interface Props {
  content: string;
  parantSx?: BoxProps;
  childSx?: BoxProps;
}

export function NotFound({ content, parantSx, childSx }: Props) {
  return (
    <NotFoundContainer sx={parantSx}>
      <NotFoundWord sx={childSx}>{content}</NotFoundWord>
    </NotFoundContainer>
  );
}

const NotFoundContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
`;
const NotFoundWord = styled(Box)`
  color: #cfcfcf;
`;
