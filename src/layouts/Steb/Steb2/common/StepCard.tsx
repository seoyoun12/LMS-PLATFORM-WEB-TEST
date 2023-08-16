import { Box, Button, Typography } from '@mui/material'
import { ReactNode } from 'react'
import BubbleBox from './BubbleBox';
import styled from '@emotion/styled';
interface Props {
  index: number;
  comment: string;
  children: ReactNode;
  nextStep: () => void;
  prevStep: () => void;
  isEndStep?: boolean; // 마지막 스텝인지 여부를 확인하는 flag
  nextStepAbled: boolean; // 다음 스텝으로 넘어갈 수 있는지 여부를 확인하는 flag
}

function StepCard({isEndStep,index, comment, children,nextStepAbled, nextStep, prevStep}:Props) {
  
  return (
    <Wrapper>
        <Box sx={{margin:'1.25rem 0 ',display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
          <BubbleBox>
            <Typography variant='h6'>STEP {index -1}</Typography>
          </BubbleBox> 
            <Typography variant='subtitle1' className='info-comment'>
              {comment.split('split')[0]}{' '}
              <Typography variant='caption' color='#f41' fontSize={16}>
                {comment.split('split')[1]}
              </Typography>
            </Typography>
        </Box>
        <ChildrenWrapper>
          {children}
        </ChildrenWrapper>
        
        <DirectionButtonGroup>
          <DirectionButton onClick={prevStep}>
          <img className='direction-arrow' src='/assets/images/prev_off.png' alt='' />
          </DirectionButton>
          {(nextStepAbled && !isEndStep) && <DirectionButton  onClick={nextStep} disabled={!nextStepAbled}>
          <img className='direction-arrow blink' src={nextStepAbled ? '/assets/images/next_on.png' : '/assets/images/next_off.png'} alt='' />
          </DirectionButton>}
        </DirectionButtonGroup>
    </Wrapper>
  )
}

export default StepCard;

const DirectionButton = styled.button`
  padding: 0.1rem;
  @keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}


  .blink{
    animation: blink 0.25s 3;
  }
`

const ChildrenWrapper = styled(Box)`
  width:80%;
  padding-bottom: 2rem;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  
  @media screen and (max-width: 514px) {
    max-width: 280px;
  }
`

const DirectionButtonGroup = styled(Box)`
    
    position:absolute;
    width:100%;
    top: 50%;
    bottom: 50%;
    display:flex;
    justify-content:space-between;
    align-items:center;
    
`

const Wrapper = styled(Box)`
    position:relative;
    width:100%;
    border: 4px solid #e7e7e7;
    box-shadow:0px 1px 4px #e7e7e7;
    margin: 2rem auto;
    display: flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    
    h6 {
      font-size: 24px;
      font-weight: bold;
    }
    .info-comment {
      font-size: 24px;
      font-weight: bold;
    }
    @media screen and (max-width: 600px) {
      padding: 2rem 0;
      h6 {
        font-size: 18px;
        font-weight: bold;
      }
      .info-comment {
        font-size: 18px;
        font-weight: bold;
      }
    }

    .direction-arrow {
      width: 60px; 
      height: 75px; 
      @media screen and (max-width: 600px) {
        width: 36px; 
        height: 42px; 
      }
    }
`
