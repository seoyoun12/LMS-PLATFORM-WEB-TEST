import { SurveyMultipleChoiceRequestDto } from '@common/api/types/Api';
import styled from '@emotion/styled';
import { SurveyQuestion } from '@layouts/AdminCenter/SurveyMenagement/SurveyUpload';
import { Box, Button, Table, TableBody, TableCell, TableRow } from '@mui/material';
import { useState } from 'react';
import { SurveyQuestionModifyModal } from './SurveyQuestionModifyModal';

interface Props {
  item: SurveyQuestion;
  setQuestions: React.Dispatch<React.SetStateAction<SurveyQuestion[]>>;
}

export function SurveyQuestionItem({ item, setQuestions }: Props) {
  const [open, setOpen] = useState(false);

  //delete question
  const onClickDeleteQuestion = (dummySeq: number) => {
    setQuestions(prev => prev.filter(item => item.dummySeq !== dummySeq));
  };

  const handleClose = () => {
    setOpen(false);
  };

  //exchange
  const objToJsx = (objParam: SurveyMultipleChoiceRequestDto): React.ReactNode => {
    let arr: string[] = [];
    if (!objParam) return <Box>주관식 입니다.</Box>;
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
  return (
    <SurveyQuestionItemTable>
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
            <Button variant="contained" onClick={() => setOpen(true)}>
              수정
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
      {open && (
        <SurveyQuestionModifyModal
          open={open}
          handleClose={handleClose}
          surveyQuestion={item}
          setQuestions={setQuestions}
        />
      )}
    </SurveyQuestionItemTable>
  );
}

const SurveyQuestionItemTable = styled(Table)``;
