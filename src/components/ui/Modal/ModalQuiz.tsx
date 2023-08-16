import Dialog, { DialogProps } from '@mui/material/Dialog';
import { Spinner } from '@components/ui';
import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import { IQuizTime } from '@layouts/Lesson/LessonContentVideo';
import MultipleChoiceQuiz from './MultipleChoiceQuiz';
import { useCallback, useEffect, useRef, useState } from 'react';
import QuizAnswerResult from './QuizAnswerResult';
import OXQuiz from './OXQuiz';
import Alarm from './Alarm';
import useCondition from '@hooks/useCondition';
import ShutdownModal from './ShutdownModal';
import useToggle from '@hooks/useToggle';

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
      if(timeRef.current === 600) {
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
  .MuiPaper-root {
    margin: 0;
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    /* width: fit-content; */
  }
  .MuiDialog-container {
    justify-content: center;
    width: 100%;
  }
  //온라인 교육 신청쪽 테이블 박살남.
  @media (max-width: 820px) {
    .MuiDialogContent-root {
      padding: 0;
    }
  }
  @media (max-width: 768px) {
    .MuiPaper-root {
      margin: 0;
      width: 100%;
    }
    .MuiDialog-container {
      justify-content: none;
      width: 100%;
    }
    .MuiDialogContent-root {
      padding: 0;
    }
  }
  @media (max-width: 500px) {
    .MuiPaper-root {
      margin: 0;
      width: 100%;
    }
    .MuiDialog-container {
      justify-content: none;
      width: 100%;
    }
    .MuiDialogContent-root {
      padding: 0;
    }
  }
`;

const Container = styled(Box)`
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
`
const ModalInner = styled(Box)`

width:100%;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
padding:0;
margin:0;
background:linear-gradient(rgb(194,51,51) 10%, #fff 10%);
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
