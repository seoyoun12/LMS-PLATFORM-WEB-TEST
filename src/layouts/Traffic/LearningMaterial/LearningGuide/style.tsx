import styled from "@emotion/styled";
import { ButtonBase } from "@mui/material";

export const LearningGuideContainer = styled.div``;

export const LearningGuideHeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 262px;
  position: relative;
  overflow: hidden;

  > svg {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translate(-50%, 0);
    z-index: -1;
  }
`;

export const LearningGuideHeaderTitle = styled.p`
  font-size: 48px;
  font-weight: 500;
  color: #fff;
  line-height: 42px;
  margin-bottom: 10px;
`;

export const LearningGuideHeaderSubtitle = styled.p`
  font-size: 17px;
  font-weight: 500;
  color: #fff;
  word-break: break-word;
  text-align: center;
`;

export const LearningGuideContentContainer = styled.div`
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

export const LearningGuideItemContainer = styled(ButtonBase)`
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

export const LearningGuideItemImageContainer = styled.div`
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

export const LearningGuideItemContentContainer = styled.div`
  width: 100%;
`;

export const LearningGuideItemContentHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
`;

export const LearningGuideItemContentTitle = styled.p`
  width: 0;
  flex-grow: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 20px;
  font-weight: 500;
`;

export const LearningGuideItemContentDate = styled.p`
  color: #858585;
`;

export const LearningGuideItemContentSubtitle = styled.p``;
