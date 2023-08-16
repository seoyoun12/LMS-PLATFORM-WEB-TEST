import styles from '@styles/common.module.scss';
import { Button, Chip, Container, TableBody, TableHead } from '@mui/material';
import { Table } from '@components/ui';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { useState } from 'react';
import { useRouter } from 'next/router';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import styled from '@emotion/styled';
import { LessonBulkUploadModal } from '@components/admin-center/LessonBulkUploadModal';
import {  useLesson, useLessonList } from '@common/api/adm/lesson';
import { ContentType } from '@common/api/content';
import { ProductStatus } from '@common/api/course';
import { LessonEditModal } from '@components/admin-center/LessonEditModal';
import { Spinner } from '@components/ui';
import { totalSecToMinSec } from 'src/utils/totalSecToMinSec';

const headRows: {
  name: string;
  align: 'inherit' | 'left' | 'center' | 'right' | 'justify';
}[] = [
  { name: '차시', align: 'center' },
  // { name: '콘텐츠 유형', align: 'center' },
  { name: '강의명', align: 'center' },
  { name: '학습시간', align: 'center' }, //  (total time)
  { name: '수료시간', align: 'center' }, //  (complete time)
  // { name: '페이지' },
  { name: '상태', align: 'center' },
];

const contentType = {
  [ContentType.CONTENT_HTML]: '웹콘텐츠(HTML5)',
  [ContentType.CONTENT_MP4]: 'mp4',
  [ContentType.CONTENT_EXTERNAL]: '외부링크',
};

export function LessonList() {
  const router = useRouter();
  
  // const [openBulkUploadModal, setOpenBulkUploadModal] = useState(false);
  const [openBulkUploadModal, setOpenBulkUploadModal] = useState(false);
  const [openUploadModal, setOpenUploadModal] = useState(false);
  const [lessonId, setLessonId] = useState<number | null>(null);
  const { contentSeq } = router.query;

  const { lessonList, lessonListError, mutate } = useLessonList(Number(contentSeq));
  const { lesson, lessonError, lessonMutate } = useLesson(lessonId);
  
  const modifyLesson = (lessonId: number) => {
    setLessonId(lessonId);
    setOpenUploadModal(true);
  };

  const handleModalClose = async (isSubmit: boolean) => {
    if (isSubmit) {
      await mutate();
      lessonMutate()
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
            {headRows.slice(1).map(({ name, align }) => (
              <TableCell key={name} align="center">
                {name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {lessonList.map(lesson => {
            const { min, sec } = totalSecToMinSec(lesson.completeTime);
            return (
              <TableRow
                key={lesson.seq}
                hover
                onClick={() => modifyLesson(lesson.seq)}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell style={{ width: 100 }} align="left">
                  {lesson.chapter}
                </TableCell>
                <TableCell style={{ width: 600 }} align="left">
                  {lesson.lessonNm}
                </TableCell>
                <TableCell style={{ width: 150 }} align="center">
                  {lesson.min}분 {lesson.sec}초
                </TableCell>
                <TableCell style={{ width: 150 }} align="center">
                  {min}분 {sec}초
                </TableCell>
                <TableCell style={{ width: 10 }} align="center">
                  <Chip
                    label={ lesson.status === ProductStatus.APPROVE ? '정상' : '중지' }
                    variant="outlined"
                    size="small"
                    color={ lesson.status === ProductStatus.APPROVE ? 'secondary' : 'default' }
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {/* <LessonUpload */}
      {/* <LessonBulkUpload */}
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
