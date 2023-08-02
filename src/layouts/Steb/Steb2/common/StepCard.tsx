import { Box, Button, Typography } from '@mui/material'
import { ReactNode } from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import BubbleBox from './BubbleBox';
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
    <Box
      position='relative'
      border='1px solid #f41'
      boxShadow='0px 1px 4px #f41'
      sx={{margin: '1rem auto',display: 'flex', flexDirection:'column', justifyContent:'center', alignItems:'center',width:'100%',minWidth:'460px',minHeight:'180px',padding: '3rem 5rem'}} >
      <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center', width:'100%',padding:'.25rem 1rem'}}>
        <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'flex-start'}}>
          <BubbleBox>
            <Typography variant='h6' sx={{fontSize:'20px', fontWeight:'bold'}}>STEP {index}</Typography>
          </BubbleBox>
          <Box sx={{fontSize:'0.75rem', fontWeight:'bold'}}>
            <Typography fontSize='18px'>
              {comment}
            </Typography>
            </Box>
        </Box>
      </Box>
        <Box width='100%' paddingLeft='1rem'>
          {children}
        </Box>
        {(index !== 9 && nextStepAbled) && <Box position='absolute' sx={{top:'30%',right:'-2.5%'}} >
          <Button onClick={nextStep} fullWidth size="small" variant='text' sx={{':hover' : {backgroundColor:'transparent',border:'none'}}}>
            <ArrowForwardIosIcon sx={{fontSize:'120px',color:'rgb(194,51,51)'}} />
          </Button>
        </Box>}
        {index !== 1 && <Box position='absolute' sx={{top:'30%',left:'-2.5%'}} >
          <Button onClick={prevStep} fullWidth size="small" variant='text' sx={{':hover' : {backgroundColor:'transparent',border:'none'}}}>
            <ArrowBackIosNewIcon sx={{fontSize:'120px',color:'#aaa'}} />
          </Button>
        </Box>}
    </Box>
  )
}

export default StepCard
