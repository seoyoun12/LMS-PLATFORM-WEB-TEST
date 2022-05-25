import styles from '@styles/common.module.scss';
import { Button, Chip, Container, TableBody, TableHead } from '@mui/material';
import { Table } from '@components/ui';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import * as React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import styled from '@emotion/styled';
import { LessonBulkUploadModal } from '@components/admin-center/LessonBulkUploadModal';
import { removeLesson } from '@common/api/lesson';
import { useSnackbar } from '@hooks/useSnackbar';
import { useDialog } from '@hooks/useDialog';
import { PRODUCT_STATUS } from '@common/api/course';
import { QuestionUploadModal } from '@components/admin-center/QuestionUploadModal';
import { useQuestion, useQuestionList } from '@common/api/question';

const headRows = [
  { name: 'ID' },
  { name: '콘텐츠' },
  { name: '문제유형' },
  { name: '차시' },
  { name: '문제' },
  { name: '난이도' },
  { name: '미리보기' },
  { name: '상태' },
];

export function Question() {
  const router = useRouter();
  const snackbar = useSnackbar();
  const dialog = useDialog();
  const [ openBulkUploadModal, setOpenBulkUploadModal ] = useState(false);
  const [ openUploadModal, setOpenUploadModal ] = useState(false);
  const [ questionId, setQuestionId ] = useState<number | null>(null);
  const [ page, setPage ] = useState(0);
  const { contentId } = router.query;
  const {
    questionPaginationResult,
    questionPaginationResultError,
    mutate
  } = useQuestionList({ contentId: Number(contentId), page });

  const onRemoveLesson = async (lessonId: number) => {
    try {
      const dialogConfirmed = await dialog({
        title: '콘텐츠 삭제하기',
        description: '정말로 삭제하시겠습니까?',
        confirmText: '삭제하기',
        cancelText: '취소'
      });
      if (dialogConfirmed) {
        await removeLesson(lessonId);
        snackbar({ variant: 'success', message: '성공적으로 삭제되었습니다.' });
        await mutate();
      }
    } catch (e: any) {
      snackbar({ variant: 'error', message: e.data.message });
    }
  };

  const modifyLesson = (questionId: number) => {
    setQuestionId(questionId);
    setOpenUploadModal(true);
  };

  const closeBulkModal = async (isSubmit: boolean) => {
    if (isSubmit) {
      await mutate();
    }

    setOpenBulkUploadModal(false);
  };

  const onChangePage = (page: number) => {
    setPage(page);
  };

  if (questionPaginationResultError) return <div>error</div>;
  if (!questionPaginationResult) return <div>loading</div>;
  return (
    <Container className={styles.globalContainer}>
      <LessonUploadBtn>
        <Button
          color="secondary"
          variant="contained"
          startIcon={<FileUploadIcon />}
          onClick={() => setOpenUploadModal(true)}
        >
          문제 등록
        </Button>

        <Button
          color="secondary"
          variant="contained"
          startIcon={<FileUploadIcon />}
          onClick={() => setOpenBulkUploadModal(true)}
        >
          문제 일괄 등록
        </Button>
      </LessonUploadBtn>

      <Table
        size="small"
        pagination
        totalNum={questionPaginationResult.totalElements}
        page={questionPaginationResult.number}
        onChangePage={onChangePage}
      >
        <TableHead>
          <TableRow>
            <TableCell align="left">{headRows[0].name}</TableCell>
            {headRows.slice(1).map(({ name }: { name: string }) =>
              <TableCell key={name} align="right">{name}</TableCell>
            )}
            <TableCell>{}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {questionPaginationResult.content.map((question) => {
              return (
                <TableRow key={question.seq} hover>
                  <TableCell style={{ width: 60 }} align="left">
                    {question.seq}
                  </TableCell>
                  <TableCell style={{ width: 80 }} align="right">
                    {question.question}
                  </TableCell>
                  <TableCell style={{ width: 200 }} align="right">
                    {question.examType}
                  </TableCell>
                  <TableCell style={{ width: 100 }} align="right">
                    {question.chapter}
                  </TableCell>
                  <TableCell style={{ width: 100 }} align="right">
                    {question.question}
                  </TableCell>
                  <TableCell style={{ width: 100 }} align="right">
                    {question.level}
                  </TableCell>
                  <TableCell style={{ width: 74 }} align="right">미리보기</TableCell>
                  <TableCell style={{ width: 10 }} align="right">
                    <Chip
                      label={question.status === PRODUCT_STATUS.APPROVE ? '정상' : '중지'}
                      variant="outlined"
                      size="small"
                      color={question.status === PRODUCT_STATUS.APPROVE ? 'secondary' : 'default'}
                    />
                  </TableCell>
                  <TableCell style={{ width: 135 }} align="right">
                    <Button
                      variant="text"
                      color="neutral"
                      size="small"
                      onClick={() => modifyLesson(question.seq)}
                    >
                      수정
                    </Button>
                    <Button
                      variant="text"
                      color="warning"
                      onClick={() => onRemoveLesson(question.seq)}
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

      <LessonBulkUploadModal
        open={openBulkUploadModal}
        handleClose={closeBulkModal}
      />
      <QuestionUploadModal
        mode={questionId ? 'modify' : 'upload'}
        questionId={questionId}
        open={openUploadModal}
        error={questionPaginationResultError}
        handleClose={() => setOpenUploadModal(false)}
      />
    </Container>
  );
}

const LessonUploadBtn = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding-bottom: 30px;
  justify-content: flex-end;

  > button:last-of-type {
    margin-left: 12px;
  }
`;
