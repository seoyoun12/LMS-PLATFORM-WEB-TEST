import styled from '@emotion/styled';
import { Chip } from '@mui/material';

export const MediaDetailWrapper = styled.div`
  padding: 0 8px 150px;
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
  cursor: default;
`;

export const MediaDetailHeaderDateText = styled.p`
  margin-bottom: 12px;
`;

export const MediaDetailHeaderViewText = styled.p``;

// export const MediaYouTubeContainer = styled.div``;

export const VideoItemContentWrapper = styled.div`
  padding: 14px 10%;
  background-color: #fbfbfb;
  > iframe {
    width: 100%;
    /* height: 500px; */
    aspect-ratio: 16/9;
  }
  @media (max-width: 1024px) {
    padding: 14px 0%;
  }
`;

export const MediaDetailContentWrapper = styled.div`
  padding-top: 32px;
`;

export const MediaDetailBoardLinksWrapper = styled.div`
  display: flex;
  gap: 300px;
  padding-top: 100px;
  @media (max-width: 1024px) {
    gap: 100px;
    padding-top: 80px;
  }
  @media (max-width: 768px) {
    gap: 4px;
    padding-top: 80px;
  }
`;

export const MediaDetailBoardLinkItem = styled.div`
  flex: 1 1 0%;
  display: block;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
`;

export const MediaDetailBoardLinkItemBlock = styled.div`
  background-color: #f8f9fa;
  padding: 16px;
  cursor: pointer;
`;

export const MediaDetailBoardLinkItemDescription = styled.div`
  font-size: 12px;
`;
export const MediaDetailBoardLinkItemTitle = styled.div`
  font-weight: bold;
  text-overflow: ellipsis;
  overflow: hidden;
  //?? 상위 박스에hidden 넣어줘야함. 그래야 잘받음.
`;
