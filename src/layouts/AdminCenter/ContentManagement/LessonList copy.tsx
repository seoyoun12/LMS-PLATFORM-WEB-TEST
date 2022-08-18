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
import { removeLesson, useLesson, useLessonList } from '@common/api/adm/lesson';
import { useSnackbar } from '@hooks/useSnackbar';
import { useDialog } from '@hooks/useDialog';
import { ContentType } from '@common/api/content';
import { ProductStatus } from '@common/api/course';
import { LessonEditModal } from '@components/admin-center/LessonEditModal';
import { Spinner } from '@components/ui';
import { totalSecToMinSec } from 'src/utils/totalSecToMinSec';

const headRows = [
  { name: '차시' },
  { name: '콘텐츠 유형' },
  { name: '강의명' },
  { name: '학습시간' },
  { name: '인정시간' },
  { name: '페이지' },
  { name: '상태' },
];

const contentType = {
  [ContentType.CONTENT_HTML]: '웹콘텐츠(HTML5)',
  [ContentType.CONTENT_MP4]: 'mp4',
  [ContentType.CONTENT_EXTERNAL]: '외부링크',
};

export function LessonList() {
  const router = useRouter();
  const snackbar = useSnackbar();
  const dialog = useDialog();
  const [openBulkUploadModal, setOpenBulkUploadModal] = useState(false);
  const [openUploadModal, setOpenUploadModal] = useState(false);
  const [lessonId, setLessonId] = useState<number | null>(null);
  const { contentSeq } = router.query;
  const { lessonList, lessonListError, mutate } = useLessonList(Number(contentSeq));
  const { lesson, lessonError } = useLesson(lessonId);

  const onRemoveLesson = async (lessonId: number) => {
    try {
      const dialogConfirmed = await dialog({
        title: '콘텐츠 삭제하기',
        description: '정말로 삭제하시겠습니까?',
        confirmText: '삭제하기',
        cancelText: '취소',
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

  const modifyLesson = (lessonId: number) => {
    setLessonId(lessonId);
    setOpenUploadModal(true);
  };

  const handleModalClose = async (isSubmit: boolean) => {
    if (isSubmit) {
      await mutate();
    }

    if (openUploadModal) {
      setOpenUploadModal(false);
    }

    if (openBulkUploadModal) {
      setOpenBulkUploadModal(false);
    }
  };

  if (lessonListError) return <div>error</div>;
  if (!lessonList) return <Spinner />;
  return (
    <Container className={styles.globalContainer}>
      <LessonUploadBtn>
        <Button
          className="upload-btn"
          color="secondary"
          variant="contained"
          startIcon={<FileUploadIcon />}
          onClick={() => setOpenBulkUploadModal(true)}
        >
          강의 등록
        </Button>
      </LessonUploadBtn>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="left">{headRows[0].name}</TableCell>
            {headRows.slice(1).map(({ name }: { name: string }) => (
              <TableCell key={name} align="right">
                {name}
              </TableCell>
            ))}
            <TableCell>{}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lessonList.map(lesson => {
            const { min, sec } = totalSecToMinSec(lesson.completeTime);
            return (
              <TableRow key={lesson.seq} hover>
                <TableCell style={{ width: 60 }} align="left">
                  {lesson.chapter}
                </TableCell>
                <TableCell style={{ width: 80 }} align="right">
                  {contentType[lesson.contentType]}
                </TableCell>
                <TableCell style={{ width: 200 }} align="right">
                  {lesson.lessonNm}
                </TableCell>
                <TableCell style={{ width: 100 }} align="right">
                  {lesson.min}분 {lesson.sec}초
                </TableCell>
                <TableCell style={{ width: 100 }} align="right">
                  {min}분 {sec}초
                </TableCell>
                <TableCell style={{ width: 100 }} align="right">
                  {lesson.totalPage}
                </TableCell>
                <TableCell style={{ width: 10 }} align="right">
                  <Chip
                    label={lesson.status === ProductStatus.APPROVE ? '정상' : '중지'}
                    variant="outlined"
                    size="small"
                    color={
                      lesson.status === ProductStatus.APPROVE ? 'secondary' : 'default'
                    }
                  />
                </TableCell>
                <TableCell style={{ width: 135 }} align="right">
                  <Button
                    variant="text"
                    color="neutral"
                    size="small"
                    onClick={() => modifyLesson(lesson.seq)}
                  >
                    수정
                  </Button>
                  <Button
                    variant="text"
                    color="warning"
                    onClick={() => onRemoveLesson(lesson.seq)}
                    size="small"
                  >
                    삭제
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <LessonBulkUploadModal
        open={openBulkUploadModal}
        handleClose={isSubmit => handleModalClose(isSubmit)}
      />
      <LessonEditModal
        open={openUploadModal}
        lesson={lesson}
        error={lessonError}
        handleClose={isSubmit => handleModalClose(isSubmit)}
      />
    </Container>
  );
}

const LessonUploadBtn = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding-bottom: 30px;

  .upload-btn {
    margin-left: auto;
  }
`;
