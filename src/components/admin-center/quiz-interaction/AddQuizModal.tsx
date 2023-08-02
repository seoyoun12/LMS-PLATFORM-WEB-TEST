import { LessonQuizResponseDto } from '@common/api/Api';
import { Modal } from '@components/ui';
import { Box, Tabs, Tab, Typography, Checkbox, Input, TextField, ButtonGroup, Button, RadioGroup, Radio, FormControlLabel } from '@mui/material'
import a11yProps from '@utils/a11yProps';
import { SyntheticEvent, useEffect, useState } from 'react';
import CustomTabPanel from '../drawer/CustomTabPanel';
import { Delete } from '@material-ui/icons';
import { Lesson } from '@common/api/lesson';
import TabsLayout from './TabsLayout';
import QuizTextField from './QuizTextField';
import QuizTimeInput from './QuizTimeInput';




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
  const [form, setForm] = useState<Partial<LessonQuizResponseDto>>(null)
  
  const onTabChange = (event: SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const onFormChange = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    const { name, value } = target;
    setForm({
      ...form,
      [name]: value
    })
  }

  useEffect(() => {
    if(!quiz) return;
    // const currentQuiz = quiz.find((item) => item.lessonQuizSeq === quiz[tabIndex].lessonQuizSeq)
    setForm(quiz[tabIndex])
  } ,[quiz,tabIndex])
  
  console.log(form);
  // const dummyQuiz = [
    // {
    //   alarmContent: "알람테스트",
    //   answer: "",
    //   feedback: "",
    //   item1: "",
    //   item2: "",
    //   item3: "",
    //   item4: "",
    //   itemO: "",
    //   itemX: "",
    //   lessonQuizSeq: 0,
    //   lessonQuizTypeEnum: "ALARM",
    //   lessonSeq: 420,
    //   quizContent: "졸음운전금지",
    //   randomTime: true,
    //   setTimeMin: 0,
    //   setTimeSecond: 0
    // },
  //   {
  //     alarmContent: "오엑스퀴즈",
  //     answer: "X",
  //     feedback: "정답은 X입니다. 아마도요",
  //     item1: "",
  //     item2: "",
  //     item3: "",
  //     item4: "",
  //     itemO: "O",
  //     itemX: "X",
  //     lessonQuizSeq: 0,
  //     lessonQuizTypeEnum: "OX_QUIZ",
  //     lessonSeq: 0,
  //     quizContent: "아마 X일거에요?",
  //     randomTime: true,
  //     setTimeMin: 0,
  //     setTimeSecond: 0
  //   },
  //   {
  //     alarmContent: "객관식퀴즈",
  //     answer: "X",
  //     feedback: "정답은 일번입니다.",
  //     item1: "아이템일번",
  //     item2: "아이탬이번",
  //     item3: "이아템삼번",
  //     item4: "아잇템사번",
  //     itemO: "",
  //     itemX: "",
  //     lessonQuizSeq: 0,
  //     lessonQuizTypeEnum: "MULTIPLE_CHOICE",
  //     lessonSeq: 0,
  //     quizContent: "정답은 몇번일까요",
  //     randomTime: true,
  //     setTimeMin: 0,
  //     setTimeSecond: 0
  //   },
  // ]
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
         <Tabs value={tabIndex} onChange={onTabChange} aria-label="basic tabs example" sx={{padding:'0 1rem'}}>
          {
            quiz &&
            quiz.map((item,index) => (
              <Tab key={index} label={`퀴즈 ${index+1}`} {...a11yProps(index)} sx={{flex:1}} />
            ))
          }
          </Tabs>
          {/* 440,441,442, 450,451,452에 퀴즈넣어두기 */}

        {quiz &&
          quiz.map((item,index) => (
              <CustomTabPanel key={item.quizContent} value={tabIndex} index={index}>
                    {
                      item.lessonQuizTypeEnum === "ALARM" && (
                          <TabsLayout>
                            <QuizTextField
                             name='alarmContent'
                             label="퀴즈 제목"
                             value={form?.alarmContent || item.alarmContent}
                             onChange={onFormChange}
                            />
                          <Box display='flex' justifyContent='flex-start' alignItems='center' gap='1rem'>
                            <Checkbox
                              name='randomTime'
                              checked={form?.randomTime || item.randomTime}
                              value={form?.randomTime || item.randomTime}
                              onChange={onFormChange}
                            />
                            <Typography sx={{minWidth:'80px'}}>시간 랜덤</Typography>
                            <QuizTimeInput
                              item={item}
                              onChange={onFormChange}
                              text='분'
                              value={form?.setTimeMin || item.setTimeMin}
                            />
                            <Input
                              name='setTimeMin'
                              type="number"
                              disabled={item.randomTime}
                              value={form?.setTimeMin || item.setTimeMin}
                              onChange={onFormChange}
                              /> 분
                            <Input
                              name='setTimeSecond'
                              type="number"
                              disabled={item.randomTime}
                              value={form?.setTimeSecond || item.setTimeSecond}
                              onChange={onFormChange}
                            /> 초
                          </Box>
                            
                            <TextField
                              name='quizContent'
                              id="filled-multiline-flexible"
                              label="알람 메세지"
                              multiline
                              rows={8}
                              variant="filled"
                              value={form?.quizContent || item.quizContent}
                              fullWidth
                              onChange={onFormChange}
                            />
                          </TabsLayout>
                      )}
                      {
                       item.lessonQuizTypeEnum === "OX_QUIZ" && (
                        <Box
                          display='flex'
                          flexDirection='column'
                          justifyContent='space-between'
                          alignItems='center'
                          gap='2rem'
                          >
                          <TextField

                            id="outlined-basic"
                            label="퀴즈 제목"
                            variant="outlined"
                            value={item.alarmContent}
                            fullWidth
                            rows={2}
                            />

                          <Box display='flex' justifyContent='flex-start' alignItems='center' gap='1rem'>
                            <Checkbox checked={item.randomTime} /><Typography sx={{minWidth:'80px'}}>시간 랜덤</Typography>
                            <Input
                              type="number"
                              disabled={item.randomTime}
                              value={item.setTimeMin}
                              /> 분
                            <Input
                              type="number"
                              disabled={item.randomTime}
                              value={item.setTimeSecond}
                            /> 초
                          </Box> 
                          <TextField
                              id="filled-multiline-flexible"
                              label="퀴즈 본문"
                              multiline
                              rows={4}
                              variant="filled"
                              value={item.quizContent}
                              fullWidth
                            />

                              <Box
                                width='100%'
                                display='flex'
                                flexDirection='column'
                                gap='0.5rem'
                                >
                                <Typography alignSelf='flex-start'>정답</Typography>
                                    <RadioGroup row>
                                      <FormControlLabel value={item.itemO} control={<Radio />} label="O" />
                                      <FormControlLabel value={item.itemX} control={<Radio />} label="X" />
                                    </RadioGroup>
                                </Box>
                                <Box
                                width='100%'
                                display='flex'
                                flexDirection='column'
                                gap='0.5rem'
                                >
                                  <Typography>피드백</Typography>
                                  <TextField
                                    id="outlined-basic"    
                                    variant="outlined"
                                    value={item.feedback}
                                    sx={{
                                      flex:1,
                                      height:'100%'
                                    }}
                                    size='small'
                                    fullWidth
                                    />
                                </Box>
                        </Box>
                      )}
                      
                      { item.lessonQuizTypeEnum === "MULTIPLE_CHOICE"
                      && (
                        <Box
                          display='flex'
                          flexDirection='column'
                          justifyContent='space-between'
                          alignItems='center'
                          gap='2rem'
                          >
                          <TextField
                            id="outlined-basic"
                            label="퀴즈 제목"
                            variant="outlined"
                            value={item.alarmContent}
                            fullWidth
                            rows={2}
                            />

                          <Box display='flex' justifyContent='flex-start' alignItems='center' gap='1rem'>
                            <Checkbox checked={item.randomTime} /><Typography sx={{minWidth:'80px'}}>시간 랜덤</Typography>
                            <Input
                              type="number"
                              disabled={item.randomTime}
                              value={item.setTimeMin}
                              /> 분
                            <Input
                              type="number"
                              disabled={item.randomTime}
                              value={item.setTimeSecond}
                            /> 초
                          </Box>
                          
                          <TextField
                              id="filled-multiline-flexible"
                              label="퀴즈 본문"
                              multiline
                              rows={4}
                              variant="filled"
                              value={item.quizContent}
                              fullWidth
                            />
                            
                            <Box sx={{width:'100%',alignSelf:'flex-start'}}>
                              <Typography >보기</Typography>
                              <Box width='100%' display='flex' flexDirection='column' gap='1rem' marginTop='1rem'>
                                {
                                  [item.item1, item.item2, item.item3, item.item4].map((number,index) => (
                                    <Box
                                    key={number}
                                    display='flex'
                                    justifyContent='flex-start'
                                    alignItems='center'
                                    gap='1rem'
                                    >
                                      <TextField
                                        id="outlined-basic"
                                        label={`보기 ${index+1}`}
                                        variant="outlined"
                                        value={number}
                                        sx={{
                                          flex:1,
                                          height:'100%'
                                        }}
                                        size='small'
                                        />
                                        <Button sx={{
                                          border:'1px solid red',
                                          height:'100%'
                                        }}><Delete/></Button>
                                    </Box>
                                ))}
                                </Box>
                                <Box
                                marginTop='1rem'
                                display='flex'
                                flexDirection='column'
                                gap='0.5rem'
                                >
                                <Typography>정답</Typography>
                                    <TextField
                                    id="outlined-basic"    
                                    variant="outlined"
                                    value={item.answer}
                                    sx={{
                                      flex:1,
                                      height:'100%'
                                    }}
                                    size='small'
                                    fullWidth
                                    />
                                </Box>
                                <Box
                                marginTop='1rem'
                                display='flex'
                                flexDirection='column'
                                gap='0.5rem'
                                >
                                  <Typography>피드백</Typography>
                                  <TextField
                                    id="outlined-basic"    
                                    variant="outlined"
                                    value={item.feedback}
                                    sx={{
                                      flex:1,
                                      height:'100%'
                                    }}
                                    size='small'
                                    fullWidth
                                    />
                                </Box>
                            </Box>
                        </Box>
                        
                      )
                    }

                    <ButtonGroup 
                      variant="outlined"
                      sx={{
                        width:'100%',
                        justifyContent:'center',
                        marginTop:'2rem',
                        gap: '0.5rem'
                      }}
                    >
                      <Button variant="contained" color="info" sx={{width:'120px'}}>저장</Button>
                      <Button variant="contained" color="warning" sx={{width:'120px'}}>삭제</Button>
                    </ButtonGroup>
              </CustomTabPanel>
          ))
        }
      </Box>
    </Modal>
  )
}

export default AddQuizModal