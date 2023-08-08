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
  nextStepAbled: boolean; // 다음 스텝으로 넘어갈 수 있는지 여부를 확인하는 flag
}

function StepCard({index, comment, children,nextStepAbled, nextStep, prevStep}:Props) {
  
  return (
    <Wrapper>
        <Box sx={{margin:'1.25rem 0 ',display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
          <BubbleBox>
            <Typography variant='h6'>STEP {index -1}</Typography>
          </BubbleBox>  
            <Typography className='info-comment'> {comment}  </Typography>
        </Box>
        <ChildrenWrapper>
          {children}
        </ChildrenWrapper>
        
        <DirectionButtonGroup>
          <img onClick={prevStep}  className='direction-arrow' src='/assets/images/prev_off.png' alt='' />
          {index < 8 && <img onClick={nextStep} className='direction-arrow'  src={nextStepAbled ? '/assets/images/next_on.png' : '/assets/images/next_off.png'} alt='' />}
        </DirectionButtonGroup>
    </Wrapper>
  )
}

export default StepCard;

const ChildrenWrapper = styled(Box)`
  width:100%;
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