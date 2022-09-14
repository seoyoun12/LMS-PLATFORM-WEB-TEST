import styled from "@emotion/styled";
import { Chip } from "@mui/material";
import { TableHeader } from "@layouts/Traffic/LearningMaterial/style";

export const VideoWrapper = styled.div`
  padding: 0 0 230px 0;
`;

interface VideoItemWrapperProps {
  open: boolean;
}

export const VideoItemWrapper = styled.div<VideoItemWrapperProps>`
  width: 100%;
  height: ${({ open }) => (open ? `auto` : `75px`)};
  overflow: hidden;
  border-bottom: 1px solid #cdcdcd;
`;

export const VideoItemHeaderWrapper = styled(TableHeader)`
  border: 0;
`;

interface VideoItemHeaderDateWrapperProps {
  open?: boolean;
}

export const VideoItemHeaderDateWrapper = styled.div<VideoItemHeaderDateWrapperProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  > svg {
    transform: rotate(${({ open }) => (open ? 0 : "180deg")});
  }
`;

export const VideoItemHeaderDateText = styled.p`
  color: #8f8f8f;
  margin-right: 12px;
`;

export const VideoItemContentWrapper = styled.div`
  padding: 14px 10%;
  background-color: #fbfbfb;

  > iframe {
    width: 100%;
    height: 500px;
  }
`;
