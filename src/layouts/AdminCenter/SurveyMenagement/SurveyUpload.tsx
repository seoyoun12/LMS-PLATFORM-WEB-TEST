import { QuestionType, SurveyMultipleChoice, uploadSurvey } from '@common/api/adm/survey';
import {
  SurveyMultipleChoiceRequestDto,
  SurveyQuestionRequestDto,
  SurveyRequestDto,
} from '@common/api/Api';
import { SurveyQuestionItem } from '@components/admin-center';
import styled from '@emotion/styled';
import { useSnackbar } from '@hooks/useSnackbar';
import {
  Box,
  Button,
  Chip,
  Container,
  Radio,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export interface SurveyQuestion extends SurveyQuestionRequestDto {
  dummySeq: number;
  surveyMultipleChoice?: SurveyMultipleChoiceRequestDto | null;
}

const defaultValue = {
  content: null,
  surveyMultipleChoice: {
    item1: null,
    item2: null,
    item3: null,
    item4: null,
    item5: null,
    item6: null,
    item7: null,
    item8: null,
    item9: null,
    item10: null,
  },
};

export function SurveyUpload() {
  const snackbar = useSnackbar();
  const router = useRouter();
  const [questions, setQuestions] = useState<SurveyQuestion[]>([]);
  const [type, setType] = useState<QuestionType>(QuestionType.TYPE_MULTIPLE_CHOICE);
  const [title, setTitle] = useState<string>();
  const [disableTitle, setDisableTitle] = useState(false);
  const { register, watch, setValue, handleSubmit, reset } =
    useForm<SurveyQuestionRequestDto>({ defaultValues: defaultValue });

  //change question Type
  const onChangeType = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === QuestionType.TYPE_MULTIPLE_CHOICE) {
      setType(QuestionType.TYPE_MULTIPLE_CHOICE);
    } else {
      setType(QuestionType.TYPE_SUBJECTIVE);
    }
  };

  //add question
  const onClickAddQuestion = () => {
    if (!title || title === '') return window.alert('설문제목이 필요합니다!');
    if (!watch().content || watch().content === '') {
      return window.alert('문항 제목을 입력해 주세요!');
    }
    if (
      (!watch().surveyMultipleChoice.item1 ||
        watch().surveyMultipleChoice.item1 === '') &&
      type === QuestionType.TYPE_MULTIPLE_CHOICE
    ) {
      return window.alert('적어도 하나의 문항 , 첫번째 문항이 필요합니다!');
    } else {
      const randomSeq = Math.floor(Math.random() * 1000);
      setQuestions(prev => [
        ...prev,
        { ...watch(), dummySeq: randomSeq, questionType: type },
      ]);
      reset();
      setDisableTitle(true);
    }
  };

  //title lock
  useEffect(() => {
    if (questions.length === 0) setDisableTitle(false);
  }, [questions]);

  const onClickSubmit = async () => {
    let arr = questions.map(item => {
      return {
        content: item.content,
        questionType: item.questionType,
        surveyMultipleChoice: item.surveyMultipleChoice,
      };
    });
    try {
      const data: SurveyRequestDto = {
        title,
        surveyQuestionList: arr,
      };
      await uploadSurvey(data);
      snackbar({ variant: 'success', message: '업로드 완료했습니다.' });
      router.push(`/admin-center/survey`);
    } catch (e: any) {
      snackbar({ variant: 'error', message: e.data.message });
    }
  };

  return (
    <SurveyUploadWrap>
      <Container>
        <Typography
          variant="h5"
          sx={{
            mb: '12px',
            fontWeight: 700,
          }}
        >
          설문 등록
        </Typography>
        <Box>
          <TextField
            placeholder="설문 제목"
            disabled={disableTitle}
            onChange={e => setTitle(e.target.value)}
            value={title}
          />
        </Box>
        <Box mb={4} mt={4}>
          <Box display="flex" alignItems="center">
            <TextField placeholder="설문 문제 제목" {...register(`content`)} />
            <Radio
              value={QuestionType.TYPE_MULTIPLE_CHOICE}
              onChange={onChangeType}
              checked={type === QuestionType.TYPE_MULTIPLE_CHOICE}
            />
            <span>객관식</span>
            <Radio
              value={QuestionType.TYPE_SUBJECTIVE}
              onChange={onChangeType}
              checked={type === QuestionType.TYPE_SUBJECTIVE}
            />
            <span>주관식</span>
          </Box>

          {type === QuestionType.TYPE_MULTIPLE_CHOICE && (
            <>
              <Typography
                variant="h6"
                sx={{
                  mt: '12px',
                  fontWeight: 700,
                }}
              >
                각 문항별 이름 (문항 순서대로 작성해주세요!)
              </Typography>
              <TextField
                placeholder="1번 문항"
                {...register('surveyMultipleChoice.item1')}
              />
              <TextField
                placeholder="2번 문항"
                {...register('surveyMultipleChoice.item2')}
              />
              <TextField
                placeholder="3번 문항"
                {...register('surveyMultipleChoice.item3')}
              />
              <TextField
                placeholder="4번 문항"
                {...register('surveyMultipleChoice.item4')}
              />
              <TextField
                placeholder="5번 문항"
                {...register('surveyMultipleChoice.item5')}
              />
              <TextField
                placeholder="6번 문항"
                {...register('surveyMultipleChoice.item6')}
              />
              <TextField
                placeholder="7번 문항"
                {...register('surveyMultipleChoice.item7')}
              />
              <TextField
                placeholder="8번 문항"
                {...register('surveyMultipleChoice.item8')}
              />
              <TextField
                placeholder="9번 문항"
                {...register('surveyMultipleChoice.item9')}
              />
              <TextField
                placeholder="10번 문항"
                {...register('surveyMultipleChoice.item10')}
              />
            </>
          )}
          <Button variant="contained" onClick={onClickAddQuestion} fullWidth>
            추가
          </Button>
          {questions.map(item => (
            <SurveyQuestionItem item={item} setQuestions={setQuestions} />
          ))}
        </Box>
        <Button variant="contained" onClick={onClickSubmit} fullWidth>
          업로드
        </Button>
      </Container>
    </SurveyUploadWrap>
  );
}

const SurveyUploadWrap = styled(Box)`
  .question-child {
    padding: 0.5rem 0;
    border-bottom: 1px solid #cacaca;
  }
  .question-child:last-child {
    border-bottom: none;
  }
`;
