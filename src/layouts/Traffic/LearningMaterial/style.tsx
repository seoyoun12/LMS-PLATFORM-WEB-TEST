import styled from "@emotion/styled";

export const LearningMaterialHeaderContainer = styled.div`
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

export const LearningMaterialHeaderTitle = styled.p`
  font-size: 48px;
  font-weight: 500;
  color: #fff;
  line-height: 42px;
  margin-bottom: 10px;
`;

export const LearningMaterialHeaderSubtitle = styled.p`
  font-size: 17px;
  font-weight: 500;
  color: #fff;
  margin: 0 30px;
  word-break: break-word;
`;
