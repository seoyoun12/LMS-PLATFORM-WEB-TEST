import styled from '@emotion/styled';
import { Box, BoxProps, Typography } from '@mui/material';

export function Card({
  children,
  header,
  wrapSx,
  contentSx,
}: {
  children: React.ReactNode;
  header?: string;
  wrapSx?: React.CSSProperties;
  contentSx?: React.CSSProperties;
}) {
  return (
    <CardWrap style={wrapSx}>
      {header && <CardHead>{header}</CardHead>}
      <CardContent style={contentSx}>{children}</CardContent>
    </CardWrap>
  );
}

// export default function Cardd() {
//   return (
//     <Card sx={{ display: 'flex' }}>
//       <Box sx={{ display: 'flex', flexDirection: 'column' }}>gd </Box>
//       <CardMedia
//         component="img"
//         sx={{ width: 151 }}
//         image="/static/images/cards/live-from-space.jpg"
//         alt="Live from space album cover"
//       />
//     </Card>
//   );
// }

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
