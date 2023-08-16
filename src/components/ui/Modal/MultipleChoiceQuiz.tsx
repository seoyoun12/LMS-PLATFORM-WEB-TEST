import { Box } from '@mui/material'
import QuizItemButton from './QuizItemButton';
interface Props {
  onCloseModal: () => void;
  onChoiceAnswer: (answer: string) => void;
  quizItem: string[];
}

function MultipleChoiceQuiz({quizItem, onChoiceAnswer}: Props) {
  
  return (
    <Box sx={{display:'flex',flexDirection:'column',gap:'.75rem',width:'90%',alignItems:'center',justifyContent:'center',margin:'2rem 0 '}}>
    {
      quizItem.map((item) => (
      <QuizItemButton
        key={item}
        item={item}
        bgColor='rgb(194,51,51)'
        onClick={onChoiceAnswer}
        />
      ))
    }
  </Box>
  )
}

export default MultipleChoiceQuiz