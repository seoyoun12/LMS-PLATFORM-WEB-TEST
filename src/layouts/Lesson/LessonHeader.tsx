import styled from '@emotion/styled';
import { Box, Button, Container } from '@mui/material';
import Image from 'next/image';

export default function LessonHeader() {
  const onCloseWindow = () => {
    window.close();
  };

  return (
    <HeaderWrap>
      <HeaderContainer>
        <Box className="lesson-header-img">
          <Image
            src="/assets/images/cttsLogo.png"
            // width={224}
            // height={40}
            layout="fill"
            alt="Your Name"
          />
        </Box>
        <Button variant="contained" onClick={onCloseWindow}>
          학습종료
        </Button>
      </HeaderContainer>
    </HeaderWrap>
  );
}

const HeaderWrap = styled(Box)`
  border-bottom: 1px solid #3498db;
`;
const HeaderContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 8px;
  .lesson-header-img {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 224px;
    height: 40px;
  }
  @media (max-width: 450px) {
    .lesson-header-img {
      width: 180px;
      height: 32px;
    }
  }
`;
