import styled from '@emotion/styled';
import { Box, BoxProps } from '@mui/material';

interface Props {
  content: string;
  style?: React.CSSProperties;
  parantSx?: BoxProps;
  childSx?: BoxProps;
}

export function NotFound({ content, style, parantSx, childSx }: Props) {
  return (
    <NotFoundContainer sx={parantSx} style={style}>
      <NotFoundWord sx={childSx}>{content}</NotFoundWord>
    </NotFoundContainer>
  );
}

const NotFoundContainer = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
`;
const NotFoundWord = styled(Box)`
  color: #cfcfcf;
`;
