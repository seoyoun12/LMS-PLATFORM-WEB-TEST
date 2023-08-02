import { LessonQuizResponseDto } from '@common/api/Api';
import { Modal } from '@components/ui';
import { Box, Tabs, Tab, Typography, Checkbox, Input } from '@mui/material'
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
  // console.log(quiz);
  const dummyQuiz = [
    {
      alarmContent: "알람테스트",
      answer: "",
      feedback: "",
      item1: "",
      item2: "",
      item3: "",
      item4: "",
      itemO: "",
      itemX: "",
      lessonQuizSeq: 0,
      lessonQuizTypeEnum: "ALARM",
      lessonSeq: 420,
      quizContent: "졸음운전금지",
      randomTime: true,
      setTimeMin: 0,
      setTimeSecond: 0
    },
    {
      alarmContent: "오엑스퀴즈",
      answer: "X",
      feedback: "정답은 X입니다. 아마도요",
      item1: "",
      item2: "",
      item3: "",
      item4: "",
      itemO: "O",
      itemX: "X",
      lessonQuizSeq: 0,
      lessonQuizTypeEnum: "OX_QUIZ",
      lessonSeq: 0,
      quizContent: "아마 X일거에요?",
      randomTime: true,
      setTimeMin: 0,
      setTimeSecond: 0
    },
    {
      alarmContent: "객관식퀴즈",
      answer: "X",
      feedback: "정답은 일번입니다.",
      item1: "아이템일번",
      item2: "아이탬이번",
      item3: "이아템삼번",
      item4: "아잇템사번",
      itemO: "",
      itemX: "",
      lessonQuizSeq: 0,
      lessonQuizTypeEnum: "MULTIPLE_CHOICE",
      lessonSeq: 0,
      quizContent: "정답은 몇번일까요",
      randomTime: true,
      setTimeMin: 0,
      setTimeSecond: 0
    },
  ]
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
            dummyQuiz.map((item,index) => (
              <Tab key={index} label={`퀴즈 ${index+1}`} {...a11yProps(index)} sx={{flex:1}} />
            ))
          }     
          </Tabs>
          {/* <CustomTabPanel value={tabIndex} index={0}>
          <Typography fontSize={20} fontWeight={900}>asad</Typography>
          </CustomTabPanel>
          <CustomTabPanel value={tabIndex} index={1}>
          <Typography fontSize={20} fontWeight={900}>efgh</Typography>
          </CustomTabPanel>
          <CustomTabPanel value={tabIndex} index={2}>
          <Typography fontSize={20} fontWeight={900}>ijkl</Typography>
          </CustomTabPanel> */}
          {/* 440,441,442, 450,451,452에 퀴즈넣어두기 */}

        {
          dummyQuiz.map((item,index) => (
              <CustomTabPanel key={item.quizContent} value={tabIndex} index={index}>
                
                    {
                      item.lessonQuizTypeEnum === "ALARM" ? (
                        <Box>
                          <Typography fontSize={20} fontWeight={900}>{item.alarmContent}</Typography>
                          <Box display='flex' justifyContent='flex-start' alignItems='center' gap='1rem'>
                            <Checkbox /><Typography sx={{minWidth:'80px'}}>시간 랜덤</Typography> <br />
                            <Input type="number" disabled={item.randomTime} /> 분 <Input type="number" disabled={item.randomTime} /> 초

                          </Box>
                        </Box>
                      ) : item.lessonQuizTypeEnum === "OX_QUIZ" ? (
                        <Typography fontSize={20} fontWeight={900}>{item.alarmContent}</Typography>
                      ) : (
                        <Typography fontSize={20} fontWeight={900}>{item.alarmContent}</Typography>
                      )
                    }
              </CustomTabPanel>
          ))
        }
      </Box>
    </Modal>
  )
}

export default AddQuizModal