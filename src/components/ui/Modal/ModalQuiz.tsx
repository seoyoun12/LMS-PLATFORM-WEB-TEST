import Dialog, { DialogProps } from '@mui/material/Dialog';
import MultipleChoiceQuiz from './MultipleChoiceQuiz';
import QuizAnswerResult from './QuizAnswerResult';
import OXQuiz from './OXQuiz';
import Alarm from './Alarm';
import useCondition from '@hooks/useCondition';
import ShutdownModal from './ShutdownModal';
import useToggle from '@hooks/useToggle';
import styled from '@emotion/styled';
import { Spinner } from '@components/ui';
import { Box, Typography } from '@mui/material';
import { IQuizTime } from '@layouts/Lesson/LessonContentVideo';
import { useCallback, useEffect, useRef, useState } from 'react';


type QuizType = 'ALARM' | 'MULTIPLE_CHOICE' | 'OX_QUIZ';
type ModalProps = {
  open: boolean;
  title?: React.ReactNode;
  actionLoading?: boolean;
  actionDisabled?: boolean;
  loading?: boolean;
  action?: string | React.ReactNode;
  quiz: IQuizTime;
  onCloseModal: () => void;
  onSubmit?: () => void;
} & Omit<DialogProps, 'title'>;

export function ModalQuiz({ open, quiz, loading,onCloseModal }: ModalProps) {
  const timeRef = useRef(0);

  const [userSelectedAnswer, setUserSelectedAnswer] = useState('await');
  const [quizItem, setQuizItem] = useState<string[]>([]);
  const [quizAnswer, setQuizAnswer] = useState('');

  const { isTrue: isSameCurrentQuizType } = useCondition({condition: quiz?.lessonQuizTypeEnum});
  const { isTrue: userAnswerState} = useCondition({condition: userSelectedAnswer});
  const { onToggle: toggleShutdownModal, toggle: shutdown } = useToggle();

  const onChoiceAnswer = useCallback((answer: string) => setUserSelectedAnswer(answer),[]);
  const quizAppearanceCondition = useCallback((quizType: QuizType) => (isSameCurrentQuizType(quizType) && userAnswerState('await')),[isSameCurrentQuizType,userAnswerState]);
  const quizResultAppearanceCondition = useCallback((quizType: QuizType) => (isSameCurrentQuizType(quizType) && !userAnswerState('await')),[isSameCurrentQuizType,userAnswerState]);
  
  

  useEffect(() => {
    if(!quiz) return;
    const { item1 = '',item2 = '',item3 = '',item4 = '',answer } = quiz;
    const temp = [`1. ${item1}`,`2. ${item2}`,`3. ${item3}`,`4. ${item4}`];
    const quizAnswerNumber =  temp.find((item) => item.includes(answer) && item);
    setQuizAnswer(quizAnswerNumber);
    setQuizItem(temp);
  },[quiz])

  
  useEffect(() => {
    if(!open) return;
    const timer = setInterval(() => {
      if(timeRef.current === 10) {
        toggleShutdownModal();
        
        clearInterval(timer);
        localStorage.removeItem(`${quiz.lessonSeq}`);
        timeRef.current = 0;
        return;
      }
      timeRef.current += 1;
    }
    ,1000)
    return () => clearInterval(timer);
  },[open])

  return (
    <>
    <ShutdownModal open={shutdown} onToggle={toggleShutdownModal}/>
    
    <DialogBox aria-labelledby='modal-title' open={open}>
      {loading || !quiz
      ? <Spinner />
      : (
          <Container>
              <ModalInner key={quiz.alarmContent}>
                <QuizTitle>{quiz.alarmContent} {'\n'}</QuizTitle>
                <QuizContentBox>
                  <QuizText variant='h6'> {quiz.quizContent}</QuizText>
              { quizAppearanceCondition('MULTIPLE_CHOICE') && <ChoiceAlartText>다음 중 맞는 보기를 고르세요.</ChoiceAlartText>}
                </QuizContentBox>

              { quizAppearanceCondition('ALARM') && <Alarm onClick={onCloseModal} />}
              { quizAppearanceCondition('MULTIPLE_CHOICE') && <MultipleChoiceQuiz quizItem={quizItem} onCloseModal={onCloseModal} onChoiceAnswer={onChoiceAnswer} />}

              {
                quizResultAppearanceCondition('MULTIPLE_CHOICE')
                && <QuizAnswerResult
                      quizAnswer={quizAnswer}
                      userSelectedAnswer={userSelectedAnswer}
                      quiz={quiz}
                      onCloseModal={onCloseModal}
                      onChoiceAnswer={onChoiceAnswer}
                    />
              } 
              { quizAppearanceCondition('OX_QUIZ') && <OXQuiz quizAnswer={quiz.answer} ox={[quiz.itemO,quiz.itemX]} onChoiceAnswer={onChoiceAnswer} />}
              { quizResultAppearanceCondition('OX_QUIZ')
                && <QuizAnswerResult
                      quizAnswer={quiz.answer}
                      userSelectedAnswer={userSelectedAnswer}
                      quiz={quiz}
                      onCloseModal={onCloseModal}
                      onChoiceAnswer={onChoiceAnswer}
                      />
              }
              </ModalInner>
          </Container>
      )}
    </DialogBox>
    </>
  );
}

const DialogBox = styled(Dialog)`
  
  @media screen and (max-width: 600px) {
    width: 80%;
    margin: 0 auto;
    min-width: 360px;
    
  }
`;

const Container = styled(Box)`
  width: 100%;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  background:linear-gradient(rgb(194,51,51) 10%, #fff 10%); 
  min-width: 500px;
  @media screen and (max-width: 600px) {
    min-width: 300px;
    
  }
`
const ModalInner = styled(Box)`
  width:100%;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
`

const QuizTitle = styled(Typography)`
  font-size: 1.5rem;
  font-weight: bold;
  padding-top: .25rem;
  text-align: center;
  color: #fff;
  margin: auto;
  
`

const QuizContentBox = styled(Box)`
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  width:85%;
  min-height:130px;
  margin-top:2rem;
`

const ChoiceAlartText = styled(Typography)`
  text-align:center;
  font-weight:bold;
  margin-bottom:1rem;
`

const QuizText = styled(Typography)`
  text-align:left;
  font-size:18px;
  font-weight:bold;
  padding:1rem 0 0 1rem;
  white-space:pre-line;
  line-height: 2
`;
