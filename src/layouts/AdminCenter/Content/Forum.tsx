import { Button, Chip, Container, TableBody, TableHead, Typography } from '@mui/material';
import styles from '@styles/common.module.scss';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Spinner, Table } from '@components/ui';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { ProductStatus } from '@common/api/course';
import { QuestionUploadModal } from '@components/admin-center/QuestionUploadModal';
import { QuestionPreviewModal } from '@components/admin-center';
import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/css';
import { setLineClamp } from '@styles/mixins';
import { removeQuestion, useQuestionList } from '@common/api/question';
import { useRouter } from 'next/router';
import { useSnackbar } from '@hooks/useSnackbar';
import { useDialog } from '@hooks/useDialog';
import { useState } from 'react';
import { useForumList } from '@common/api/forum';

const headRows: { name: string; align: 'inherit' | 'left' | 'center' | 'right' | 'justify'; }[] = [
  { name: 'ID', align: 'left' },
  { name: '토론명', align: 'left' },
  { name: '등록일', align: 'right' },
  { name: '상태', align: 'right' },
];

export function Forum() {
  const router = useRouter();
  const snackbar = useSnackbar();
  const dialog = useDialog();
  const [ openUploadModal, setOpenUploadModal ] = useState(false);
  const [ openPreviewModal, setOpenPreviewModal ] = useState(false);
  const [ forumId, setForumId ] = useState<number | null>(null);
  const [ page, setPage ] = useState(0);
  const { contentId: courseId } = router.query;
  const {
    forumPaginationResult,
    forumPaginationResultError,
    mutate
  } = useForumList({ courseId: Number(courseId), page });


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
    setForumId(questionId);
    setOpenUploadModal(true);
  };

  if (forumPaginationResultError) return <div>error</div>;
  if (!forumPaginationResult) return <Spinner />;
  return (
    <Container className={styles.globalContainer}>
      <UploadBtn>
        <Button
          color="secondary"
          variant="contained"
          startIcon={<FileUploadIcon />}
          onClick={() => {
            setForumId(null);
            setOpenUploadModal(true);
          }}
        >
          문제 등록
        </Button>
      </UploadBtn>

      <Table
        size="small"
        pagination
        totalNum={forumPaginationResult.totalElements}
        page={forumPaginationResult.number}
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
          {forumPaginationResult.content.map((forum) =>
            <TableRow key={forum.seq} hover>
              <TableCell style={{ width: 10 }} align="left">
                {forum.seq}
              </TableCell>
              <TableCell align="left">
                <Typography className={ellipsis}>
                  {}
                </Typography>
              </TableCell>
              <TableCell style={{ width: 60 }} align="right">
                {}
              </TableCell>
              <TableCell style={{ width: 10 }} align="right">
                <Chip
                  label={forum.status === ProductStatus.APPROVE ? '정상' : '중지'}
                  variant="outlined"
                  size="small"
                  color={forum.status === ProductStatus.APPROVE ? 'secondary' : 'default'}
                />
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                <Button
                  variant="text"
                  color="neutral"
                  size="small"
                  onClick={() => modifyQuestion(forum.seq)}
                >
                  수정
                </Button>
                <Button
                  variant="text"
                  color="warning"
                  onClick={() => handleRemoveQuestion(forum.seq)}
                  size="small"
                >
                  삭제
                </Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <QuestionUploadModal
        mode={forumId ? 'modify' : 'upload'}
        contentId={Number(courseId)}
        questionId={Number(forumId)}
        open={openUploadModal}
        handleClose={() => setOpenUploadModal(false)}
      />

      <QuestionPreviewModal
        questionId={Number(forumId)}
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
