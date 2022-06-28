import * as React from 'react';
import { Controller, SubmitHandler, useForm, useWatch } from 'react-hook-form';
import {
  Box,
  FormControl, FormControlLabel,
  FormHelperText,
  MenuItem, Radio, RadioGroup,
  Select, TextareaAutosize, Typography
} from '@mui/material';
import { ErrorMessage } from '@hookform/error-message';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { CustomInputLabel } from '@components/ui/InputLabel';
import { Modal } from '@components/ui';
import TextField from '@mui/material/TextField';
import { useSnackbar } from '@hooks/useSnackbar';
import {
  ExamLevel,
  QuestionType,
  QuestionInput,
} from '@common/api/question';
import {
  modifyQuestion,
  uploadQuestion,
  useQuestion
} from '@common/api/adm/question';

type FormType = {} & QuestionInput

const questionTypeOptions = [
  { name: '주관식', value: QuestionType.QUESTION_SUBJ },
  { name: '객관식', value: QuestionType.QUESTION_OBJ },
];

const examLevelOptions = [
  { name: '하', value: ExamLevel.LEVEL_EASY },
  { name: '중', value: ExamLevel.LEVEL_MEDIUM },
  { name: '상', value: ExamLevel.LEVEL_HARD },
];

const objQuestionTypeItems: {
  value: keyof Pick<QuestionInput, 'item1' | 'item2' | 'item3' | 'item4' | 'item5'>,
  name: string
}[] = [
  { value: 'item1', name: '문항 1' },
  { value: 'item2', name: '문항 2' },
  { value: 'item3', name: '문항 3' },
  { value: 'item4', name: '문항 4' },
  { value: 'item5', name: '문항 5' },
];

const defaultValues = {
  questionType: QuestionType.QUESTION_OBJ,
  answer: '',
  level: ExamLevel.LEVEL_EASY,
};

export function QuestionUploadModal({ open, handleClose, questionId, contentId, mode = 'upload' }: {
  open: boolean;
  handleClose: () => void;
  questionId?: number | null;
  contentId?: number;
  mode?: 'modify' | 'upload';
}) {
  const { question, questionError } = useQuestion(Number(questionId));
  const snackbar = useSnackbar();
  const [ submitLoading, setSubmitLoading ] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormType>({ defaultValues });
  const questionType = useWatch({ control, name: 'questionType' });
  const loading = (open && mode === 'modify' && !question);

  useEffect(() => {
    if (open) {
      reset(
        mode === 'modify' && !!question
          ? { ...question }
          : { ...defaultValues }
      );
    }
  }, [ mode, question, open ]);

  const onSubmit: SubmitHandler<FormType> = async (question) => {
    const inputParams = { ...question, contentSeq: contentId };
    setSubmitLoading(true);
    try {
      if (mode === 'upload') {
        await uploadQuestion(inputParams);
      } else {
        if (questionId) {
          await modifyQuestion(questionId, inputParams);
        }
      }

      setSubmitLoading(false);
      snackbar({ variant: 'success', message: '업로드 되었습니다.' });
    } catch (e: any) {
      setSubmitLoading(false);
      snackbar(e.message || e.data?.message);
    }
    handleClose();
  };

  if (open && questionError) return <div>error</div>;
  return (
    <Modal
      action="저장"
      title="문제 업로드"
      maxWidth="sm"
      fullWidth
      loading={loading}
      open={open}
      onCloseModal={handleClose}
      actionLoading={submitLoading}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box component="form">
        <FormContainer>
          <FormControl className="form-control">
            <TextField
              {...register('chapter', { required: '차시를 입력해주세요.' })}
              size="small"
              label="차시"
              variant="outlined"
            />
            <ErrorMessage errors={errors} name="chapter" as={<FormHelperText error />} />
          </FormControl>
          <FormControl className="form-control">
            <TextField
              {...register('question', { required: '문제를 입력해주세요.' })}
              size="small"
              label="문제"
              variant="outlined"
            />
            <ErrorMessage errors={errors} name="question" as={<FormHelperText error />} />
          </FormControl>

          <FormControl className="form-control">
            <CustomInputLabel size="small">문제 유형</CustomInputLabel>
            <Controller
              rules={{ required: '문제 유형을 선택해주세요.' }}
              control={control}
              name="questionType"
              render={({ field }) => (
                <Select
                  {...field}
                  size="small"
                  label="문제 유형"
                >
                  {questionTypeOptions.map(({ value, name }) =>
                    <MenuItem value={value} key={value}>{name}</MenuItem>
                  )}
                </Select>
              )}
            />
            <ErrorMessage errors={errors} name="questionType" as={<FormHelperText error />} />
          </FormControl>

          <FormGroup className="form-control">
            {
              {
                [QuestionType.QUESTION_OBJ]:
                  <FormControl className="obj-type">
                    <Controller
                      rules={{ required: true }}
                      control={control}
                      name="answer"
                      render={({ field }) => (
                        <RadioGroup row {...field} className="item-container radio">
                          {objQuestionTypeItems.map(({ value, name }) =>
                            <Radio key={value} value={value} />
                          )}
                        </RadioGroup>
                      )}
                    />
                    <div className="item-container text-field">
                      {objQuestionTypeItems.map(({ value, name }) =>
                        <TextField
                          key={value}
                          {...register(value, { required: '문제를 입력해주세요.' })}
                          size="small"
                          label={name}
                          fullWidth
                          variant="outlined"
                        />
                      )}
                    </div>
                  </FormControl>,

                [QuestionType.QUESTION_SUBJ]:
                  <TextField
                    {...register('answer', { required: '정답을 입력해주세요.' })}
                    size="small"
                    label="정답"
                    fullWidth
                    variant="outlined"
                  />,
              }[questionType]
            }
          </FormGroup>

          <FormControl className="form-control">
            <TextareaAutosize
              {...register('description')}
              className="text-area"
              placeholder="정답 설명"
            />
          </FormControl>

          <FormControl className="form-control">
            <Typography variant="body2">난이도</Typography>
            <Controller
              rules={{ required: true }}
              control={control}
              name="level"
              render={({ field }) => (
                <RadioGroup row {...field} className="item-container radio">
                  {examLevelOptions.map(({ value, name }) =>
                    <FormControlLabel
                      key={value}
                      value={value}
                      control={<Radio />}
                      label={name}
                    />
                  )}
                </RadioGroup>
              )}
            />
          </FormControl>

        </FormContainer>
      </Box>
    </Modal>
  );
}

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;

  .form-control {
    width: 100%;

    &:not(:last-child) {
      margin-bottom: 30px;
    }

    .text-area {
      width: 100%;
      min-height: 120px;
    }

    .obj-type {
      width: 100%;
      display: flex;
      flex-direction: row;

      .item-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        
        > :not(:last-child) {
          margin-bottom: 12px;
        }

        &.text-field {
          width: 100%;

          > * {
            height: 100%;
          }
        }
      }
    }
  }
`;

const FormGroup = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;
