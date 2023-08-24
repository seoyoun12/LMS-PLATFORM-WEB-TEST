import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, Typography } from '@mui/material';
import { CourseModuleFindResponseDto, SurveyResponseDto } from '@common/api/Api';
import ApiClient from '@common/api/ApiClient';
import LessonContentSurveyQuestion from './LessonContentSurveyQuestion';

export interface Props {
  courseUserSeq: number;
  courseModule: CourseModuleFindResponseDto | null;
  survey: SurveyResponseDto | null;
  surveyCompleted?: boolean;
  loading?: boolean;
  onComplete?: () => void;
}

export default function LessonContentSurvey(props: Props) {
  const router = useRouter();

  // 스테이트. << 정신질환 주석

  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [loadingForm, setLoadingForm] = useState<boolean>(false);
  const [dialog, setDialog] = useState<'FAILED' | 'SUCCESS' | null>(null);
  const [dialogMessage, setDialogMessage] = useState<string | null>(null);
  
  // 이펙트. < 정신질환 주석2

  useEffect(() => {
    setLoadingData(false);
    setLoadingForm(false);
    setDialog(null);
  }, [props.survey]);

  // 렌더링. < 정신질환 주석3

  if (props.loading)
    return (
      <SurveyEmptyContainer>
        <CircularProgress size="1.5rem" />
      </SurveyEmptyContainer>
    );
  if (props.courseModule === null || props.survey === null)
    return <SurveyEmptyContainer>설문이 존재하지 않습니다.</SurveyEmptyContainer>;
      // console.log(dialog);
  return (
    <SurveyContainer
      autoComplete="off"
      onSubmit={e => {
        e.preventDefault();
        setLoadingForm(true);
        if (props.surveyCompleted) {
          setDialog('FAILED');
          setDialogMessage('이미 제출한 설문입니다.');
          setLoadingForm(false);
          return;
        }
        const formData = new FormData(e.target as HTMLFormElement);
        const awnserList = props.survey.surveyQuestionList.map((question, i) => ({
          answer: formData.get(`question_${i}`)?.toString() || (question.questionType === "TYPE_MULTIPLE_CHOICE" ? "0" : ""),
          surveyQuestionSeq: question.seq,
        }));
        ApiClient.survey
          .participateSurveyUsingPost({
            courseUserSeq: props.courseUserSeq,
            surveySeq: props.survey.seq,
            answerList: awnserList,
          })
          .then(res => {
            if(res.data.success){
              setDialog('SUCCESS');
              setDialogMessage('제출이 완료되었습니다 \n 수료확인을 통해 수료증 발급을 진행할 수 있습니다.')
              props.onComplete();
            } else {
              setDialog('FAILED');
              setDialogMessage('제출 실패했습니다.')
            }
            setLoadingForm(false);
          })
          .catch(err => {
            setDialog('FAILED');
            setDialogMessage(
              err.response?.status === 400
                ? '이미 제출한 설문입니다.'
                : '전송에 실패하였습니다.'
            );
          })
          .finally(() => {
            setLoadingForm(false);
          });
      }}
    >
      {loadingForm && (
        <FormLoading>
          <SurveyEmptyContainer>
            <CircularProgress size="1.5rem" />
          </SurveyEmptyContainer>
        </FormLoading>
      )}
      <SurveyHeader>
        <SurveyHeaderTitle>{props.survey.title}</SurveyHeaderTitle>
        <SurveyHeaderCompletedText>
          {props.surveyCompleted ? '완료' : '미완료'}
        </SurveyHeaderCompletedText>
      </SurveyHeader>
      <SurveyContent>
        {props.survey.surveyQuestionList.map((question, index) => (
          <LessonContentSurveyQuestion
            key={index}
            index={index}
            question={question}
            loading={loadingData}
          />
        ))}
      </SurveyContent>
          {/* 진짜 코드를 더럽게 짜고 무슨 연습장마냥 갈겨놔서 유지보수가 불가능할 정도로 너무 힘드네요.
          이 사람은 비디오부터 진짜 개막장입니다. 개발자하면 안되는 전형적인 트롤입니다 */}
      <SurveySubmitButton
      onClick={() => setLoadingForm(true)}
      variant="contained" type="submit">
        {
          loadingForm
          ? <CircularProgress size="1.5rem" color='secondary' />
          : <Typography sx={{fontSize: '18px'}}>제출하기</Typography>
        }
      </SurveySubmitButton>
      <Dialog
        open={dialog !== null}
        onClose={() => dialog === 'SUCCESS' ? router.replace(router.asPath) : setDialog(null)}
      >
        <DialogContent>
          <DialogContentText sx={{whiteSpace:'pre-line'}}>
            {dialogMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => dialog === 'SUCCESS' ? router.replace(router.asPath) : setDialog(null)}>확인</Button>
        </DialogActions>
      </Dialog>
    </SurveyContainer>
  );
}

const SurveyEmptyContainer = styled.div`
  display: flex;
  aspect-ratio: 16 / 9;
  align-items: center;
  justify-content: center;
`;

const SurveyContainer = styled.form`
  margin: 0 auto;
  display: flex;
  position: relative;
  width: 100%;
  max-width: 1000px;
  flex-direction: column;

  @media (max-width: 1024px) {
    margin-top: 1rem;
    font-size: 0.8rem;
  }
`;

const SurveyHeader = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #aeaeae;
`;

const SurveyHeaderTitle = styled.span`
  flex-grow: 1;
  font-size: 1.5em;
  font-weight: 700;
`;

const SurveyHeaderCompletedText = styled.span`
  color: #404040;
`;

const SurveyContent = styled.div`
  margin-bottom: 2rem;
`;

const SurveySubmitButton = styled(Button)`
  display: block;
  height: 56px;
  &:hover {
    background-color: #cb054a;
  }
`;

const FormLoading = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #fff2;
`;
