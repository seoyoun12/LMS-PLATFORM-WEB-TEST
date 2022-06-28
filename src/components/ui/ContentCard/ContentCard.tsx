import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import styled from '@emotion/styled';
import { setLineClamp } from '@styles/mixins';

interface Props {
  maxWidth?: number;
  minWidth?: number;
  title: string;
}

export function ContentCard({ maxWidth = 345, minWidth = 272, title }: Props) {
  return (
    <Card sx={{ maxWidth, minWidth }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://picsum.photos/276"
          alt="green iguana"
        />
        <CardContent>
          <Title gutterBottom variant="h5">
            {title}
          </Title>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

const Title = styled(Typography)`
  ${setLineClamp(1)}
`;
