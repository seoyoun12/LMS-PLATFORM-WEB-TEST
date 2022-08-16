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
import { libraryList, LibraryStatus, removeLibrary } from '@common/api/library';
import { LibraryUploadModal } from '@components/admin-center/LibraryUploadModal';
import { useCourseModule } from '@common/api/adm/course';

const headRows = [
  { name: 'seq' },
  { name: '강의명' },
  { name: '등록날짜' },
  { name: '수정일자' },
  { name: '상태' },
  { name: '수정' },
  { name: '삭제' },
];

export function CourseModule() {
  const router = useRouter();
  const snackbar = useSnackbar();
  const dialog = useDialog();
  const [openLibraryModal, setOpenLibraryModal] = useState(false);
  const [seq, setSeq] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const { courseSeq } = router.query;
  const { data, error, mutate } = useCourseModule(Number(courseSeq));
  console.log(data);

  const onRemoveLibrary = async (seq: number) => {
    try {
      const dialogConfirmed = await dialog({
        title: '콘텐츠 삭제하기',
        description: '정말로 삭제하시겠습니까?',
        confirmText: '삭제하기',
        cancelText: '취소',
      });
      if (dialogConfirmed) {
        await removeLibrary(seq);
        snackbar({ variant: 'success', message: '성공적으로 삭제되었습니다.' });
        await mutate();
      }
    } catch (e: any) {
      snackbar({ variant: 'error', message: e.data.message });
    }
  };

  const handleCloseModal = async (isSubmit: boolean) => {
    if (openLibraryModal) {
      setOpenLibraryModal(false);
      await mutate();
    }
  };

  const onModifyLibrary = async (seq: number) => {
    setSeq(seq);
    setOpenLibraryModal(true);
    await mutate();
  };

  useEffect(() => {
    const { page } = router.query;
    setPage(!isNaN(Number(page)) ? Number(page) : 0);
  }, [router.query]);

  // const onChangePage = async (page: number) => {
  //   await router.push({
  //     pathname: router.pathname,
  //     query: {
  //       ...router.query,
  //       page,
  //     },
  //   });
  // };

  if (error) return <div>error</div>;
  if (!data) return <Spinner />;
  return <Spinner />;

  // return (
  //   <Container className={styles.globalContainer}>
  //     <UploadBtn>
  //       <Button
  //         color="secondary"
  //         variant="contained"
  //         startIcon={<FileUploadIcon />}
  //         onClick={async () => {
  //           setSeq(null);
  //           setOpenLibraryModal(true);
  //         }}
  //       >
  //         과정모듈 업로드
  //       </Button>
  //     </UploadBtn>

  //     <Table
  //       size="small"
  //       // pagination={true}
  //       // totalNum={libraryPaginationResult.totalElements}
  //       // page={libraryPaginationResult.number}
  //       // onChangePage={onChangePage}
  //     >
  //       <TableHead>
  //         <TableRow>
  //           {headRows.map(({ name }) => (
  //             <TableCell key={name}>{name}</TableCell>
  //           ))}
  //           <TableCell>{}</TableCell>
  //         </TableRow>
  //       </TableHead>

  //       <TableBody>
  //         {data.map(item => (
  //           <TableRow key={item.courseSeq} hover>
  //             <TableCell>{item.seq}</TableCell>
  //             <TableCell>{item.subject}</TableCell>
  //             <TableCell>{dateFormat(item.createdDtime, 'isoDate')}</TableCell>
  //             <TableCell>{dateFormat(item.modifiedDtime, 'isoDate')}</TableCell>
  //             <TableCell style={{ width: 10 }} align="right">
  //               <Chip
  //                 variant="outlined"
  //                 size="small"
  //                 label={item.status === LibraryStatus.APPROVE ? '정상' : '중지'}
  //                 color={
  //                   item.status === LibraryStatus.APPROVE ? 'secondary' : 'default'
  //                 }
  //               />
  //             </TableCell>
  //             <TableCell>
  //               <Button
  //                 variant="text"
  //                 color="neutral"
  //                 size="small"
  //                 onClick={() => onModifyLibrary(item.seq)}
  //               >
  //                 수정
  //               </Button>
  //             </TableCell>
  //             <TableCell>
  //               <Button
  //                 variant="text"
  //                 color="warning"
  //                 onClick={() => onRemoveLibrary(item.seq)}
  //                 size="small"
  //               >
  //                 삭제
  //               </Button>
  //             </TableCell>
  //           </TableRow>
  //         ))}
  //       </TableBody>
  //     </Table>

  //     <LibraryUploadModal
  //       mode={seq ? 'modify' : 'upload'}
  //       seq={Number(seq)}
  //       courseSeq={Number(courseSeq)}
  //       open={openLibraryModal}
  //       handleClose={isSubmit => handleCloseModal(isSubmit)}
  //     />
  //   </Container>
  // );
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