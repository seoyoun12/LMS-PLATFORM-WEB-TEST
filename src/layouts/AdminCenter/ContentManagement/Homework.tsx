import {
  Container,
  TableBody,
  TableHead,
  Typography,
  Button,
  TableCell,
  Chip,
} from '@mui/material';
import styles from '@styles/common.module.scss';
import { Table } from '@components/ui';
import TableRow from '@mui/material/TableRow';
import { Spinner } from '@components/ui';
import dateFormat from 'dateformat';
import { useRouter } from 'next/router';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useSnackbar } from '@hooks/useSnackbar';
import { useDialog } from '@hooks/useDialog';
import { homeworkList, HomeworkStatus, removeHomework } from '@common/api/homework';
import { HomeworkModal } from '@components/admin-center/HomeworkModal';

//////////// 2022 07 05 ///////////////////

const headRows = [
  { name: 'seq' },
  { name: '강의명' },
  { name: '등록날짜' },
  { name: '수정일자' },
  { name: '상태' },
  { name: '수정' },
  { name: '삭제' },
];

export function Homework() {
  const router = useRouter();
  const snackbar = useSnackbar();
  const dialog = useDialog();

  const [openHomeworkModal, setOpenHomeworkModal] = useState(false);
  const [seq, setSeq] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const { contentSeq } = router.query;
  const { pageData, pageError, mutate } = homeworkList({
    contentSeq: Number(contentSeq),
    page,
  });

  // Pagination
  const onChangePage = async (page: number) => {
    await router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        page,
      },
    });
  };
  useEffect(() => {
    const { page } = router.query;
    setPage(!isNaN(Number(page)) ? Number(page) : 0);
  }, [router.query]);

  // Modal control
  const handleCloseModal = async (isSubmit: boolean) => {
    if (openHomeworkModal) {
      // 열려있으면
      setOpenHomeworkModal(false); // 닫아라
      await mutate();
    }
  };

  // Homework Modify
  const onModifyHomework = async (seq: number) => {
    setSeq(seq);
    setOpenHomeworkModal(true); // 열어라
    await mutate();
  };

  // Homework Remove
  const onRemoveHomrwork = async (seq: number) => {
    try {
      const dialogConfirmed = await dialog({
        title: '과제 삭제하기',
        description: '정말로 삭제하시겠습니까?',
        confirmText: '삭제하기',
        cancelText: '취소',
      });
      if (dialogConfirmed) {
        // dialogConfirmed이 true면
        await removeHomework(seq);
        snackbar({ variant: 'success', message: '성공적으로 삭제되었습니다.' });
        await mutate();
      }
    } catch (e: any) {
      snackbar({ variant: 'error', message: e.data.message });
    }
  };

  return (
    <Container className={styles.globalContainer}>
      {/* 업로드 버튼 */}
      <UploadBtn>
        <Button
          color="secondary"
          variant="contained"
          startIcon={<FileUploadIcon />}
          onClick={async () => {
            setSeq(null);
            setOpenHomeworkModal(true);
          }}
        >
          과제 등록
        </Button>
      </UploadBtn>

      <Table
        size="small"
        pagination={true}
        totalNum={pageData?.totalElements}
        page={pageData?.number}
        onChangePage={onChangePage}
      >
        <TableHead>
          <TableRow>
            {headRows.map(({ name }) => (
              <TableCell key={name}>{name}</TableCell>
            ))}
            <TableCell>{}</TableCell>
          </TableRow>

          <TableBody>
            {pageData?.content.map(homework => (
              <TableRow key={homework.seq} hover>
                <TableCell>{homework.seq}</TableCell>
                <TableCell>{homework.subject}</TableCell>
                <TableCell>{dateFormat(homework.createdDtime, 'isoDate')}</TableCell>
                <TableCell>{dateFormat(homework.modifiedDtime, 'isoDate')}</TableCell>

                <TableCell style={{ width: 10 }} align="right">
                  <Chip
                    variant="outlined"
                    size="small"
                    label={homework.status === HomeworkStatus.APPROVE ? '정상' : '중지'}
                    color={
                      homework.status === HomeworkStatus.APPROVE ? 'secondary' : 'default'
                    }
                  />
                </TableCell>

                <TableCell>
                  <Button
                    variant="text"
                    color="neutral"
                    size="small"
                    onClick={() => onModifyHomework(homework.seq)}
                  >
                    수정
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="text"
                    color="warning"
                    onClick={() => onRemoveHomrwork(homework.seq)}
                    size="small"
                  >
                    삭제
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableHead>
      </Table>

      <HomeworkModal
        mode={seq ? 'modify' : 'upload'}
        seq={Number(seq)}
        contentSeq={Number(contentSeq)}
        open={openHomeworkModal}
        handleClose={isSubmit => handleCloseModal(isSubmit)}
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
