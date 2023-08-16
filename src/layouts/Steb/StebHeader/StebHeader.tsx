import { Box, styled, Typography } from '@mui/material';
import Image from 'next/image';

export default function StebHeader({ value }: { value: number }) {
  return (
    <>
      <Box
        position='relative'
        width='100%'
      >
      <Box
        position='relative'
        width='100%'
        height='30%'
        margin='0 auto'
      >
      <Image src='/assets/images/training_scadule.png' width={1920} height={322} layout='intrinsic' alt='' />
      <Box
        height='content-fit'
        display="flex"
        justifyContent='center'
        alignItems='center'
        gap='4rem'
        >
        <Box 
          position='absolute'
          display='flex'
          justifyContent='center'
          alignItems='center'
          width='100%'
          height='100%'
          gap='4rem'
        >
        <StepHeaderProgessIcon>
            <Image
              src={value === 1 ? '/assets/images/education-schedule-red-circle-icon.png' : '/assets/images/lightOffEduScheduleIcon.png'}
              width={120}
              height={120}
              alt=''
            />
        </StepHeaderProgessIcon>
        <StepHeaderProgessIcon>
          <Image src={value === 2 ? '/assets/images/education-application-red-circle-icon.png' : '/assets/images/lightOffJoinIcon.png'} width={120} height={120} alt='' />
        </StepHeaderProgessIcon>
        <StepHeaderProgessIcon>
            <Image
              src={value === 3 ? '/assets/images/education-complete-red-circle-icon.png' : '/assets/images/lightOffJoinCompleteIcon.png'}
              width={120}
              height={120}
              alt=''
            />
        </StepHeaderProgessIcon>
        </Box>
        </Box>
      </Box>
      
      </Box>
    </>
  );
}

const StepHeaderProgessIcon = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
