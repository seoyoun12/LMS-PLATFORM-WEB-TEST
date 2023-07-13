import { Box, Button, Container, styled } from '@mui/material';
import { useState } from 'react';

export default function Steb2() {
  const [step, setStep] = useState(1);

  const handleStepIncrease = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleStepDecrease = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const renderComponent = () => {
    switch (step) {
      case 1:
        return (
          <Steb2BodyContainer>
            <StebOneBox>여긴스탭2-1이야</StebOneBox>
          </Steb2BodyContainer>
        );
      case 2:
        return (
          <Steb2BodyContainer>
            <StebTwoBox>여긴스탭2-2이야</StebTwoBox>
          </Steb2BodyContainer>
        );
      case 3:
        return (
          <Steb2BodyContainer>
            <StebThreeBox>여긴스탭2-3이야</StebThreeBox>
          </Steb2BodyContainer>
        );
      default:
        return null;
    }
  };
  return (
    <Steb2Wrap>
      <Steb2ButtonWrap>
        <Button onClick={handleStepIncrease}>←</Button>
        <Button onClick={handleStepDecrease}>→</Button>
      </Steb2ButtonWrap>
      {renderComponent()}
    </Steb2Wrap>
  );
}

const Steb2Wrap = styled(Box)``;

const Steb2BodyContainer = styled(Container)`
  /* padding: 0 1rem; */
  margin-top: 6rem;
  margin-bottom: 4rem;
  display: flex;
  border: 1px solid red;

  .MuiTextField-root {
    background: #eeefff;
  }
  .MuiSelect-select {
    background: #eeefff;
  }
`;

const Steb2ButtonWrap = styled(Box)`
  border: 1px solid blue;
  display: flex;
  vertical-align: center;
  align-items: center;
`;

const StebOneBox = styled(Box)`
  background-color: red;
  width: 100%;
  height: 100%;
`;
const StebTwoBox = styled(Box)`
  background-color: green;
  width: 100%;
  height: 100%;
`;
const StebThreeBox = styled(Box)`
  background-color: blue;
  width: 100%;
  height: 100%;
`;
