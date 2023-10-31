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
import { useDialog } from '@hooks/useDialog';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

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

interface formTypeInputs {
  inputs: {
    [idx: string]: string | number;
  }[];
}

export function SurveyQuestionModifyModal({
  open,
  handleClose,
  surveyQuestion,
  setQuestions,
}: Props) {
  const snackbar = useSnackbar();
  const dialog = useDialog();
  const [type, setType] = useState<QuestionType>(
    surveyQuestion.questionType === QuestionType.TYPE_MULTIPLE_CHOICE
      ? QuestionType.TYPE_MULTIPLE_CHOICE
      : QuestionType.TYPE_SUBJECTIVE
  );
  const { register, setValue, watch } = useForm<SurveyQuestionRequestDto>({
    defaultValues: defaultValue,
  });

  const {
    register: inputsRegister,
    setValue: inputsSetValue,
    watch: inputsWatch,
  } = useForm<formTypeInputs>();

  //초기화
  useEffect(() => {
    setValue('content', surveyQuestion.content);
    setValue('questionType', surveyQuestion.questionType);
    setType(
      surveyQuestion.questionType === QuestionType.TYPE_MULTIPLE_CHOICE
        ? QuestionType.TYPE_MULTIPLE_CHOICE
        : QuestionType.TYPE_SUBJECTIVE
    );
    setValue('surveyMultipleChoice', surveyQuestion.surveyMultipleChoice);

    if (surveyQuestion.questionType === QuestionType.TYPE_SUBJECTIVE) return;
    //실제로 루프를 멈추는게 아닙니다. filter는 끝까지 돕니다. 최적화를 원한다면 for를 사용하세요.
    let stopLoop = false;
    const splitItems = Object.entries(surveyQuestion.surveyMultipleChoice);
    const inputList = splitItems
      .filter(filter => filter[0].includes('item'))
      .filter(filter => {
        if (!filter[1]) stopLoop = true;
        if (stopLoop) return false;
        return true;
      })
      .map(item => {
        const key = item[0];
        //삭제용 더미시퀀스
        const dummySeq = Math.floor(Math.random() * 10000);
        if (!item[1]) return;
        return {
          dummySeq,
          [key]: item[1],
        };
      });
    inputsSetValue('inputs', inputList);
    // console.log(inputList);
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
    if (QuestionType.TYPE_MULTIPLE_CHOICE === type) {
      if (!inputsWatch()?.inputs)
        return snackbar({ variant: 'error', message: '문항을 만들어주세요!' });

      if (inputsWatch().inputs.length === 0)
        return snackbar({ variant: 'error', message: '문항을 만들어주세요!' });
    }
    // console.log('ss', inputsWatch(), watch());
    //validate
    let isEmpty = false;
    inputsWatch().inputs.forEach(item => {
      const key = Object.keys(item)[1];
      if (item[key] === '' || !item[key]) isEmpty = true;
    });
    if (isEmpty)
      return snackbar({ variant: 'error', message: '모든 문항을 작성해주세요.' });

    //배열로 된 inputs를 변환합니다.
    const convertedChoice = {};
    inputsWatch().inputs.forEach(item => {
      const key = Object.keys(item)[1];
      convertedChoice[key] = item[key];
    });

    setQuestions(prev =>
      prev.map(item => {
        if (item.dummySeq === surveyQuestion.dummySeq) {
          return {
            dummySeq: surveyQuestion.dummySeq,
            content: watch().content,
            questionType: type,
            surveyMultipleChoice:
              type === QuestionType.TYPE_MULTIPLE_CHOICE
                ? convertedChoice
                : // watch().surveyMultipleChoice
                  null,
          };
        }
        return item;
      })
    );
    handleClose();
  };

  //Textfield를 추가합니다.
  const onClickAddInput = async () => {
    const inputsLength = inputsWatch().inputs?.length || 0;
    // const confirm = await dialog({
    //   variant: 'confirm',
    //   title: '문항 추가하기',
    //   description: '정말로 문항을 추가하시겠습니까?',
    // });
    // if (!confirm) return snackbar({ variant: 'info', message: '추가를 취소하셨습니다.' });
    if (inputsLength === 10)
      return snackbar({ variant: 'error', message: '10문항을 초과할수 없습니다.' });

    const dummySeq = Math.floor(Math.random() * 10000);
    inputsSetValue(`inputs.${inputsLength}`, {
      dummySeq,
      [`item${inputsLength + 1}`]: '',
    });
  };

  // console.log(inputsWatch());

  //Textfield를 삭제합니다.
  const onClickRemoveInput = async (dummySeq: string | number) => {
    //제거 및 속성명 재정렬
    const removeAndSorted = inputsWatch()
      .inputs.filter((filter, idx) => filter.dummySeq !== dummySeq)
      .map((item, idx) => {
        const itemKey = Object.keys(item)[1]; // item1 , item2 와 같은 프로퍼티를 가져옵니다.
        return {
          dummySeq: item['dummySeq'],
          [`item${idx + 1}`]: item[itemKey],
        };
      });

    inputsSetValue('inputs', removeAndSorted);
  };

  /**
   * item1 item2... 답이 없습니다.
   * 불필요한 코드가 많이 작성되는거 같아 나중에
   * 배열형식으로 핸들링하고
   * submit할때 item 넘버에 맞게 재정렬하는편이 좋아보입니다.
   * item1 item2.. 이방식을 쓰니 jsx가 유연하게 대응하지 못할것 같습니다.
   * Object.keys 자꾸 쓰는것도 비효율적인것 같습니다.
   */

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
                <span>객관식</span>
                <Radio
                  value={QuestionType.TYPE_SUBJECTIVE}
                  onChange={onChangeType}
                  checked={type === QuestionType.TYPE_SUBJECTIVE}
                />
                <span>주관식</span>
              </Box>
            </TableCell>
          </TableRow>

          {type === QuestionType.TYPE_MULTIPLE_CHOICE && (
            <TableRow>
              <TableCell>객관식 문항 추가하기</TableCell>
              <TableCell>
                <Button variant="contained" onClick={onClickAddInput}>
                  <AddCircleOutlineIcon />
                </Button>
              </TableCell>
            </TableRow>
          )}

          {type === QuestionType.TYPE_SUBJECTIVE ? (
            <TableRow>
              <TableCell>주관식입니다</TableCell>
              <TableCell>주관식입니다.</TableCell>
            </TableRow>
          ) : (
            <>
              {inputsWatch('inputs')?.map((item, idx) => (
                <TableRow key={item['dummySeq']}>
                  <TableCell>{Object.keys(item)[1].split('item')[1]}</TableCell>
                  <TableCell>
                    <TextField
                      {...inputsRegister(`inputs.${idx}.${Object.keys(item)[1]}`)}
                    />
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={() => onClickRemoveInput(item['dummySeq'])}
                    >
                      삭제하기
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {/* <TableRow>
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
                )} */}
            </>
          )}
        </TableBody>
      </Table>
    </Modal>
  );
}

// const SurvetQuestionModifyModalWrap = styled(Box)``;
