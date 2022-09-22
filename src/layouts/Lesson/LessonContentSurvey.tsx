import React from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';
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

  // 스테이트.

  const [loadingData, setLoadingData] = React.useState<boolean>(false);
  const [loadingForm, setLoadingForm] = React.useState<boolean>(false);
  const [dialog, setDialog] = React.useState<'FAILED' | 'SUCCESS' | null>(null);
  const [dialogMessage, setDialogMessage] = React.useState<string | null>(null);

  // 이펙트.

  React.useEffect(() => {
    setLoadingData(false);
    setLoadingForm(false);
    setDialog(null);
  }, [props.survey]);

  // 렌더링.

  if (props.loading)
    return (
      <SurveyEmptyContainer>
        <CircularProgress size="1.5rem" />
      </SurveyEmptyContainer>
    );
  if (props.courseModule === null || props.survey === null)
    return <SurveyEmptyContainer>설문이 존재하지 않습니다.</SurveyEmptyContainer>;

  return (
    <SurveyContainer
      autoComplete="off"
      onSubmit={e => {
        e.preventDefault();

        if (props.surveyCompleted) {

          setDialog('FAILED');
          setDialogMessage('이미 제출한 설문입니다.');
          return;

        }

        const formData = new FormData(e.target as HTMLFormElement);
        const awnserList = props.survey.surveyQuestionList.map((question, i) => ({
          answer: formData.get(`question_${i}`)?.toString() || (question.questionType === "TYPE_MULTIPLE_CHOICE" ? "0" : ""),
          surveyQuestionSeq: question.seq,
        }));

        setLoadingForm(true);

        ApiClient.survey
          .participateSurveyUsingPost({
            courseUserSeq: props.courseUserSeq,
            surveySeq: props.survey.seq,
            answerList: awnserList,
          })
          .then(res => {
            setDialog(res.data.success ? 'SUCCESS' : 'FAILED');
            setDialogMessage(res.data.success ? '제출이 완료되었습니다' : '제출 실패했습니다.');
            res.data.success && props.onComplete();
            console.log("설문쪽:", res.data.message)
          })
          .catch(err => {
            setDialog('FAILED');
            setDialogMessage(
              err.response?.status === 400
                ? '이미 제출한 설문입니다.'
                : '전송을 실패하였습니다.'
            );
          })
          .finally(() => setLoadingForm(false));
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
      <SurveySubmitButton variant="contained" type="submit">제출하기</SurveySubmitButton>
      <Dialog
        open={dialog !== null}
        onClose={() => dialog === 'SUCCESS' ? router.replace(router.asPath) : setDialog(null)}
      >
        <DialogContent>
          <DialogContentText>
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
`;

const FormLoading = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #fff2;
`;
