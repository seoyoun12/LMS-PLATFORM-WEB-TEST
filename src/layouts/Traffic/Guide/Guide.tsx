import { GuideBoard } from '@components/ui/Traffic/GuideBoard';
import styled from '@emotion/styled';
import { Container, Typography, Box } from '@mui/material';
import BackgroundImage from 'public/assets/svgs/service_background.svg';

export function Guide() {
  return (
    <>
      <GuideHeaderContainer>
        <GuideHeaderTitle>고객센터</GuideHeaderTitle>
        <GuideHeaderSubtitle>
          학습에 필요한 것을 도와드립니다!
        </GuideHeaderSubtitle>
        <BackgroundImage />
      </GuideHeaderContainer>

      <GuideBoard />
    </>
  );
}

const GuideHeaderContainer = styled(Box)`
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

const GuideHeaderTitle = styled(Typography)`
  font-size: 48px;
  font-weight: 500;
  color: #fff;
`;

const GuideHeaderSubtitle = styled(Typography)`
  font-size: 17px;
  font-weight: 500;
  color: #fff;
`;
