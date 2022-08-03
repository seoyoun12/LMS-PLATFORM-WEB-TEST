import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Divider } from "@mui/material";
import styled from "@emotion/styled";
import { setLineClamp } from "@styles/mixins";
import { grey } from "@mui/material/colors";

interface Props {
  maxWidth?: number;
  minWidth?: number;
  title: string;
  content1?: string;
  content2?: string;
}

export function ContentCard({ maxWidth, minWidth, title, content1, content2 }: Props) {
  return (
    <Card sx={{ maxWidth, minWidth }}>
      <CardActionArea>
        <CardMedia component="img" height="140" image="https://picsum.photos/276" alt="green iguana" />
        <CardContent>
          <Title gutterBottom variant="h5">
            {title}
          </Title>
          <Typography>{content1}</Typography>
          <Divider sx={{ borderBottom: `2px solid ${grey[500]}`, width: "75%", margin: "1rem 0" }} />
          <Typography>{content2}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

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
