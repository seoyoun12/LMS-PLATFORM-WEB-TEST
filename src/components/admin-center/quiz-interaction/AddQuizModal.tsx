import { LessonQuizResponseDto } from '@common/api/Api';
import { Modal } from '@components/ui';
import { Box, Tabs, Tab, Typography } from '@mui/material'
import a11yProps from '@utils/a11yProps';
import { SyntheticEvent, useState } from 'react';
import CustomTabPanel from '../drawer/CustomTabPanel';

interface Props {
  open: boolean;
  onCloseModal: () => void;
  quiz: LessonQuizResponseDto[];
}
  // alarmContent?: string;
  // answer?: string;
  // feedback?: string;
  // item1?: string;
  // item2?: string;
  // item3?: string;
  // item4?: string;
  // itemO?: string;
  // itemX?: string;
  // lessonQuizSeq?: number;
  // lessonQuizTypeEnum?: "ALARM" | "MULTIPLE_CHOICE" | "OX_QUIZ";
  // lessonSeq?: number;
  // quizContent?: string;
  // randomTime?: boolean;
  // setTimeMin?: number;
  // setTimeSecond?: number;


function AddQuizModal({ open, onCloseModal, quiz }: Props) {
  const [tabIndex, setTabIndex] = useState(0);

  const onChange = (event: SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };
  return (
    <Modal
      open={open}
      onCloseModal={onCloseModal}
      sx={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        height:'100%',
        borderRadius:'10px',
        margin: 'auto',
        background: 'rgba(0,0,0,0.2)',
      }}
      fullWidth
      title="퀴즈상태 변경"
      >
      <Box
        sx={{
          width:'100%',
          minHeight:'590px',
          padding: '1rem',
          border: '1px solid red',
          marginTop:'1rem'
        }}
      >
         <Tabs value={tabIndex} onChange={onChange} aria-label="basic tabs example" sx={{padding:'0 1rem'}}>
          {
            // length:3 을 quiz.length로 바꿔야 함.
            Array.from({length: 3}, (_, i) => i).map((index) => (
              <Tab key={index} label={`퀴즈 ${index+1}`} {...a11yProps(index)} sx={{flex:1}} />
            ))
          }     
          </Tabs>
        {
          quiz.map((quiz) => (
              <CustomTabPanel key={quiz.quizContent} value={tabIndex} index={0}>
                    
              </CustomTabPanel>
          ))
        }
        <Typography fontSize={40} fontWeight={900}>Hello world!!</Typography>
      </Box>
    </Modal>
  )
}

export default AddQuizModal