import styled from "@emotion/styled";
import { Chip } from "@mui/material";


export const MediaDetailWrapper = styled.div`
  padding-bottom: 230px;
`;

export const MediaDetailHeaderWrapper = styled.div`
  margin-bottom: 30px;
`;

export const MediaDetailHeaderTitleText = styled.p`
  font-size: 20px;
  font-weight: bold;
`;


export const EducationChipItem = styled(Chip)`
  &:not(:last-of-type) {
    margin-right: 8px;
  }
  cursor:default ;
`;


export const MediaDetailHeaderDateText = styled.p``;

export const MediaDetailHeaderViewText = styled.p``;

// export const MediaYouTubeContainer = styled.div``;


export const VideoItemContentWrapper = styled.div`
  padding: 14px 10%;
  background-color: #fbfbfb;

  > iframe {
    width: 100%;
    height: 500px;
  }
`;
