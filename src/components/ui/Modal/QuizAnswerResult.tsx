import { IQuizTime } from '@layouts/Lesson/LessonContentVideo';
import { Box, Button, Typography } from '@mui/material';

interface Props {
  userSelectedAnswer: string;
  quiz: IQuizTime;
  onCloseModal?: () => void;
  quizAnswer: string;
  onChoiceAnswer: (str: string) => void
}
//  {/* 버튼 클릭시 로컬스토리지에 해당 퀴즈를 제거해야 함. 제거하는 방법은 quizOccurTime으로 quiz를 필터링하여 제거한 뒤 남은 퀴즈 저장하는 방법 */}


function QuizAnswerResult({onChoiceAnswer, userSelectedAnswer, quiz, quizAnswer, onCloseModal}: Props) {

  const onDeleteSolvedQuiz = () => {
    onCloseModal();
    onChoiceAnswer('await');
  }
  
  const isCorrectColor = userSelectedAnswer.split('. ')[1] === quiz.answer ? '#03dd03' : '#ff0000'
  return (
    <>
    <Box
    sx={{
      boxShadow:`2px 2px 2px ${isCorrectColor}`,
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      margin:'1.25rem 0rem',
      width:'90%',
      padding:'0 1rem',
      height:'42px',
      borderRadius: '6px',
      fontSize:'22px',
      backgroundColor: isCorrectColor,
      color:'#fff'
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
      boxShadow='1px 0px 1px 2px rgb(194,51,51)91'
      minHeight='180px'
      borderRadius='2px'
      >
      <Typography
      color={isCorrectColor}
      fontWeight='bold'
      fontSize='16px'
      whiteSpace='pre-line'
      lineHeight={0.75}
      >
      {
        userSelectedAnswer.split('. ')[1] === quiz.answer
        ? '(O) 정답입니다.'
        : `(X) 틀렸습니다. \n
          정답은 ${quizAnswer} 입니다.
        `
      }
      </Typography>
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