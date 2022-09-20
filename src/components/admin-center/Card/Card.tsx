import styled from '@emotion/styled';
import { Box, BoxProps, Typography } from '@mui/material';

export function Card({
  children,
  header,
  headSx,
  wrapSx,
  contentSx,
}: {
  children?: React.ReactNode;
  header?: string | React.ReactNode;
  headSx?: React.CSSProperties;
  wrapSx?: React.CSSProperties;
  contentSx?: React.CSSProperties;
}) {
  return (
    <CardWrap style={wrapSx}>
      {header && <CardHead style={headSx}>{header}</CardHead>}
      <CardContent style={contentSx}>{children}</CardContent>
    </CardWrap>
  );
}

const CardWrap = styled(Box)`
  box-sizing: border-box;
  flex-grow: 1;
  box-shadow: 2px 2px 5px 3px rgba(168, 168, 168, 0.2);
  border-radius: 4px;
  overflow: hidden;
  margin: 16px 8px;
`;
const CardHead = styled(Box)`
  padding: 16px;
  font-size: 20px;
  font-weight: bold;
  border-bottom: 1px solid #c4c4c4;
`;
const CardContent = styled(Box)<{ style: React.CSSProperties }>`
  display: flex;
  height: 100%;
`;
