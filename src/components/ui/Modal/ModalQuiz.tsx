// import { LoadingButton } from '@mui/lab';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
// import router, { useRouter } from 'next/router';
// import { Tabs3 } from '../Tabs3';

import * as React from 'react';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import { Spinner } from '@components/ui';
import styled from '@emotion/styled';
import { Box, Button, Typography } from '@mui/material';
import { IQuiz } from '@layouts/Lesson/LessonContentVideo';

type ModalProps = {
  open: boolean;
  onCloseModal: () => void;
  title?: React.ReactNode;
  onSubmit?: () => void;
  actionLoading?: boolean;
  actionDisabled?: boolean;
  loading?: boolean;
  action?: string | React.ReactNode;
  dummy_quiz: IQuiz[]
} & Omit<DialogProps, 'title'>;


// Quiz
// {
//   alarmContent: string;
//   answer: string;
//   feedback: string;
//   item1: string;
//   item2: string;
//   item3: string;
//   item4: string;
//   itemO: string;
//   itemX: string;
//   lessonQuizTypeEnum: string; // 퀴즈의 종류 "ALARM" | "MULTIPLE_CHOICE" | "OX_QUIZ"
//   lessonSeq: number;
//   quizContent: string;
//   randomTime: boolean;
//   setTimeMin: number;
//   setTimeSecond: number;
// }


export function ModalQuiz({
  open,
  children,
  title,
  action,
  onCloseModal,
  onSubmit,
  actionLoading,
  actionDisabled,
  dummy_quiz,
  loading = false,
  ...dialogProps
}: ModalProps) {
  return (
    <DialogBox
      onClose={onCloseModal}
      aria-labelledby='modal-title'
      open={open}
      {...dialogProps}
    >
      {loading ? (
        <Spinner />
      ) : (
        <ModalBox>
          <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
            {/* <button onClick={onCloseModal}>테스트 close</button> */}
            {dummy_quiz.map((quiz) => (
              <Box key={quiz.alarmContent} sx={{
                width:'100%',
                display:'flex',
                flexDirection:'column',
                justifyContent:'center',
                alignItems:'center',
                padding:0,
                margin:0,
                background:'linear-gradient(#007bcd 10%, #fff 10%)'}}>
                <Box
                  key={quiz.alarmContent}
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
                  <Typography variant='h6' align='center' sx={{fontSize:'18px',fontWeight:'bold',padding:'1rem 0 0 1rem',whiteSpace:'pre-line'}}>
                    {quiz.alarmContent} {'\n'}
                  </Typography>
                  <Typography align='center' fontWeight='bold' marginBottom='1rem'>
                    다음 중 맞는 보기를 고르세요.
                  </Typography>
                </Box>
                <Box sx={{display:'flex',flexDirection:'column',gap:'.75rem',width:'90%',alignItems:'center',justifyContent:'center',marginTop:'1rem'}}>
                  <Button sx={{':hover':{
                    backgroundColor:'#fff',
                    color:'#007bcd'
                  },boxShadow:'2px 2px 2px #007bcd',display:'flex',alignItems:'center',justifyContent:'center',width:'100%',padding:'0 1rem', height:'42px',borderRadius: '8px', fontSize:'20px',backgroundColor:'#007bcd',color:'#fff'}}>
                    <Typography align='center' sx={{fontWeight:'bold',fontSize:'20px'}} >
                      1. {quiz.item1}
                    </Typography>
                  </Button>
                  <Button sx={{':hover':{
                    backgroundColor:'#fff',
                    color:'#007bcd'
                  },boxShadow:'2px 2px 2px #007bcd',display:'flex',alignItems:'center',justifyContent:'center',width:'100%',padding:'0 1rem', height:'42px',borderRadius: '8px', fontSize:'20px',backgroundColor:'#007bcd',color:'#fff'}}>
                    <Typography align='center' sx={{fontWeight:'bold',fontSize:'20px'}} >
                      2. {quiz.item2}
                    </Typography>
                  </Button>
                  <Button sx={{':hover':{
                    backgroundColor:'#fff',
                    color:'#007bcd'
                  },boxShadow:'2px 2px 2px #007bcd',display:'flex',alignItems:'center',justifyContent:'center',width:'100%',padding:'0 1rem', height:'42px',borderRadius: '8px', fontSize:'20px',backgroundColor:'#007bcd',color:'#fff'}}>
                    <Typography align='center' sx={{fontWeight:'bold',fontSize:'20px'}} >
                      3. {quiz.item3}
                    </Typography>
                  </Button>
                  <Button sx={{':hover':{
                    backgroundColor:'#fff',
                    color:'#007bcd'
                  },boxShadow:'2px 2px 2px #007bcd',display:'flex',alignItems:'center',justifyContent:'center',width:'100%',padding:'0 1rem', height:'42px',borderRadius: '8px', fontSize:'20px',backgroundColor:'#007bcd',color:'#fff'}}>
                    <Typography align='center' sx={{fontWeight:'bold',fontSize:'20px'}} >
                      4. {quiz.item4}
                    </Typography>
                  </Button>
                </Box>
              </Box>
            ))}
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
    height: 500px;
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
