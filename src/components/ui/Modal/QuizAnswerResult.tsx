import { IQuizTime } from '@layouts/Lesson/LessonContentVideo';
import { Box, Button, Typography } from '@mui/material';

interface Props {
  userSelectedAnswer: string;
  quiz: IQuizTime;
  quizAnswer: string;
  onCloseModal?: () => void;
  onChoiceAnswer: (str: string) => void
}

function QuizAnswerResult({onChoiceAnswer, userSelectedAnswer, quiz, quizAnswer, onCloseModal}: Props) {

  const onDeleteSolvedQuiz = () => {
    onCloseModal();
    onChoiceAnswer('await');
  }
  
  const isCorrectMultipleChoiceColor = userSelectedAnswer.split('. ')[1] === quiz.answer ? '#83bc5c' : '#4f8ad1'
  const isCorrectOXQuizChoiceColor = userSelectedAnswer === quiz.answer ? '#83bc5c' : '#4f8ad1'
  return (
    <>
    <Box
    sx={{
      boxShadow:`1px 1px 2px rgba(0,0,0,0.5)`,
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      margin:'1.25rem 0rem',
      width:'90%',
      padding:'0 1rem',
      height:'42px',
      borderRadius: '6px',
      fontSize:'22px',
      backgroundColor: quiz.lessonQuizTypeEnum === 'MULTIPLE_CHOICE' ? isCorrectMultipleChoiceColor : isCorrectOXQuizChoiceColor,
      color:'#fff',
      border:'1px solid #c7c7c7c7'
    }}
    >
      <Typography align='center' sx={{fontWeight:'bold',fontSize:'20px'}} >
        {quizAnswer}
      </Typography>
    </Box>
    <Box
      width='90%'
      margin='1rem'
      padding='1rem'
      boxShadow='1px 1px 2px rgba(0,0,0,0.5)'
      minHeight='180px'
      borderRadius='2px'
      border='1px solid #c7c7c7c7'
      
      >
      {
        quiz.lessonQuizTypeEnum === 'MULTIPLE_CHOICE' &&
      <Typography
      color={isCorrectMultipleChoiceColor}
      fontWeight='bold'
      fontSize='16px'
      whiteSpace='pre-line'
      lineHeight={1.5}
      >
        {
        userSelectedAnswer.split('. ')[1] === quiz.answer
          ? '(O) 정답입니다.'
          : `(X) 틀렸습니다. \n \n 정답은 ${quizAnswer} 입니다.`
        }
      </Typography>
      }
      

      {
        quiz.lessonQuizTypeEnum === 'OX_QUIZ' && 
        <Typography
          color={isCorrectOXQuizChoiceColor}
          fontWeight='bold'
          fontSize='16px'
          whiteSpace='pre-line'
          lineHeight={0.75}
        >
        {
        userSelectedAnswer === quiz.answer
          ? '(O) 정답입니다.'
          : `(X) 틀렸습니다. \n \n 정답은 ${quizAnswer} 입니다.`
        }
      </Typography>
      }
      <Typography marginTop='2rem'>
        {quiz.feedback}
      </Typography>
    </Box>
    <Button
      onClick={onDeleteSolvedQuiz}
      sx={{
        ':hover': {
          backgroundColor:'#fff',
          color:'rgb(194,51,51)',
          border: '1px solid #c7c7c7c7'
        },
        boxShadow: '2px 3px 2px #c7c7c7c7',
        color: '#fff',
        backgroundColor:'rgb(194,51,51)',
        fontSize: '18px',
        fontWeight: 'bold',
        padding: '0.25rem 2.25rem',
        marginBottom:'1.25rem',
        borderRadius: '8px'
      }}
    >
      확인
    </Button>
    </>
  )
}

export default QuizAnswerResult