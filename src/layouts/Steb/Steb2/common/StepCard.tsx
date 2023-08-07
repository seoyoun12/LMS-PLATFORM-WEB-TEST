import { Box, Button, Typography } from '@mui/material'
import { ReactNode } from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import BubbleBox from './BubbleBox';
import Image from 'next/image';
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
      width='100%'
      position='relative'
      border='4px solid #e7e7e7'
      boxShadow='0px 1px 4px #e7e7e7'
      sx={{
        margin: '2rem auto',display: 'flex', flexDirection:'column', justifyContent:'center', alignItems:'center',width:'100%',minWidth:'460px',minHeight:'180px',padding: '3rem 5rem'
        }} >

        <Box sx={{margin:'1.25rem 0 ',display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
          <BubbleBox>
            <Typography variant='h6' sx={{fontSize:'24px', fontWeight:'bold'}}>STEP {index -1}</Typography>
          </BubbleBox>  
            <Typography fontSize='24px' fontWeight='bold'> {comment} </Typography>
        </Box>
        <Box
          width='100%'
          paddingLeft='1rem'
          sx={{
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
          }}
          >
          {children}
        </Box>




        <Box
          sx={{
            position:'absolute',
            bottom: '30%',
            display:'flex',
            justifyContent:'space-between',
            alignItems:'center',
            width:'100%',  
          }}
        >
        <Button onClick={prevStep}  size="small" variant='text' sx={{border:'none'}}>
          <Image src='/assets/images/prev_off.png' width={60} height={105} alt='' />
        </Button>
        <Button onClick={nextStep}  size="small" variant='text' sx={{border:'none'}} disabled={!nextStepAbled}>
          <Image src={nextStepAbled ? '/assets/images/next_on.png' : '/assets/images/next_off.png'} width={60} height={105} alt='' />
        </Button>
        </Box>
    </Box>
  )
}

export default StepCard
