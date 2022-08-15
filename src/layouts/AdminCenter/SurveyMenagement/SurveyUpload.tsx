import { QuestionType, SurveyMultipleChoice, uploadSurvey } from '@common/api/adm/survey';
import {
  SurveyMultipleChoiceRequestDto,
  SurveyQuestionRequestDto,
  SurveyRequestDto,
} from '@common/api/types/Api';
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
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface SurveyQuestion extends SurveyQuestionRequestDto {
  dummySeq: number;
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
    if (!watch().content || watch().content === '') {
      return window.alert('문항 제목을 입력해 주세요!');
    }
    if (
      !watch().surveyMultipleChoice.item1 ||
      watch().surveyMultipleChoice.item1 === ''
    ) {
      return window.alert('적어도 하나의 문항 , 첫번째 문항이 필요합니다!');
    }
    const randomSeq = Math.floor(Math.random() * 1000);
    console.log(watch(), type, 'AddQuestion Test', randomSeq);
    setQuestions(prev => [
      ...prev,
      { ...watch(), dummySeq: randomSeq, questionType: type },
    ]);
    reset();
    setDisableTitle(true);
  };

  //delete question
  const onClickDeleteQuestion = (dummySeq: number) => {
    setQuestions(prev => prev.filter(item => item.dummySeq !== dummySeq));
  };

  //title lock
  useEffect(() => {
    if (questions.length === 0) setDisableTitle(false);
  }, [questions]);

  //exchange
  const objToJsx = (objParam: SurveyMultipleChoiceRequestDto): React.ReactNode => {
    let arr: string[] = [];
    for (let [key, obj] of Object.entries(objParam)) {
      if (!obj) break;
      arr.push(obj);
    }
    return arr.map((item, index) => (
      <Box key={index} className="question-child" display="flex">
        <Box
          sx={{
            borderRight: '1px solid #cacaca',
            paddingRight: '0.5rem',
            marginRight: '0.5rem',
          }}
        >
          {index + 1}번째 항목
        </Box>
        <Box>{item}</Box>
      </Box>
    ));
  };

  const onClickSubmit = async () => {
    let arr = questions.map(item => {
      return {
        content: item.content,
        questionType: item.questionType,
        surveyMultipleChoice: item.surveyMultipleChoice,
      };
    });
    console.log(arr, '임니다');
    try {
      const data: SurveyRequestDto = {
        title,
        surveyQuestionList: arr,
      };
      console.log('최종', data);
      await uploadSurvey(data);
      snackbar({ variant: 'success', message: '업로드 완료했습니다.' });
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
          설문 업로드
        </Typography>
        <Box>
          <TextField
            placeholder="설문 제목"
            disabled={disableTitle}
            onChange={e => setTitle(e.target.value)}
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
            <span>멀티플타입</span>
            <Radio
              value={QuestionType.TYPE_SUBJECTIVE}
              onChange={onChangeType}
              checked={type === QuestionType.TYPE_SUBJECTIVE}
            />
            <span>서브젝타입</span>
          </Box>

          <Typography
            variant="h6"
            sx={{
              mt: '12px',
              fontWeight: 700,
            }}
          >
            각 문항별 이름 (문항 순서대로 작성해주세요!)
          </Typography>
          <TextField placeholder="1번 문항" {...register('surveyMultipleChoice.item1')} />
          <TextField placeholder="2번 문항" {...register('surveyMultipleChoice.item2')} />
          <TextField placeholder="3번 문항" {...register('surveyMultipleChoice.item3')} />
          <TextField placeholder="4번 문항" {...register('surveyMultipleChoice.item4')} />
          <TextField placeholder="5번 문항" {...register('surveyMultipleChoice.item5')} />
          <TextField placeholder="6번 문항" {...register('surveyMultipleChoice.item6')} />
          <TextField placeholder="7번 문항" {...register('surveyMultipleChoice.item7')} />
          <TextField placeholder="8번 문항" {...register('surveyMultipleChoice.item8')} />
          <TextField placeholder="9번 문항" {...register('surveyMultipleChoice.item9')} />
          <TextField
            placeholder="10번 문항"
            {...register('surveyMultipleChoice.item10')}
          />
          <Button variant="contained" onClick={onClickAddQuestion} fullWidth>
            추가
          </Button>
          {questions.map(item => (
            <Table key={item.dummySeq}>
              <TableBody>
                <TableRow>
                  <TableCell width="20%">{item.content}</TableCell>
                  <TableCell width="70%">{objToJsx(item.surveyMultipleChoice)}</TableCell>
                  <TableCell width="10%">
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={() => onClickDeleteQuestion(item.dummySeq)}
                    >
                      삭제
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
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
