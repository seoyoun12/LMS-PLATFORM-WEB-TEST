import { IQuiz } from '@layouts/Lesson/LessonContentVideo'
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import TabsLayout from './TabsLayout';
import TabsCommonEntry from './TabsCommonEntry';
import AnswerBox from './AnswerBox';
import MultipleChoiceBox from './MultipleChoiceBox';
import FeedbackBox from './FeedbackBox';
import ConfirmButtons from './ConfirmButtons';


enum QuizType {
  ALARM = 'ALARM',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  OX_QUIZ = 'OX_QUIZ',
  
}

interface Props {
  form: Partial<IQuiz>;
  createMode: boolean;
  onFormChange: (e: SyntheticEvent | string, key?: string) => void;
  onCheckChange: (e: SyntheticEvent) => void;
}



function QuizCreateForm({form, createMode, onFormChange, onCheckChange}:Props) {
  const [quizType, setQuizType] = useState('');

  const onSelectChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setQuizType(value);
    onFormChange(value,name)
  };
    console.log(form);
    
  return (
    <Box
      width='100%'
      sx={{
        marginTop: '1.25rem',
        display:'flex',
        flexDirection:'column',
        gap:'0.75rem',
        justifyContent:'center',
        alignItems:'center',
      }}>
      <FormControl>
        <InputLabel>퀴즈타입</InputLabel>
        <Select
          name='lessonQuizTypeEnum'
          value={quizType}
          label="퀴즈타입"
          onChange={onSelectChange}
          sx={{ minWidth:'200px' }}
        >
          { Object.keys(QuizType).map((item) => <MenuItem key={item} value={item}>{item}</MenuItem>)}
        </Select>
      </FormControl>
      <TabsLayout>
        <TabsCommonEntry form={form} onFormChange={onFormChange} onCheckChange={onCheckChange}/>
        <AnswerBox form={form} onFormChange={onFormChange} /> 
    
    
      { form?.lessonQuizTypeEnum === "MULTIPLE_CHOICE" && <MultipleChoiceBox form={form} onFormChange={onFormChange} /> }
      { form?.lessonQuizTypeEnum !== "ALARM" &&  <FeedbackBox form={form} onFormChange={onFormChange} /> }
        <ConfirmButtons form={form} createMode={createMode} />
      </TabsLayout> 
    </Box>
  )
}

export default QuizCreateForm