import { Box} from '@mui/material';
import React from 'react'
import styled from 'styled-components';
import OXButton from './OXButton';

interface Props {
  quizAnswer: string;
  ox: string[];
  onChoiceAnswer: (str: string) => void
}

function OXQuiz({ ox, onChoiceAnswer }: Props) {

  // console.log(quizAnswer,itemO,itemX)
  return (
    <Container>
      <InnerContainer>
          <OXButton
            bgColor='#83bc5c'
            ox={ox[0]}
            onClick={() => onChoiceAnswer(ox[0])}
          />
          <OXButton
            bgColor='#4f8ad1'
            ox={ox[1]}
            onClick={() => onChoiceAnswer(ox[1])}
          />
      </InnerContainer>
    </Container>
  )
}

export default OXQuiz;

const Container = styled(Box)`
  padding:2rem;
  width:100%;
`
const InnerContainer = styled(Box)`
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:1rem;
  width:90%;
  margin:0 auto;
` 