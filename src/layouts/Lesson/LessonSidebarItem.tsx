import React from "react";
import styled from "@emotion/styled";
import { Box } from "@mui/system";
import { grey } from "@mui/material/colors";
import { Typography } from "@mui/material";
import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import type { LessonDetailClientResponseDto } from "@common/api/Api";

interface Props {
  lesson: LessonDetailClientResponseDto;
  active?: boolean;
  completed?: boolean;
  onClick?: () => void;
}

export default function LessonSidebarItem(props: Props) {

  // 변수.

  const completedColor = props.completed ? "#256aef" : grey[500];

  // 렌더링.

  return (
    <ItemContainer onClick={props.onClick}>
      <ItemContent>
        <ItemContentTitle variant="body1">{props.lesson.lessonNm}</ItemContentTitle>
        <ItemInfo>
          <ItemInfoPlayIcon/>
          <ItemInfoTime variant="body2">
            {Math.floor(props.lesson.totalTime / 60).toString().padStart(2, "0")}:{(props.lesson.totalTime % 60).toString().padStart(2, "0")}
          </ItemInfoTime>
        </ItemInfo>
      </ItemContent>
      <ItemCheck>
        {props.active && <ItemPlayCircle/>}
        <ItemCheckStatus sx={{ color: completedColor }}>{props.completed ? "학습 완료" : "미학습"}</ItemCheckStatus>
        <ItemCheckCircle sx={{ color: completedColor }}/>
      </ItemCheck>
    </ItemContainer>
  );

}

const ItemContainer = styled.div`
  display: flex;
  padding: 0.75rem;
  min-height: 2.5rem;
  color: ${grey[900]};
  justify-content: space-between;
  cursor: pointer;
`;

const ItemContent = styled(Box)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ItemContentTitle = styled(Typography)`
  margin-right: 8px;
  white-space: nowrap;
  overflow: hidden;
  font-size: inherit;
  text-overflow: ellipsis;

  .active & {
    font-weight: 700;
  }
`;

const ItemInfo = styled.div`
  display: flex;
  padding-top: 4px;
  color: ${grey[500]};
  align-items: center;
`;

const ItemInfoPlayIcon = styled(PlayCircleOutlinedIcon)`
  color: inherit;
  font-size: inherit;
`;

const ItemInfoTime = styled(Typography)`
  color: inherit;
  font-size: inherit;
`;

const ItemPlayCircle = styled(PlayCircleIcon)`
  color: ${grey[500]};
  margin-right: 8px;
  font-size: inherit;
`;

const ItemCheck = styled(Box)`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

const ItemCheckStatus = styled(Typography)`
  margin-right: 8px;
  font-size: inherit;
`;

const ItemCheckCircle = styled(CheckCircleIcon)`
  font-size: inherit;
`;
