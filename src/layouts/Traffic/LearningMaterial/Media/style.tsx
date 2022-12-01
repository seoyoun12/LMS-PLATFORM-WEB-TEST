import styled from "@emotion/styled";
import { ButtonBase } from "@mui/material";

export const MediaContainer = styled.div``;

export const MediaContentContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 62px auto 0 auto;
  padding: 0;

  @media (max-width: 768px) {
    padding: 32px 12px;
    margin: 0;
  }
`;

export const MediaItemContainer = styled(ButtonBase)`
  display: flex;
  flex-direction: column;
  width: 280px;
  margin: 0 26px 30px 0;
  text-align: left;
  align-items: flex-start;

  &:nth-of-type(4n) {
    margin-right: 0;
  }

  @media (max-width: 786px) {
    width: 100%;
    margin: 0 0 32px 0;
  }
`;

export const MediaItemImageContainer = styled.div`
  width: 100%;
  height: 200px;
  background-color: #f6f6f6;
  border-radius: 8px;
  margin-bottom: 10px;

  > img {
    width: 100%;
    height: 100%;
  }
`;

export const MediaItemContentContainer = styled.div`
  width: 100%;
`;

export const MediaItemContentHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
`;

export const MediaItemContentTitle = styled.p`
  width: 0;
  flex-grow: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 20px;
  font-weight: 500;
`;

export const MediaItemContentDate = styled.p`
  color: #858585;
`;

export const MediaItemContentSubtitle = styled.p``;
