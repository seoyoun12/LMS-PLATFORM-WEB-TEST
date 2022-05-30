import styles from '@styles/common.module.scss';
import { Button, Chip, Container, TableBody, TableHead, Typography } from '@mui/material';
import { Table } from '@components/ui';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import * as React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import styled from '@emotion/styled';
import { useSnackbar } from '@hooks/useSnackbar';
import { useDialog } from '@hooks/useDialog';
import { ProductStatus } from '@common/api/course';
import { QuestionUploadModal } from '@components/admin-center/QuestionUploadModal';
import { ExamLevel, QuestionType, removeQuestion, useQuestionList } from '@common/api/question';
import { Spinner } from '@components/ui';
import { css } from '@emotion/css';
import { setLineClamp } from '@styles/mixins';
import { QuestionPreviewModal } from '@components/admin-center';

const questionType = {
  [QuestionType.QUESTION_OBJ]: '객관식',
  [QuestionType.QUESTION_SUBJ]: '주관식'
};

const level = {
  [ExamLevel.LEVEL_EASY]: '하',
  [ExamLevel.LEVEL_MEDIUM]: '중',
  [ExamLevel.LEVEL_HARD]: '상'
};

const headRows: { name: string, align: 'inherit' | 'left' | 'center' | 'right' | 'justify'; }[] = [
  { name: 'ID', align: 'left' },
  { name: '문제', align: 'left' },
  { name: '문제유형', align: 'right' },
  { name: '차시', align: 'right' },
  { name: '난이도', align: 'right' },
  { name: '상태', align: 'right' },
];

export function Question() {
  const router = useRouter();
  const snackbar = useSnackbar();
  const dialog = useDialog();
  const [ openBulkUploadModal, setOpenBulkUploadModal ] = useState(false);
  const [ openUploadModal, setOpenUploadModal ] = useState(false);
  const [ openPreviewModal, setOpenPreviewModal ] = useState(false);
  const [ questionId, setQuestionId ] = useState<number | null>(null);
  const [ page, setPage ] = useState(0);
  const { contentId } = router.query;
  const {
    questionPaginationResult,
    questionPaginationResultError,
    mutate
  } = useQuestionList({ contentId: Number(contentId), page });

  const handleRemoveQuestion = async (questionId: number) => {
    try {
      const dialogConfirmed = await dialog({
        title: '콘텐츠 삭제하기',
        description: '정말로 삭제하시겠습니까?',
        confirmText: '삭제하기',
        cancelText: '취소'
      });
      if (dialogConfirmed) {
        await removeQuestion(questionId);
        snackbar({ variant: 'success', message: '성공적으로 삭제되었습니다.' });
        await mutate();
      }
    } catch (e: any) {
      snackbar({ variant: 'error', message: e.data.message });
    }
  };

  const modifyQuestion = (questionId: number) => {
    setQuestionId(questionId);
    setOpenUploadModal(true);
  };

  const closeBulkModal = async (isSubmit: boolean) => {
    if (isSubmit) {
      await mutate();
    }

    setOpenBulkUploadModal(false);
  };


  if (questionPaginationResultError) return <div>error</div>;
  if (!questionPaginationResult) return <Spinner />;
  return (
    <Container className={styles.globalContainer}>
      <UploadBtn>
        <Button
          color="secondary"
          variant="contained"
          startIcon={<FileUploadIcon />}
          onClick={() => {
            setQuestionId(null);
            setOpenUploadModal(true);
          }}
        >
          문제 등록
        </Button>

        {/*<Button*/}
        {/*  color="secondary"*/}
        {/*  variant="outlined"*/}
        {/*  startIcon={<FileUploadIcon />}*/}
        {/*  onClick={() => setOpenBulkUploadModal(true)}*/}
        {/*>*/}
        {/*  문제 일괄 등록*/}
        {/*</Button>*/}
      </UploadBtn>

      <Table
        size="small"
        pagination
        totalNum={questionPaginationResult.totalElements}
        page={questionPaginationResult.number}
        onChangePage={() => setPage(page)}
      >
        <TableHead>
          <TableRow>
            {headRows.map(({ name, align }) =>
              <TableCell key={name} align={align}>{name}</TableCell>
            )}
            <TableCell>{}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {questionPaginationResult.content.map((question) => {
              return (
                <TableRow key={question.seq} hover>
                  <TableCell style={{ width: 10 }} align="left">
                    {question.seq}
                  </TableCell>
                  <TableCell align="left">
                    <Typography className={ellipsis}>
                      {question.question}
                    </Typography>
                  </TableCell>
                  <TableCell style={{ width: 100 }} align="right">
                    {questionType[question.questionType]}
                  </TableCell>
                  <TableCell style={{ width: 60 }} align="right">
                    {question.chapter}
                  </TableCell>
                  <TableCell style={{ width: 80 }} align="right">
                    {level[question.level]}
                  </TableCell>
                  <TableCell style={{ width: 10 }} align="right">
                    <Chip
                      label={question.status === ProductStatus.APPROVE ? '정상' : '중지'}
                      variant="outlined"
                      size="small"
                      color={question.status === ProductStatus.APPROVE ? 'secondary' : 'default'}
                    />
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    <Button
                      variant="text"
                      color="neutral"
                      size="small"
                      onClick={() => modifyQuestion(question.seq)}
                    >
                      수정
                    </Button>
                    <Button
                      variant="text"
                      color="warning"
                      onClick={() => handleRemoveQuestion(question.seq)}
                      size="small"
                    >
                      삭제
                    </Button>
                  </TableCell>
                </TableRow>);
            }
          )}
        </TableBody>
      </Table>

      {/*<LessonBulkUploadModal*/}
      {/*  open={openBulkUploadModal}*/}
      {/*  handleClose={closeBulkModal}*/}
      {/*/>*/}
      <QuestionUploadModal
        mode={questionId ? 'modify' : 'upload'}
        contentId={Number(contentId)}
        questionId={Number(questionId)}
        open={openUploadModal}
        handleClose={() => setOpenUploadModal(false)}
      />

      <QuestionPreviewModal
        questionId={Number(questionId)}
        open={openPreviewModal}
        handleClose={() => setOpenPreviewModal(false)}
      />
    </Container>
  );
}

const UploadBtn = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding-bottom: 30px;
  justify-content: flex-end;

  > button:last-of-type {
    margin-left: 12px;
  }
`;

const ellipsis = css`
  ${setLineClamp(2)}
`;

