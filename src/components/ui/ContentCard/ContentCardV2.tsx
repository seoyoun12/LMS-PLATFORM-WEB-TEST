import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea, Divider } from '@mui/material';
import styled from '@emotion/styled';
import { setLineClamp } from '@styles/mixins';
import { grey } from '@mui/material/colors';
import { useEffect, useRef, useState } from 'react';

interface Props {
  maxWidth?: number;
  minWidth?: number;
  image?: string;
  title: string;
  content1?: string;
  content2?: string;
}

export function ContentCardV2({
  maxWidth,
  minWidth,
  title,
  content1,
  content2,
  image,
}: Props) {
  const divRef = useRef<HTMLDivElement>();
  const [width, setWidth] = useState<string>(
    divRef.current && getComputedStyle(divRef.current).getPropertyValue('width')
  );
  const handleSetWidth = () => {
    if (divRef.current)
      setWidth(getComputedStyle(divRef.current).getPropertyValue('width'));
  };

  useEffect(() => {
    setWidth(getComputedStyle(divRef.current).getPropertyValue('width'));
    window.addEventListener('resize', handleSetWidth);
    return () => {
      window.removeEventListener('resize', handleSetWidth);
    };
  }, []);

  return (
    <Box sx={{ maxWidth, minWidth }}>
      <CardActionArea>
        <ImgBox ref={divRef}>
          <CardMedia
            component="img"
            // height="140"
            image={image || 'https://picsum.photos/276'}
            // sx={{ height: `calc((${width}  / 16) * 9)` }}
            sx={{ aspectRatio: '16 / 9' }}
            alt="green iguana"
          />
        </ImgBox>
        {/* <CardContent> */}
        <Title gutterBottom variant="h5" mt={1}>
          {title}
        </Title>
        {/* </CardContent> */}
        <Typography>{content1}</Typography>
        <Divider sx={{ borderBottom: `1px solid #D4D4D4` }} />
        {/* <CardContent> */}
        <Typography mt={1} mb={2} color="primary.main">
          {content2}
        </Typography>
        {/* </CardContent> */}
      </CardActionArea>
    </Box>
  );
}

const ImgBox = styled(Box)`
  border-radius: 4px;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

const Title = styled(Typography)`
  ${setLineClamp(1)}
`;

// const TakeCourse = styled(Typography)`
//   font-weight: bold;
//   color: #3498db;
// `;

// const OverDay = styled(Typography)`
//   font-weight: bold;
// `;
