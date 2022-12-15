import { ServiceBoard } from '@components/ui/Traffic/ServiceBoard';
import styled from '@emotion/styled';
import { Box, Container, Typography } from '@mui/material';
import BackgroundImage from 'public/assets/svgs/service_background.svg';

export function Service() {
  return (
    <>
      <ServiceHeaderContainer>
        <ServiceHeaderTitle>고객센터</ServiceHeaderTitle>
        <ServiceHeaderSubtitle>
          학습에 필요한 것을 도와드립니다!
        </ServiceHeaderSubtitle>
        <BackgroundImage />
      </ServiceHeaderContainer>

      <ServiceBoard />
    </>
  );
}

const ServiceHeaderContainer = styled(Box)`
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

const ServiceHeaderTitle = styled(Typography)`
  font-size: 48px;
  font-weight: 500;
  color: #fff;
`;

const ServiceHeaderSubtitle = styled(Typography)`
  font-size: 17px;
  font-weight: 500;
  color: #fff;
`;
