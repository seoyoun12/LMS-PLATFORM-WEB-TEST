import {
  deleteSurvey,
  getSingleSurvey,
  modifySurvey,
  QuestionType,
  SurveyRes,
} from '@common/api/adm/survey';
import {
  SurveyMultipleChoiceRequestDto,
  SurveyQuestionRequestDto,
  SurveyRequestDto,
} from '@common/api/Api';
import { SurveyQuestionItem } from '@components/admin-center';
import { Spinner } from '@components/ui';
import styled from '@emotion/styled';
import { useDialog } from '@hooks/useDialog';
import { useSnackbar } from '@hooks/useSnackbar';
import { Box, Button, Container, Radio, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SurveyQuestion } from './SurveyUpload';

// interface FormType extends SurveyRes {}

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
export function SurveyModify() {
  const snackbar = useSnackbar();
  const router = useRouter();
  const dialog = useDialog();
  const { surveySeq } = router.query;
  const [questions, setQuestions] = useState<SurveyQuestion[]>([]);
  const [disableTitle, setDisableTitle] = useState(false);
  const [title, setTitle] = useState<string>();
  const [type, setType] = useState<QuestionType>(QuestionType.TYPE_MULTIPLE_CHOICE);
  const [loading, setLoading] = useState(false);
  const { register, setValue, watch, reset } = useForm<SurveyQuestionRequestDto>({
    defaultValues: defaultValue,
  });

  useEffect(() => {
    (async function () {
      try {
        const { data } = await getSingleSurvey(Number(surveySeq));
        const arr = data.surveyQuestionList.map(item => {
          const randomSeq = Math.floor(Math.random() * 1000);
          const { seq } = item;
          return { ...item, dummySeq: randomSeq };
        });
        setQuestions(arr);
        setTitle(data.title);
      } catch (e: any) {
        snackbar({ variant: 'error', message: e.data.message });
      }
    })();
  }, []);

  //title lock
  useEffect(() => {
    if (questions.length === 0) setDisableTitle(false);
  }, [questions]);

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
      //주관식용 조건문인것으로 추정
      if (!watch().surveyMultipleChoice.item1) {
        setQuestions(prev => [
          ...prev,
          {
            ...watch(),
            dummySeq: randomSeq,
            questionType: type,
            surveyMultipleChoice: null,
          },
        ]);
        reset();
        setDisableTitle(true);
        return;
      }
      //객관식
      let stopLoop = false;
      const converted = Object.values(watch().surveyMultipleChoice)
        .filter(value => {
          if (!value) stopLoop = true;
          if (stopLoop) return false;
          return true;
        })
        .map((item, idx) => {
          return {
            [`item${idx + 1}`]: item,
          };
        });
      //배열로 된 inputs를 변환합니다.
      const convertedChoice = {};
      converted.forEach(item => {
        const key = Object.keys(item)[0];
        convertedChoice[key] = item[key];
      });
      // setValue('surveyMultipleChoice', convertedChoice);
      // console.log('객객객', watch(), convertedChoice);
      // watch().surveyMultipleChoice
      setQuestions(prev => [
        ...prev,
        {
          ...watch(),
          surveyMultipleChoice: convertedChoice,
          dummySeq: randomSeq,
          questionType: type,
        },
      ]);
      //상태업데이트전 실행되는것같습니다.
      //watch로 넣지말고 변환된값을 직접넣어주세요.
      reset();
      setDisableTitle(true);
    }
  };
  // console.log(watch(), questions);

  const onClickModifySubmit = async () => {
    const arr = questions.map(item => {
      return {
        content: item.content,
        questionType: item.questionType,
        surveyMultipleChoice: item.surveyMultipleChoice,
      };
    });

    try {
      const dialogConfirmed = await dialog({
        title: '콘텐츠 수정하기',
        description: '정말로 수정하시겠습니까?',
        confirmText: '수정하기',
        cancelText: '취소',
      });
      if (dialogConfirmed) {
        const data: SurveyRequestDto = {
          title,
          surveyQuestionList: arr,
        };
        setLoading(true);
        await modifySurvey(Number(surveySeq), data);
        snackbar({ variant: 'success', message: '수정 완료했습니다.' });
        router.push(`/admin-center/survey`);
      }
    } catch (e: any) {
      snackbar({ variant: 'error', message: e.data.message });
    }
  };

  const onClickDelete = async () => {
    try {
      setLoading(true);

      const dialogConfirmed = await dialog({
        title: '콘텐츠 삭제하기',
        description: '정말로 삭제하시겠습니까?',
        confirmText: '삭제하기',
        cancelText: '취소',
      });
      if (dialogConfirmed) {
        await deleteSurvey(Number(surveySeq));
        snackbar({ variant: 'success', message: '삭제 완료했습니다.' });
        router.push(`/admin-center/survey`);
      }
    } catch (e: any) {
      snackbar({ variant: 'error', message: e.data.message });
    }
  };

  return (
    <SurveyModifyWrap>
      <Container>
        <Typography
          variant="h5"
          sx={{
            mb: '12px',
            fontWeight: 700,
          }}
        >
          설문 수정
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
                각 문항별 이름 (문항 순서대로 작성해주세요! 빈 문항부터 끝 문항까지
                잘립니다.)
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
          <Button
            variant="contained"
            onClick={onClickAddQuestion}
            fullWidth
            sx={{ mt: '10px;', mb: '10px' }}
          >
            추가
          </Button>

          {questions.map(item => (
            <SurveyQuestionItem key={item.content} item={item} setQuestions={setQuestions} />
          ))}
        </Box>
        <ButtonBox>
          <SubmitBtn
            variant="contained"
            onClick={onClickModifySubmit}
            fullWidth
            disabled={loading}
          >
            {loading ? <Spinner fit={true} /> : '수정'}
          </SubmitBtn>
          <DeleteBtn
            variant="contained"
            color="warning"
            onClick={onClickDelete}
            // sx={{ marginTop: '2rem' }}
            fullWidth
            disabled={loading}
          >
            {loading ? <Spinner fit={true} /> : '삭제'}
          </DeleteBtn>
        </ButtonBox>
      </Container>
    </SurveyModifyWrap>
  );
}

const SurveyModifyWrap = styled(Box)``;

const ButtonBox = styled(Box)`
  margin: 20px 0 20px 0;
`;

const SubmitBtn = styled(Button)`
  width: 15%;
  float: right;
  margin: 0 0 0 5px;
`;

const DeleteBtn = styled(Button)`
  width: 15%;
  float: right;
`;
