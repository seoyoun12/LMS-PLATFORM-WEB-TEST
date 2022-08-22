import styled from '@emotion/styled';
import { Modal, Spinner } from '@components/ui';
import { SurveyQuestion } from '@layouts/AdminCenter/SurveyMenagement/SurveyUpload';
import {
  Box,
  Button,
  Radio,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import {
  SurveyQuestionRequestDto,
  SurveyMultipleChoiceRequestDto,
} from '@common/api/Api';
import { useEffect, useState } from 'react';
import { useSnackbar } from '@hooks/useSnackbar';
import { QuestionType, SurveyMultipleChoice } from '@common/api/adm/survey';

interface Props {
  open: boolean;
  //   courseSeq: number;
  handleClose: () => void;
  surveyQuestion: SurveyQuestion;
  setQuestions: React.Dispatch<React.SetStateAction<SurveyQuestion[]>>;
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

export function SurveyQuestionModifyModal({
  open,
  handleClose,
  surveyQuestion,
  setQuestions,
}: Props) {
  const snackbar = useSnackbar();
  const [type, setType] = useState<QuestionType>(
    surveyQuestion.questionType === QuestionType.TYPE_MULTIPLE_CHOICE
      ? QuestionType.TYPE_MULTIPLE_CHOICE
      : QuestionType.TYPE_SUBJECTIVE
  );
  const { register, setValue, watch } = useForm<SurveyQuestionRequestDto>({
    defaultValues: defaultValue,
  });
  useEffect(() => {
    setValue('content', surveyQuestion.content);
    setValue('questionType', surveyQuestion.questionType);
    setType(
      surveyQuestion.questionType === QuestionType.TYPE_MULTIPLE_CHOICE
        ? QuestionType.TYPE_MULTIPLE_CHOICE
        : QuestionType.TYPE_SUBJECTIVE
    );
    setValue('surveyMultipleChoice', surveyQuestion.surveyMultipleChoice);
  }, []);

  //change question Type
  const onChangeType = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === QuestionType.TYPE_MULTIPLE_CHOICE) {
      setType(QuestionType.TYPE_MULTIPLE_CHOICE);
    } else {
      setType(QuestionType.TYPE_SUBJECTIVE);
    }
  };

  const onClickModify = () => {
    setQuestions(prev =>
      prev.map(item => {
        if (item.dummySeq === surveyQuestion.dummySeq) {
          return {
            dummySeq: surveyQuestion.dummySeq,
            content: watch().content,
            questionType: type,
            surveyMultipleChoice:
              type === QuestionType.TYPE_MULTIPLE_CHOICE
                ? watch().surveyMultipleChoice
                : null,
          };
        }
        return item;
      })
    );
    handleClose();
  };

  return (
    <Modal
      open={open}
      onCloseModal={handleClose}
      title="설문 항목 변경"
      maxWidth="lg"
      action={
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            gap: '1rem',
            paddingBottom: '1rem',
          }}
        >
          <Button variant="contained" onClick={onClickModify} fullWidth>
            수정하기
          </Button>
        </Box>
      }
    >
      <Table sx={{ width: '800px' }}>
        <TableBody sx={{ display: 'table', width: '100%' }}>
          <TableRow>
            <TableCell>설문 문항 제목</TableCell>
            <TableCell>
              <TextField {...register('content')} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>설문 문항 타입</TableCell>
            <TableCell>
              <Box display="flex" alignItems="center">
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
            </TableCell>
          </TableRow>
          {type === QuestionType.TYPE_SUBJECTIVE ? (
            <TableRow>
              <TableCell>주관식입니다</TableCell>
              <TableCell>주관식입니다.</TableCell>
            </TableRow>
          ) : (
            <>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>
                  <TextField {...register('surveyMultipleChoice.item1')} />
                </TableCell>
              </TableRow>
              {watch().surveyMultipleChoice.item1 &&
                watch().surveyMultipleChoice.item1 !== '' && (
                  <TableRow>
                    <TableCell>2</TableCell>
                    <TableCell>
                      <TextField {...register('surveyMultipleChoice.item2')} />
                    </TableCell>
                  </TableRow>
                )}
              {watch().surveyMultipleChoice.item2 &&
                watch().surveyMultipleChoice.item2 !== '' && (
                  <TableRow>
                    <TableCell>3</TableCell>
                    <TableCell>
                      <TextField {...register('surveyMultipleChoice.item3')} />
                    </TableCell>
                  </TableRow>
                )}
              {watch().surveyMultipleChoice.item3 &&
                watch().surveyMultipleChoice.item3 !== '' && (
                  <TableRow>
                    <TableCell>4</TableCell>
                    <TableCell>
                      <TextField {...register('surveyMultipleChoice.item4')} />
                    </TableCell>
                  </TableRow>
                )}
              {watch().surveyMultipleChoice.item4 &&
                watch().surveyMultipleChoice.item4 !== '' && (
                  <TableRow>
                    <TableCell>5</TableCell>
                    <TableCell>
                      <TextField {...register('surveyMultipleChoice.item5')} />
                    </TableCell>
                  </TableRow>
                )}
              {watch().surveyMultipleChoice.item5 &&
                watch().surveyMultipleChoice.item5 !== '' && (
                  <TableRow>
                    <TableCell>6</TableCell>
                    <TableCell>
                      <TextField {...register('surveyMultipleChoice.item6')} />
                    </TableCell>
                  </TableRow>
                )}
              {watch().surveyMultipleChoice.item6 &&
                watch().surveyMultipleChoice.item6 !== '' && (
                  <TableRow>
                    <TableCell>7</TableCell>
                    <TableCell>
                      <TextField {...register('surveyMultipleChoice.item7')} />
                    </TableCell>
                  </TableRow>
                )}
              {watch().surveyMultipleChoice.item7 &&
                watch().surveyMultipleChoice.item7 !== '' && (
                  <TableRow>
                    <TableCell>8</TableCell>
                    <TableCell>
                      <TextField {...register('surveyMultipleChoice.item8')} />
                    </TableCell>
                  </TableRow>
                )}
              {watch().surveyMultipleChoice.item8 &&
                watch().surveyMultipleChoice.item8 !== '' && (
                  <TableRow>
                    <TableCell>9</TableCell>
                    <TableCell>
                      <TextField {...register('surveyMultipleChoice.item9')} />
                    </TableCell>
                  </TableRow>
                )}
              {watch().surveyMultipleChoice.item9 &&
                watch().surveyMultipleChoice.item9 !== '' && (
                  <TableRow>
                    <TableCell>10</TableCell>
                    <TableCell>
                      <TextField {...register('surveyMultipleChoice.item10')} />
                    </TableCell>
                  </TableRow>
                )}
            </>
          )}
        </TableBody>
      </Table>
    </Modal>
  );
}

// const SurvetQuestionModifyModalWrap = styled(Box)``;
