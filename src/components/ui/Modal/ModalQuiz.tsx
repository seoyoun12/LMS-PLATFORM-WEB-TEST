// import { LoadingButton } from '@mui/lab';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
// import router, { useRouter } from 'next/router';
// import { Tabs3 } from '../Tabs3';


import Dialog, { DialogProps } from '@mui/material/Dialog';
import { Spinner } from '@components/ui';
import styled from '@emotion/styled';
import { Box, Button, Typography } from '@mui/material';
import { IQuiz, IQuizTime } from '@layouts/Lesson/LessonContentVideo';
import MultipleChoiceQuiz from './MultipleChoiceQuiz';
import { useCallback, useEffect, useState } from 'react';
import QuizAnswerResult from './QuizAnswerResult';
import OXQuiz from './OXQuiz';
import OXAnswerResult from './OXAnswerResult';
import Alarm from './Alarm';

type ModalProps = {
  open: boolean;
  onCloseModal: () => void;
  title?: React.ReactNode;
  onSubmit?: () => void;
  actionLoading?: boolean;
  actionDisabled?: boolean;
  loading?: boolean;
  action?: string | React.ReactNode;
  quiz: IQuizTime
} & Omit<DialogProps, 'title'>;


export function ModalQuiz({
  open,
  children,
  title,
  action,
  onCloseModal,
  onSubmit,
  actionLoading,
  actionDisabled,
  quiz,
  loading = false,
  ...dialogProps
}: ModalProps) {
  
  const [userSelectedAnswer, setUserSelectedAnswer] = useState('await');
  const [quizItem, setQuizItem] = useState<string[]>([]);
  const [quizAnswer, setQuizAnswer] = useState('');


  const onChoiceAnswer = useCallback((answer: string) => {
    setUserSelectedAnswer(answer);
  },[])

  useEffect(() => {
    if(!quiz) return;
    const { item1 = '',item2 = '',item3 = '',item4 = '',answer } = quiz;
    const temp = [`1. ${item1}`,`2. ${item2}`,`3. ${item3}`,`4. ${item4}`];
    const quizAnswerNumber =  temp.find((item) => item.includes(answer) && item);
    setQuizAnswer(quizAnswerNumber)
    setQuizItem(temp)
  },[quiz])

  
   
  return (
    <DialogBox aria-labelledby='modal-title' open={open}>
      {loading || !quiz
      ? <Spinner />
      : (
        <ModalBox>
          <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
            {/* <button onClick={onCloseModal}>테스트 close</button> */}
            
              
              <Box
                key={quiz.alarmContent}
                sx={{
                width:'100%',
                display:'flex',
                flexDirection:'column',
                justifyContent:'center',
                alignItems:'center',
                padding:0,
                margin:0,
                background:'linear-gradient(rgb(194,51,51) 10%, #fff 10%)'
                }}
                >
                <Box
                  sx={{
                    display:'flex',
                    flexDirection:'column',
                    justifyContent:'space-between',
                    border:'1px solid #2222',
                    width:'90%',
                    minHeight:'130px',
                    backgroundColor:'#c7c7c7c7',
                    boxShadow:' 0px 0px 4px #000',
                    marginTop:'4rem'
                  }}
                >
                  <Typography variant='h6' align='center' sx={{fontSize:'18px',fontWeight:'bold',padding:'1rem 0 0 1rem',whiteSpace:'pre-line',lineHeight: 2}}>
                    {quiz.alarmContent} {'\n'}
                    {quiz.quizContent}
                  </Typography>
                  {
                  (userSelectedAnswer === 'await' && quiz.lessonQuizTypeEnum === "MULTIPLE_CHOICE")
                  && <Typography align='center' fontWeight='bold' marginBottom='1rem'>
                      다음 중 맞는 보기를 고르세요.
                     </Typography>
                  }
                </Box>
              { (quiz.lessonQuizTypeEnum === 'ALARM' && userSelectedAnswer === 'await')
                && <Alarm onClick={onCloseModal} />
              }
              {
                (quiz.lessonQuizTypeEnum === "MULTIPLE_CHOICE" && userSelectedAnswer === 'await')
                && <MultipleChoiceQuiz quizItem={quizItem} onCloseModal={onCloseModal} onChoiceAnswer={onChoiceAnswer} />
              }

              {
                (quiz.lessonQuizTypeEnum === "MULTIPLE_CHOICE" && userSelectedAnswer !== 'await')
                && <QuizAnswerResult quizAnswer={quizAnswer} userSelectedAnswer={userSelectedAnswer} quiz={quiz} onCloseModal={onCloseModal} onChoiceAnswer={onChoiceAnswer} />
              }
               
              {
                (quiz.lessonQuizTypeEnum === "OX_QUIZ" && userSelectedAnswer === 'await')
                && <OXQuiz quizAnswer={quiz.answer} itemO={quiz.itemO} itemX={quiz.itemX} onChoiceAnswer={onChoiceAnswer}  />
              }
              {
                (quiz.lessonQuizTypeEnum === "OX_QUIZ" && userSelectedAnswer !== 'await')
                && <QuizAnswerResult quizAnswer={quiz.answer} userSelectedAnswer={userSelectedAnswer} quiz={quiz} onCloseModal={onCloseModal} onChoiceAnswer={onChoiceAnswer}  />
              }
               
              </Box>
            
          </Box>
          {/* <Tabs3></Tabs3> */}
        </ModalBox>
      )}
    </DialogBox>
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

const ModalBox = styled(Box)`
  /* border: 1px solid red; */
  width: 100%;
  height: 100%;
  /* border: 1px solid red; */
`;
