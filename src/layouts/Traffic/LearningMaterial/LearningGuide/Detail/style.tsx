import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { css } from "@emotion/react";

export const GuideDetailWrapper = styled.div`
  padding-bottom: 230px;
`;

export const GuideDetailHeaderWrapper = styled.div`
  margin-bottom: 30px;
`;

export const GuideDetailHeaderTitleText = styled.p`
  font-size: 20px;
  font-weight: bold;
`;

export const GuideDetailHeaderDateWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const GuideDetailHeaderDateText = styled.p``;

export const GuideDetailHeaderViewText = styled.p``;

export const SlideContentContainer = styled.div`
  margin-bottom: 60px;
`;

export const SlideContainer = styled.div`
  overflow: hidden;
  width: 100%;
  position: relative;
`;

export const SlideProgressContainer = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  width: 100%;
  overflow-x: hidden;
  background-color: rgb(64, 64, 64);
`;

export const SlideProgressContentWrapper = styled.div`
  width: 0;
  height: 5px;
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  position: relative;
`;

export const SlideProgressBarWrapper = styled.div`
  position: absolute;
  background-color: #1bcacd;
  width: 100%;
  top: 0;
  bottom: 0;
  left: -100%;
  height: 5px;
  z-index: 100;
  transition: transform 0.5s;

  &::after {
    content: "";
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(0, -50%);
    width: 20px;
    height: 20px;
    background-color: #1bcacd;
    z-index: 999;
    border-radius: 50%;
  }
`;

export const SlideProgressTextWrapper = styled.div`
  padding: 0 10px;
  display: flex;
  align-items: center;
`;

export const SlideProgressSelectedText = styled.p`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;

export const SlideProgressText = styled.p`
  color: rgb(190, 190, 190);
  font-size: 18px;
`;

export const SlideWrapper = styled.div`
  display: flex;
`;

export const SlideItem = styled.div`
  flex: 0 0 100%;
  height: 675px;
  overflow: hidden;

  > img {
    width: 100%;
    height: 100%;
  }
`;

export const SlideArrow = styled(Button)`
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);

  > svg {
    transform: scale(2);
    font-size: 30px;
    color: #000;
  }

  &.MuiButtonBase-root {
    width: 60px;
    min-width: 60px;
    height: 60px;
  }
`;

export const SlideArrowLeft = styled(SlideArrow)`
  left: 20px;

  > svg {
    transform: scale(2) rotate(180deg);
  }
`;

export const SlideArrowRight = styled(SlideArrow)`
  right: 20px;
`;

export const SlideThumbContainer = styled.div`
  overflow: hidden;
  width: 100%;
`;

export const SlideThumbWrapper = styled.div`
  display: flex;
`;

interface SlideThumbItemProps {
  selected: boolean;
}

export const SlideThumbItem = styled.div<SlideThumbItemProps>`
  min-width: 355px;
  height: 200px;
  overflow: hidden;
  margin-right: 30px;

  ${({ selected }) =>
    selected &&
    css`
      border: 2px solid #000;
    `}

  > img {
    width: 100%;
    height: 100%;
  }
`;
